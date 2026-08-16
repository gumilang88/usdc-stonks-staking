// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IERC20 {
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
    function transfer(address recipient, uint256 amount) external returns (bool);
    function balanceOf(address account) external view returns (uint256);
    function decimals() external view returns (uint8);
}

/// @title STONKS StakeVault
/// @notice Stake STONKS into the vault. Unstake anytime to get principal back.
///         Rewards are distributed manually by the team (owner) directly to stakers.
contract StonksStakeVault {
    IERC20 public immutable token;
    address public owner;

    mapping(address => uint256) public stakedAmount;
    uint256 public totalStaked;

    bool public paused;

    event Staked(address indexed user, uint256 amount);
    event Unstaked(address indexed user, uint256 amount);
    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);

    modifier onlyOwner() {
        require(msg.sender == owner, "!owner");
        _;
    }

    constructor(address _token) {
        require(_token != address(0), "!token");
        token = IERC20(_token);
        owner = msg.sender;
    }

    function stake(uint256 amount) external {
        require(!paused, "paused");
        require(amount > 0, "!amount");
        require(token.transferFrom(msg.sender, address(this), amount), "transferFrom failed");
        stakedAmount[msg.sender] += amount;
        totalStaked += amount;
        emit Staked(msg.sender, amount);
    }

    function unstake(uint256 amount) external {
        require(amount > 0, "!amount");
        require(stakedAmount[msg.sender] >= amount, "insufficient stake");
        stakedAmount[msg.sender] -= amount;
        totalStaked -= amount;
        require(token.transfer(msg.sender, amount), "transfer failed");
        emit Unstaked(msg.sender, amount);
    }

    /// @notice Owner sends rewards to any staker from OWNER wallet (manual reward flow).
    ///         Reward source: team wallet, NOT other stakers' principal.
    function ownerSendReward(address user, uint256 amount) external onlyOwner {
        require(amount > 0, "!amount");
        require(token.transferFrom(msg.sender, address(this), amount), "reward source failed");
        require(token.transfer(user, amount), "reward transfer failed");
    }

    /// @notice Owner pause/unpause staking (unstake always allowed).
    function setPaused(bool _paused) external onlyOwner {
        paused = _paused;
    }

    /// @notice Owner can pull any leftover tokens from the vault (e.g. mis-sent funds).
    function recoverExcess(address to) external onlyOwner {
        uint256 bal = token.balanceOf(address(this));
        require(bal > totalStaked, "no excess");
        uint256 excess = bal - totalStaked;
        require(token.transfer(to, excess), "transfer failed");
    }

    function transferOwnership(address newOwner) external onlyOwner {
        require(newOwner != address(0), "!newOwner");
        emit OwnershipTransferred(owner, newOwner);
        owner = newOwner;
    }
}