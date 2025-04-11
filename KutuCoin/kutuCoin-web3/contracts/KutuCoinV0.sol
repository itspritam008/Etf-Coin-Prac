// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/Math.sol";

contract KutuCoin is ERC20, ERC20Burnable, Ownable {
    using Math for uint256;

    uint256 private constant INITIAL_SUPPLY = 10_000_000_000 * 10 ** 18; // 10 billion tokens
    uint256 private constant MILESTONE_REWARDS = (INITIAL_SUPPLY * 30) / 100; // 30% for milestone rewards
    uint256 private constant PARTNERSHIP_RESERVE = (INITIAL_SUPPLY * 20) / 100; // 20% for partnership incentives

    mapping(address => bool) private _milestoneAchievers;
    mapping(address => uint256) private _lastTransferTimestamp;

    uint256 public constant TRANSFER_COOLDOWN = 1 days;
    uint256 public constant MAX_MINT_AMOUNT = 1_000_000 * 10 ** 18; // 1 million tokens

    uint256 public purchaseFeePercentage = 2; // 2% fee on token purchases
    uint256 public constant MAX_FEE_PERCENTAGE = 10; // Maximum fee percentage (10%)

    event MilestoneAchieved(address indexed couple, uint256 burnAmount);
    event TokensMinted(address indexed to, uint256 amount);
    event CooldownTransfer(
        address indexed from,
        address indexed to,
        uint256 amount
    );
    event TokensPurchased(address indexed buyer, uint256 amount, uint256 fee);
    event FeePercentageUpdated(uint256 newPercentage);

    constructor() ERC20("KutuCoin", "KUTU") Ownable(msg.sender) {
        _mint(msg.sender, INITIAL_SUPPLY);

        // Lock tokens for milestone rewards
        _transfer(msg.sender, address(this), MILESTONE_REWARDS);

        // Reserve tokens for partnership incentives
        _transfer(msg.sender, owner(), PARTNERSHIP_RESERVE);
    }

    function mint(address to, uint256 amount) public onlyOwner {
        require(
            amount <= MAX_MINT_AMOUNT,
            "Mint amount exceeds maximum allowed"
        );
        _mint(to, amount);
        emit TokensMinted(to, amount);
    }

    function transferWithCooldown(address to, uint256 amount) public {
        require(
            balanceOf(msg.sender) >= amount,
            "Insufficient balance for transfer"
        );
        require(
            block.timestamp >=
                _lastTransferTimestamp[msg.sender] + TRANSFER_COOLDOWN,
            "Transfer cooldown period not met"
        );

        _transfer(msg.sender, to, amount);
        _lastTransferTimestamp[msg.sender] = block.timestamp;

        emit CooldownTransfer(msg.sender, to, amount);
    }

    function purchaseTokens(uint256 amount) public payable {
        require(amount > 0, "Purchase amount must be greater than 0");
        require(msg.value > 0, "Must send AIA to purchase tokens");

        uint256 tokensToTransfer = (amount * (100 - purchaseFeePercentage)) /
            100;
        uint256 fee = amount - tokensToTransfer;

        require(
            balanceOf(address(this)) >= amount,
            "Insufficient token balance in contract"
        );

        // Transfer tokens to buyer
        _transfer(address(this), msg.sender, tokensToTransfer);

        // Transfer fee to contract owner
        _transfer(address(this), owner(), fee);

        emit TokensPurchased(msg.sender, tokensToTransfer, fee);
    }

    function setPurchaseFeePercentage(uint256 newPercentage) public onlyOwner {
        require(
            newPercentage <= MAX_FEE_PERCENTAGE,
            "Fee percentage exceeds maximum allowed"
        );
        purchaseFeePercentage = newPercentage;
        emit FeePercentageUpdated(newPercentage);
    }

    function burnOnMilestone(uint256 amount) public {
        require(
            _milestoneAchievers[msg.sender],
            "Not eligible for milestone burn"
        );
        require(amount > 0, "Burn amount must be greater than 0");
        require(
            balanceOf(msg.sender) >= amount,
            "Insufficient balance for burn"
        );

        _burn(msg.sender, amount);
        emit MilestoneAchieved(msg.sender, amount);
    }

    function setMilestoneAchiever(
        address couple,
        bool status
    ) public onlyOwner {
        _milestoneAchievers[couple] = status;
    }

    function isMilestoneAchiever(address couple) public view returns (bool) {
        return _milestoneAchievers[couple];
    }

    function releaseMilestoneRewards(
        address to,
        uint256 amount
    ) public onlyOwner {
        require(
            amount <= balanceOf(address(this)),
            "Insufficient milestone rewards balance"
        );
        _transfer(address(this), to, amount);
    }

    function withdrawPartnershipReserve(
        address to,
        uint256 amount
    ) public onlyOwner {
        require(
            amount <= balanceOf(owner()),
            "Insufficient partnership reserve balance"
        );
        _transfer(owner(), to, amount);
    }

    function getLastTransferTimestamp(
        address account
    ) public view returns (uint256) {
        return _lastTransferTimestamp[account];
    }

    function withdrawAIA() public onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "No AIA balance to withdraw");
        payable(owner()).transfer(balance);
    }

    // Allow the contract to receive AIA
    receive() external payable {}
}
