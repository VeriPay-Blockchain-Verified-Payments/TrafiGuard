const Financials = artifacts.require("Financials");

module.exports = async function (deployer) {
	await deployer.deploy(Financials)
};