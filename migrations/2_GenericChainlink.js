const GenericChainlink = artifacts.require("GenericChainlink");

module.exports = function(deployer) {
	deployer.deploy(GenericChainlink);
};
