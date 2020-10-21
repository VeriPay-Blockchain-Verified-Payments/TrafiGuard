pragma solidity ^0.6.0;
pragma experimental ABIEncoderV2;

import "https://raw.githubusercontent.com/smartcontractkit/chainlink/develop/evm-contracts/src/v0.6/ChainlinkClient.sol";
//import "https://github.com/smartcontractkit/chainlink/evm-contracts/src/v0.6/interfaces/LinkTokenInterface.sol";

/// SPDX-License-Identifier: MIT

contract Vessels is ChainlinkClient {
    address private oracle;
    bytes32 private jobId;
    uint256 private fee;

    string public API_URL;
    string public full_URL;
    //mapping(bytes32 => uint256) public riskScore_from;
    bytes32 public reqId;
    uint256 public riskReduction;

    address linkTokenAddress;

    /*
        _oracle = 0x56dd6586DB0D08c6Ce7B2f2805af28616E082455;
        _jobId = "c128fbb0175442c8ba828040fdd1a25e";
        _API_URL = https://ec2-3-83-110-40.compute-1.amazonaws.com:5000;
    */
    constructor()
    public {
    	setPublicChainlinkToken();
    	oracle = 0x56dd6586DB0D08c6Ce7B2f2805af28616E082455; // oracle address
    	jobId = "b6602d14e4734c49a5e1ce19d45a4632";
    	API_URL = "http://ec2-3-83-110-40.compute-1.amazonaws.com:5000";
    	fee = 0.1 * 10 ** 18; // 0.1 LINK
    	///uint256 initialFunding = fee * 10;
    /*
    	linkTokenAddress = chainlinkTokenAddress();
    	LinkTokenInterface link =  LinkTokenInterface(linkTokenAddress);
    	link.approve(msg.sender, initialFunding);
    	link.transferFrom(msg.sender, address(this), initialFunding);
    */
    }

    function evalRiskScore(
        string memory portOfOrigin,
        string memory portOfDestination,
        string memory loanDuration,
        string memory mmsi
    )
    public {
    	Chainlink.Request memory req = buildChainlinkRequest(
    	    jobId,
    	    address(this),
    	    this.fulfill.selector
    	);
    	full_URL = appendPath("vessel");
    	full_URL = appendFirstParam(full_URL, "portOfOrigin", portOfOrigin);
    	full_URL = appendParam(full_URL, "portOfDestination", portOfDestination);
    	full_URL = appendParam(full_URL, "loanDuration", loanDuration);
    	full_URL = appendParam(full_URL, "mmsi", mmsi);
    	req.add("get", full_URL);
    	req.add("path", "riskReduction");
    	sendChainlinkRequestTo(oracle, req, fee);
    }

    function fulfill(bytes32 _requestId, uint256 response)

    public {
        reqId = _requestId;
        riskReduction = response;
    }

    function setAPI_URL(string memory URL)
    public {
    	API_URL = URL;
    }

    function appendPath(string memory endpoint)
    private view returns (string memory) {
        return string(abi.encodePacked(API_URL,"/",endpoint));
    }

    function appendFirstParam(string memory URL_withEndpoint, string memory paramKey, string memory paramVal)
    private pure returns (string memory) {
        return string(abi.encodePacked(URL_withEndpoint,"?",paramKey,"=",paramVal));
    }

    function appendParam(string memory URL_withFirstPram, string memory paramKey, string memory paramVal)
    private pure returns (string memory) {
        return string(abi.encodePacked(URL_withFirstPram,"&",paramKey,"=",paramVal));
    }
}
