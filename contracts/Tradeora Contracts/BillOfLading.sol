pragma solidity ^0.6.0;

import "@chainlink/contracts/src/v0.6/ChainlinkClient.sol";
// import "https://raw.githubusercontent.com/smartcontractkit/chainlink/develop/evm-contracts/src/v0.6/ChainlinkClient.sol";


/// SPDX-License-Identifier: MIT

contract BillOfLading is ChainlinkClient {

    bool public is_Valid;
    uint256 public risk_reduction;

    address private oracle;
    bytes32 private jobId;
    uint256 private fee;


    constructor() public {
			setPublicChainlinkToken();
			oracle = 0xAA1DC356dc4B18f30C347798FD5379F3D77ABC5b;
			jobId = "6b9b1ba2cefa4092b6d01c72624c201f";
			fee = 0.1 * 10 ** 18; // 0.1 LINK
    }


    function requestBillOfLading() public returns (bytes32 requestId)
    {
        Chainlink.Request memory request = buildChainlinkRequest(jobId, address(this), this.fulfill.selector);
        request.add("post", "http://payid.trade:4000/verify/billOfLading");
        request.add("path", "isValid");
        return sendChainlinkRequestTo(oracle, request, fee);
    }

    /**
     * Receive the response in the form of uint256
     */
    function fulfill(bytes32 _requestId, bool _returnData) public recordChainlinkFulfillment(_requestId)
    {
        is_Valid = _returnData;
        if(is_Valid){
            risk_reduction = 20;
        }else{
            risk_reduction = 0;
        }
    }

}
