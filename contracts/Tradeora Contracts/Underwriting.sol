
pragma solidity ^0.6.0;

import "https://raw.githubusercontent.com/smartcontractkit/chainlink/develop/evm-contracts/src/v0.6/ChainlinkClient.sol";
import "./BillOfLading.sol";
import "./LinkPoolClient.sol";
import "./Vessels.sol";
import "./SellerDID.sol";

/// SPDX-License-Identifier: MIT


contract Underwriting{

    uint256 public riskScore = 100;
    string public LoanRequest;

   //importing Finacials variables
    address FINAddress;
    uint256 public FIN_Reduction;

   //importing Bill of Lading variables
    address BOLAddress;
    uint256 public BOL_Reduction;

    //importing Vessels Contract
    address VSLAddress;
    uint256 public VSL_Reduction;

    //importing SellerDID Contract
    address SellerDIDAddress;
    uint256 public SellerDID_Reduction;


    //set Contract Addresses for API function call contracts

    function setContractAddresses(address _addressBOL,address _addressFIN, address _addressVSL, address _addressSellerDID) external{
        BOLAddress = _addressBOL;
        FINAddress = _addressFIN;
        VSLAddress = _addressVSL;
        SellerDIDAddress = _addressSellerDID;
    }

    //1. Call Financials Contract API
    function call_requestFinancialRiskReduction(string memory tradeID, string memory loanAmount) internal{
        riskScore = 100;
        LoanRequest = loanAmount;
        LinkPoolClient FIN = LinkPoolClient(FINAddress);
        FIN.evalRiskScore(tradeID, loanAmount);
    }

    //2. Call Bill of lading contract API
    function call_requestBillOfLading() internal returns(uint256){
        BillOfLadingRequest BOL = BillOfLadingRequest(BOLAddress);
        BOL.requestBillOfLading();
    }

    //3. Call Vessel location API
    function call_requestVesselRisk(string memory _poa, string memory _pod, string memory _loanDuration, string memory _mmsi) internal returns(uint256){
        Vessels VSL = Vessels(VSLAddress);
        VSL.evalRiskScore(_poa, _pod, _loanDuration, _mmsi);
    }


    //4. Call Seller DID API
    function call_requestSellerDIDRisk() internal returns( string memory phone, string memory email ){
        SellerDID sellerDID = SellerDID(SellerDIDAddress);
        sellerDID.evalRiskScore();
    }


    function getRiskReductionFIN() internal returns(uint256){
        LinkPoolClient FIN = LinkPoolClient(FINAddress);
        FIN_Reduction = FIN.riskScore();
        riskScore = riskScore - FIN_Reduction;
    }

    function getRiskReductionBOL() internal returns (uint256){
        BillOfLadingRequest BOL = BillOfLadingRequest(BOLAddress);
        BOL_Reduction = BOL.risk_reduction();
        riskScore = riskScore - BOL_Reduction;
    }

    function getRiskReductionVSL() internal returns (uint256){
        Vessels VSL = Vessels(VSLAddress);
        VSL_Reduction = VSL.riskReduction();
        riskScore = riskScore - VSL_Reduction;
    }


    function batchcall_APIs(string memory tradeID, string memory loanAmount, string memory _poa, string memory _pod, string memory _loanDuration, string memory _mmsi) public{
        call_requestFinancialRiskReduction(tradeID, loanAmount);
        call_requestVesselRisk(_poa, _pod, _loanDuration, _mmsi);
        call_requestBillOfLading();

    }

    function batch_getRiskScore() public{
        riskScore = 100;
        getRiskReductionFIN();
        getRiskReductionBOL();
        getRiskReductionVSL();

    }
