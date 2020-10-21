pragma solidity >=0.5.0 <0.8.0;

import "@openzeppelin/contracts/payment/escrow/RefundEscrow.sol";
import "GenericChainlink.sol";

contract Base is RefundEscrow {

	GenericChainlink public GenericChainlink_instance;
	constructor(address GenericChainlink_address) {
		GenericChainlink_instance = GenericChainlink(GenericChainlink_address);
	}

	function get() {
		GenericChainlink_instance.set_GET_URL();
	}
}