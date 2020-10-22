pragma solidity 0.6.6;

import "@openzeppelin/contracts/payment/escrow/RefundEscrow.sol";
import "./GenericChainlink.sol";

abstract contract Base is RefundEscrow {

	GenericChainlink public GenericChainlink_instance;
	constructor(address GenericChainlink_address) public {
		GenericChainlink_instance = GenericChainlink(GenericChainlink_address);
	}
}