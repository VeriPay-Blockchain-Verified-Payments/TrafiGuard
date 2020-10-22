pragma solidity ^0.6.0;
pragma experimental ABIEncoderV2;

import "@chainlink/contracts/src/v0.6/ChainlinkClient.sol";

/// SPDX-License-Identifier: MIT
// Deployed on: Kovan at: 0x71Bf3281b35AEf03a4a89b660E9666B24c8090d0
contract SellerDID is ChainlinkClient {
    address private oracle;
    bytes32 private jobId;
    uint256 private fee;

    string public email;
    string public phone;

    bytes32 public reqId;
    uint256 public riskReduction;

    address linkTokenAddress;

    /*
        _oracle = 0x56dd6586DB0D08c6Ce7B2f2805af28616E082455;
        _jobId = "c128fbb0175442c8ba828040fdd1a25e";
        _API_URL = https://payid.trade:4000;
    */
    constructor()
    public {
    	setPublicChainlinkToken();
			oracle = 0xAA1DC356dc4B18f30C347798FD5379F3D77ABC5b;
			jobId = "b7285d4859da4b289c7861db971baf0a";
    }

    function evalRiskScore(string memory _email, string memory _phone)
    public {
			riskReduction = keccak256(abi.encodePacked(email)) == keccak256(abi.encodePacked(_email)) ? riskReduction+8 : riskReduction;
			riskReduction = keccak256(abi.encodePacked(phone)) == keccak256(abi.encodePacked(_phone)) ? riskReduction+11 : riskReduction;
    }

    function set(string memory _email, string memory _phone)
    public {
			email = _email;
			phone = _phone;
			//"{".concat(email).concat(",").concat(phone).concat("}");
    }
}

library stringFunctions {

    function concat(string calldata word1, string calldata word2)
    external pure returns (string memory) {
			return string(abi.encodePacked(word1,word2));
    }
}
