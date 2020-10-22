pragma solidity ^0.6.12;

import '@openzeppelin/contracts//token/ERC20/IERC20.sol';
import './CompoundControllerInterface.sol';
import './CTokenInterface.sol';

/// Compound-Addresses on Kovan:
/// https://github.com/compound-finance/compound-protocol/blob/master/networks/kovan.json

contract ShipmentCollateralHandling {
    IERC20 USDC;  /// to be used for buyer to lock tokens
    CTokenInterface cUSDC;
    IERC20 DAI;  /// to be used for seller to take out loan
    CTokenInterface cDAI;
    ComptrollerInterface comptroller;

    constructor(
        address _USDC,
        address _cUSDC,
        address _DAI,
        address _cDAI,
        address _comptroller
    ) public {
        USDC = IERC20(_USDC);
        cUSDC = CTokenInterface(_cUSDC);
        DAI = IERC20(_DAI);
        cDAI = CTokenInterface(_cDAI);
        comptroller = ComptrollerInterface(_comptroller);
    }

    function lockCollateral() internal {  /// for buyer to lock invested amount, e.g. 10,000 USDC (example - adjust to UI later)
        USDC.approve(address(cUSDC), 10000);
        cUSDC.mint(10000);
        address[] memory colls = new address[](1);
        colls[0] = address(cUSDC);
        comptroller.enterMarkets(colls);
    }

    function takeOutLoan() internal { // for seller to take out allowance
        cDAI.borrow(2000); /// Collateral-Factor to be considered! 20% of loan > 1.5 ratio
    }

    function repayLoan() internal {
        DAI.approve(address(cDAI), 22000); /// make sure debit interest is considered
        cDAI.repayBorrow(2000);
    }

    function redeemCollateral() internal {
        uint balancePlusInterest = cUSDC.balanceOf(address(this));
        cUSDC.redeem(balancePlusInterest);  /// what happens with the interest? > Should stay in contract, which is {balance - 10000}
         /// next step: send investment back to buyer
    }
}
