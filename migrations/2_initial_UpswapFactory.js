const WKLayToken = artifacts.require("WKLAY");
const UpswapFactory = artifacts.require("UpswapV2Factory");
const UpswapRouter = artifacts.require("UpswapV2Router02");

module.exports = async function (deployer) {
  //let wklay = await deployer.deploy(WKLayToken);
  //let factory = await deployer.deploy(UpswapFactory, "0x221100820290D88791F99C444b086DF481A00540");
  //deployer.deploy(UpswapRouter, wklay.address, factory.address);
  deployer.deploy(WKLayToken).then(function() {
    return deployer.deploy(UpswapFactory, "0x221100820290D88791F99C444b086DF481A00540").then(function(){
      return deployer.deploy(UpswapRouter, WKLayToken.address, UpswapRouter.address);
    })
  });
};
