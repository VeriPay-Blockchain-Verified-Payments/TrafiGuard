pragma solidity >=0.5.0 <0.8.0;

contract StoreBloomData {

	mapping(string => string) emails;
	mapping(string => string) phones;

	function setData(string memory token, string memory email, string memory phone) public {
		emails[token] = email;
		phones[token] = phone;
	}

}

// Ropsten: 0xae1C6ef77f425bdF288BA22eC06801Ec7A727a21