#!/usr/bin/env python3
"""Deploy StonksStakeVault ke ARC Mainnet (5042)."""
import json
import os
import sys

from eth_account import Account
from web3 import Web3

RPC = "https://arc-mainnet.infura.io/v3/b6bf7d3508c941499b10025c0776eaf8"
CHAIN_ID = 5042
STONKS = Web3.to_checksum_address("0xc5e49382e59f956763580a71e08df3b34e8603a3")

BASE_DIR = os.path.dirname(os.path.abspath(__file__))


def main() -> None:
    pk = os.environ.get("PK")
    if not pk:
        sys.exit("set PK env")
    if not pk.startswith("0x"):
        pk = "0x" + pk
    acct = Account.from_key(pk)
    print("deployer:", acct.address)

    w3 = Web3(Web3.HTTPProvider(RPC, request_kwargs={"timeout": 30}))
    assert w3.is_connected(), f"RPC fail {RPC}"
    print("chain:", w3.eth.chain_id, "block:", w3.eth.block_number)

    nat = w3.eth.get_balance(acct.address)
    print("native balance:", w3.from_wei(nat, "ether"))
    if nat == 0:
        sys.exit("GAS: deployer 0 USDC native — top up dulu")

    with open(os.path.join(BASE_DIR, "build", "StonksStakeVault.abi")) as f:
        abi = json.load(f)
    with open(os.path.join(BASE_DIR, "build", "StonksStakeVault.bin")) as f:
        bytecode = "0x" + f.read().strip()

    C = w3.eth.contract(abi=abi, bytecode=bytecode)

    block = w3.eth.get_block("latest")
    base = block.get("baseFeePerGas", 0)
    tx = {
        "from": acct.address,
        "nonce": w3.eth.get_transaction_count(acct.address, "pending"),
        "chainId": CHAIN_ID,
        "type": "0x2" if base and base > 0 else "0x0",
    }
    if tx["type"] == "0x2":
        tx["maxFeePerGas"] = base * 2
        tx["maxPriorityFeePerGas"] = w3.to_wei(0.01, "gwei")
    else:
        tx["gasPrice"] = w3.eth.gas_price

    construct_tx = C.constructor(STONKS).build_transaction(tx)
    try:
        gas = w3.eth.estimate_gas(construct_tx)
        construct_tx["gas"] = int(gas * 1.3)
    except Exception as e:
        print("estimate err:", str(e)[:120], "-> fallback 2M")
        construct_tx["gas"] = 2_000_000

    print("gas:", construct_tx["gas"], "maxFee:", construct_tx.get("maxFeePerGas"))
    signed = acct.sign_transaction(construct_tx)
    tx_hash = w3.eth.send_raw_transaction(signed.raw_transaction)
    print("tx:", tx_hash.hex())
    receipt = w3.eth.wait_for_transaction_receipt(tx_hash, timeout=180)
    print("status:", receipt["status"])
    if receipt["status"] == 1:
        addr = receipt["contractAddress"]
        print("VAULT:", addr)
        with open(os.path.join(BASE_DIR, "build", "vault_address.txt"), "w") as f:
            f.write(addr)
    else:
        sys.exit("deploy revert")


if __name__ == "__main__":
    main()