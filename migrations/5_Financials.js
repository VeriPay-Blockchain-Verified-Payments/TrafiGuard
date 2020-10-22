const StringFunctions = artifacts.require("StringFunctions");
const Financials = artifacts.require("Financials");

module.exports = async function (deployer) {
	await deployer.deploy(StringFunctions).then(async() => {
		await deployer.link(StringFunctions, Financials)
		return deployer.deploy(Financials)
	})
};