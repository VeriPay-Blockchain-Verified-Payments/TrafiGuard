const ShipmentCollateralHandling = artifacts.require("ShipmentCollateralHandling");
const address_USDC = '0xb7a4F3E9097C08dA09517b5aB877F7a917224ede';
const address_cUSDC = '0x4a92E71227D294F041BD82dd8f78591B75140d63';
const address_comptroller = '0x5eAe89DC1C671724A672ff0630122ee834098657';
module.exports = async function (deployer) {
	await deployer.deploy(ShipmentCollateralHandling, address_USDC, address_cUSDC, address_USDC, address_cUSDC, address_comptroller)
};