pragma solidity ^0.6.6;
pragma experimental ABIEncoderV2;

library StringFunctions {

    function concat(string calldata word1, string calldata word2)
    external pure returns (string memory) {
			return string(abi.encodePacked(word1,word2));
    }
}