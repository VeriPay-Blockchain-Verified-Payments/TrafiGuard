pragma solidity ^0.6.0;
pragma experimental ABIEncoderV2;

import "@chainlink/contracts/src/v0./src/v0.6/ChainlinkClient.sol";

/// SPDX-License-Identifier: MIT


contract LinkPoolClient is ChainlinkClient {
   address private oracle;
   bytes32 private jobId;
   uint256 private fee;

   string public API_URL;
   //mapping(bytes32 => uint256) public riskScore_from;
   bytes32 public reqId;
   uint256 public riskScore;

   /**
    * Network: Kovan
    * Oracle:
    *      Name:           LinkPool
    *      Listing URL:    https://market.link/nodes/323602b9-3831-4f8d-a66b-3fb7531649eb
    *      Address:        0x83dA1beEb89Ffaf56d0B7C50aFB0A66Fb4DF8cB1
    * Job:
    *      Name:           Get > Uint256
    *      Listing URL:    https://market.link/jobs/
    *      ID:             b6602d14e4734c49a5e1ce19d45a4632
    *      Fee:            0.1 LINK
    */
   constructor() public {
     setPublicChainlinkToken();
     oracle = 0x56dd6586DB0D08c6Ce7B2f2805af28616E082455; // oracle address
     jobId = "b6602d14e4734c49a5e1ce19d45a4632"; //job id
     fee = 0.1 * 10 ** 18; // 0.1 LINK
   }

   function setAPI_URL(string memory URL)
   public {
     API_URL = URL;
   }

   function evalRiskScore(string memory tradeID, string memory loanAmount)
   public {
     Chainlink.Request memory req = buildChainlinkRequest(
         jobId,
         address(this),
         this.fulfill.selector
     );
     string memory URI = appendEndpoint("financials");
     URI = appendFirstPram(URI, "PAN", tradeID);
     URI = appendPrams(URI, "loanAmount", loanAmount);
     req.add("get", URI);
     req.add("path", "riskReduction");
     sendChainlinkRequestTo(oracle, req, fee);
   }

   function fulfill(bytes32 _requestId, uint256 response)

   public {
       // riskScore_from[_requestId] = response;
       reqId = _requestId;
       riskScore = response;
   }

   function appendEndpoint(string memory endpoint) private view returns (string memory) {
       return string(abi.encodePacked(API_URL,"/",endpoint));
   }

   function appendFirstPram(string memory URL_withEndpoint, string memory paramKey, string memory paramVal)
   private pure returns (string memory) {
       return string(abi.encodePacked(URL_withEndpoint,"?",paramKey,"=",paramVal));
   }

   function appendPrams(string memory URL_withFirstPram, string memory paramKey, string memory paramVal)
   private pure returns (string memory) {
       return string(abi.encodePacked(URL_withFirstPram,"&",paramKey,"=",paramVal));
   }

   function appendFunctionsWork( string memory tradeID, string memory loanAmount)
   public view returns (string memory URI) {
     URI = appendEndpoint("financial");
     URI = appendFirstPram(URI, "PAN", tradeID);
     URI = appendPrams(URI, "loanAmount", loanAmount);
   }
}
