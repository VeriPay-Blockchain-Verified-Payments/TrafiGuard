pragma solidity ^0.6.6;

/// SPDX-License-Identifier: MIT

///import './CompoundControllerInterface.sol';
///import './CTokenInterface.sol';

/// Compound-Addresses on Kovan:
/// https://github.com/compound-finance/compound-protocol/blob/master/networks/kovan.json

/// For examples see deployed smart contract: https://kovan.etherscan.io/address/0x9886a3eafa2e1271b3c9e391e665d2e4c3631965

interface IERC20 {
    function totalSupply() external view returns (uint256);
    function balanceOf(address account) external view returns (uint256);
    function transfer(address recipient, uint256 amount) external returns (bool);
    function allowance(address owner, address spender) external view returns (uint256);
    function approve(address spender, uint256 amount) external returns (bool);
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
}

interface CTokenInterface {
    function transfer(address dst, uint amount) external returns (bool);
    function transferFrom(address src, address dst, uint amount) external returns (bool);
    function approve(address spender, uint amount) external returns (bool);
    function allowance(address owner, address spender) external view returns (uint);
    function balanceOf(address owner) external view returns (uint);
    function balanceOfUnderlying(address owner) external returns (uint);
    function getAccountSnapshot(address account) external view returns (uint, uint, uint, uint);
    function borrowRatePerBlock() external view returns (uint);
    function supplyRatePerBlock() external view returns (uint);
    function totalBorrowsCurrent() external returns (uint);
    function borrowBalanceCurrent(address account) external returns (uint);
    ///function borrowBalanceStored(address account) public view returns (uint);
    ///function exchangeRateCurrent() public returns (uint);
    ///function exchangeRateStored() public view returns (uint);
    function getCash() external view returns (uint);
    ///function accrueInterest() public returns (uint);
    function seize(address liquidator, address borrower, uint seizeTokens) external returns (uint);

    function mint(uint mintAmount) external returns (uint);
    function redeem(uint redeemTokens) external returns (uint);
    function redeemUnderlying(uint redeemAmount) external returns (uint);
    function borrow(uint borrowAmount) external returns (uint);
    function repayBorrow(uint repayAmount) external returns (uint);
    function repayBorrowBehalf(address borrower, uint repayAmount) external returns (uint);
    function liquidateBorrow(address borrower, uint repayAmount, CTokenInterface cTokenCollateral) external returns (uint);
}

interface ComptrollerInterface {
    /// @notice Indicator that this is a Comptroller contract (for inspection)

    /*** Assets You Are In ***/

    function enterMarkets(address[] calldata cTokens) external returns (uint[] memory);
    function exitMarket(address cToken) external returns (uint);

    /*** Policy Hooks ***/

    function mintAllowed(address cToken, address minter, uint mintAmount) external returns (uint);
    function mintVerify(address cToken, address minter, uint mintAmount, uint mintTokens) external;

    function redeemAllowed(address cToken, address redeemer, uint redeemTokens) external returns (uint);
    function redeemVerify(address cToken, address redeemer, uint redeemAmount, uint redeemTokens) external;

    function borrowAllowed(address cToken, address borrower, uint borrowAmount) external returns (uint);
    function borrowVerify(address cToken, address borrower, uint borrowAmount) external;

    function repayBorrowAllowed(
        address cToken,
        address payer,
        address borrower,
        uint repayAmount) external returns (uint);
    function repayBorrowVerify(
        address cToken,
        address payer,
        address borrower,
        uint repayAmount,
        uint borrowerIndex) external;

    function liquidateBorrowAllowed(
        address cTokenBorrowed,
        address cTokenCollateral,
        address liquidator,
        address borrower,
        uint repayAmount) external returns (uint);
    function liquidateBorrowVerify(
        address cTokenBorrowed,
        address cTokenCollateral,
        address liquidator,
        address borrower,
        uint repayAmount,
        uint seizeTokens) external;

    function seizeAllowed(
        address cTokenCollateral,
        address cTokenBorrowed,
        address liquidator,
        address borrower,
        uint seizeTokens) external returns (uint);
    function seizeVerify(
        address cTokenCollateral,
        address cTokenBorrowed,
        address liquidator,
        address borrower,
        uint seizeTokens) external;

    function transferAllowed(address cToken, address src, address dst, uint transferTokens) external returns (uint);
    function transferVerify(address cToken, address src, address dst, uint transferTokens) external;

    /*** Liquidity/Liquidation Calculations ***/

    function liquidateCalculateSeizeTokens(
        address cTokenBorrowed,
        address cTokenCollateral,
        uint repayAmount) external view returns (uint, uint);
}

contract ShipmentCollateralHandling {

      /**

    *@dev bool public constant isComptroller = true;

*/

  /**
        *@dev to be used for buyer to lock tokens.
  */

    IERC20 USDC;

    CTokenInterface cUSDC;

      /**
        *@dev to be used by seller to take loan
  */

    IERC20 DAI;

    CTokenInterface cDAI;
    ComptrollerInterface comptroller;

    constructor() public {
        /// Kovan testnet configuration - change for live
        address _USDC=address(0xb7a4F3E9097C08dA09517b5aB877F7a917224ede);
        address _cUSDC=address(0x4a92E71227D294F041BD82dd8f78591B75140d63);
        address _DAI=_USDC; /// just for testnet usage
        address _cDAI=_cUSDC;
        address _comptroller=address(0x5eAe89DC1C671724A672ff0630122ee834098657); /// on Kovan testnet

        _USDC=0xb7a4F3E9097C08dA09517b5aB877F7a917224ede;
        USDC = IERC20(_USDC);
        cUSDC = CTokenInterface(_cUSDC);
        DAI = IERC20(_DAI);
        cDAI = CTokenInterface(_cDAI);
        comptroller = ComptrollerInterface(_comptroller);
    }

    function giveMeETH() public payable {}

    function lockCollateral() external payable {  /// for buyer to lock invested amount, e.g. 10,000 USDC (example - adjust to UI later)
        USDC.approve(address(cUSDC), 10000); /// Amount has 6 decimals: 000000, meaning 10000 = 0.010000 USDC
        cUSDC.mint(10000);
        address[] memory colls = new address[](1);
        colls[0] = address(cUSDC);
        comptroller.enterMarkets(colls);
    }

    function takeOutLoan() external { // for seller to take out allowance
        cDAI.borrow(2000); /// Collateral-Factor to be considered! 20% of loan > 1.5 ratio
    }

    function repayLoan() external {
        DAI.approve(address(cDAI), 22000); /// make sure debit interest is considered
        cDAI.repayBorrow(2000);
    }

    function redeemCollateral() external {
        uint balancePlusInterest = cUSDC.balanceOf(address(this));
        cUSDC.redeem(balancePlusInterest);  /// what happens with the interest? > Should stay in contract, which is {balance - 10000}
         /// next step: send investment back to buyer
    }
}
