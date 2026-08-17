#!/usr/bin/env python3
"""Check vault state + owner + native fee balance."""
import json
import os
from eth_account import Account
from web3 import Web3

RPC = "https://arc-mainnet.infura.io/v3/b6bf7d3508c941499b10025c0776eaf8"
VAULT = Web3.to_checksum_address("0x6415A41a735669b87Df97a9C731f83CE86B0aaC2")
STONKS = Web3.to_checksum_address("0xc5e49382e59f956763580a71e08df3b34e8603a3")

PK = os.environ.get("PK")
if not PK:
    raise SystemExit("set PK env (owner private key)")
if not PK.startswith("0x"):
    PK = "0x" + PK


w3 = Web3(Web3.HTTPProvider(RPC, request_kwargs={"timeout": 30}))
print("connected:", w3.is_connected())
print("chainId:", w3.eth.chain_id)

acct = Account.from_key(PK)
print("my address:", acct.address)

with open("/home/gumilang/usdc-stonks-staking/contracts/build/StonksStakeVault.abi") as f:
    abi = json.load(f)

vault = w3.eth.contract(address=VAULT, abi=abi)
owner = vault.functions.owner().call()
print("vault owner:", owner)
print("i am owner:", owner.lower() == acct.address.lower())

print("native fee balance (vault):", w3.from_wei(w3.eth.get_balance(VAULT), "ether"), "USDC(native)")
print("my native balance:", w3.from_wei(w3.eth.get_balance(acct.address), "ether"), "USDC(native)")
print("totalStaked:", vault.functions.totalStaked().call())
print("paused:", vault.functions.paused().call())
print("vault STONKS balance:", vault.functions.token().call())
