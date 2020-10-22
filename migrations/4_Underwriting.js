const BillOfLading = artifacts.require("BillOfLading");
const Financials = artifacts.require("Financials");
const Vessels = artifacts.require("Vessels");
const SellerDID = artifacts.require("SellerDID");
const Underwriting = artifacts.require("Underwriting");
const IERC20 = artifacts.require("IERC20");

module.exports = async function (deployer) {
	let BillOfLading_address, Financials_address, Vessels_address, SellerDID_address
	await deployer.deploy(BillOfLading).then((BillOfLading) => {
		BillOfLading_address = BillOfLading.address
	});
	await deployer.deploy(Financials).then((Financials) => {
		Financials_address = Financials.address
	});
	await deployer.deploy(Vessels).then((Vessels) => {
		Vessels_address = Vessels.address
	});
	await deployer.deploy(SellerDID).then((SellerDID) => {
		SellerDID_address = SellerDID.address
	});
	let Underwriting_deployed = await deployer.deploy(Underwriting)
	await Underwriting_deployed.setContractAddresses(BillOfLading_address, Financials_address, Vessels_address, SellerDID_address)
	const LINK_token = await IERC20.at('0xa36085f69e2889c224210f603d836748e7dc0088').transfer(
		Underwriting_deployed.address,
		web3.eth.utils.toWei('200','finney')
	)
};