var  UniswapV2Router= artifacts.require("UpswapV2Router02");

module.exports = function(deployer) {
  deployer.deploy(UniswapV2Router,"0xBB3c81C0c7D7C5E6F8FF9644F2b31F7d46dA1499","0x1B422641A7239c4BE602D6eB4FF93f5112736394");
};
