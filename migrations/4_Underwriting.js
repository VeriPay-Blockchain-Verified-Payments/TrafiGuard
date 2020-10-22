const BillOfLading = artifacts.require("BillOfLading");
const Financials = artifacts.require("Financials");
const Vessels = artifacts.require("Vessels");
const SellerDID = artifacts.require("SellerDID");
const Underwriting = artifacts.require("Underwriting");

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
	await deployer.deploy(Underwriting, BillOfLading_address, Financials_address, Vessels_address, SellerDID_address)
};