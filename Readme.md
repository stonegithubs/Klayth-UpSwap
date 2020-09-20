# Upswap/SushiSwap部署

> 由于线上的代码是waffle环境，只提供了test方法，并没有提供实际部署。故使用truffle框架进行部署。


### Upswap部署
Upswap的部署分为3个部分：部署Factory，部署Router以及部署协议代币。这里是Factory和Router的部署步骤：

##### 1.部署Factory：
1.将/contracts/UpswapV2Factroy.sol和/migrations/1_initial_UpswapFactory.js解除后缀改动，将其他文件按照.sol->.solxx,.js->.jsxxxx格式改动，使其失效。
2.在/migrations/1_initial_UpswapFactory.js中修改` deployer.deploy(UpswapFactory,"0xf9C65b67865D4C46d76CCEE2ECc268CC0877Bb33");`中的地址，该地址是Uniswap中用于设置feeToSetter的地址。

    #/migrations/1_initial_UpswapFactory.js
	var UpswapFactory = artifacts.require("UpswapV2Factory");
    
    module.exports = function (deployer) {
      deployer.deploy(UpswapFactory,"0xf9C65b67865D4C46d76CCEE2ECc268CC0877Bb33");
    };
    
3.修改truffle-config.js中的编译器版本为“0.5.16”，运行下面命令：
`truffle migrate --network networkname`
truffle会自动编译并部署到对应的network上。（networkname参考truffle-config.js中的networks选项）
4.上面命令会返回类似下面的结果，记录下contract address，用于部署Router

    Compiling your contracts...
    ===========================
    > Everything is up to date, there is nothing to compile.
    
    
    
    Starting migrations...
    ======================
    > Network name:    'mainnet'
    > Network id:      8217
    > Block gas limit: 0 (0x0)
    
    
    1_iniitial_SushiBar.js
    ======================
    
       Deploying 'SushiBar'
       --------------------
       > transaction hash:    0x31145616d62d27bb1de0180be83ab27f757fb418bbfe6fb8733b93c7b4cb9570
       > Blocks: 8            Seconds: 8
       > contract address:    0x3cdc68D9Dd994663da332144C1548CDa0720d539
       > block number:        38864893
       > block timestamp:     1600496662
       > account:             0xf9C65b67865D4C46d76CCEE2ECc268CC0877Bb33
       > balance:             4.330178475
       > gas used:            1275362 (0x1375e2)
       > gas price:           25 gwei
       > value sent:          0 ETH
       > total cost:          0.03188405 ETH
    
       > Saving artifacts
       -------------------------------------
       > Total cost:          0.03188405 ETH
    
    
    Summary
    =======
    > Total deployments:   1
    > Final cost:          0.03188405 ETH
    
##### 2.部署Router
1.将/contracts/UpswapV2Router02.sol和/migrations/1_initial_Upswap.js解除后缀改动，将其他文件按照.sol->.solxx,.js->.jsxxxx格式改动，使其失效。
2.这里有两个参数，类似1中的feeToSetter，第一个参数为Facory合约地址，第二个为WKLAY的合约地址。

    var  UniswapV2Router= artifacts.require("UpswapV2Router02");
    
    module.exports = function(deployer) {
      deployer.deploy(UniswapV2Router,"0xab98BD69F956E64a212f408Ac48c6E9F7551527C","0x4148c6fed52E830e7C343Df76d2f03fBB99AdFba");
    };
    
3.修改truffle-config.js中的编译器版本为“0.6.6”，运行下面命令：
`truffle migrate --network networkname`
truffle会自动编译并部署到对应的network上。（networkname参考truffle-config.js中的networks选项）
4.记录下contract address，就给Router的合约地址。


##### 3.部署前端
> 这里使用githubPages部署的，仅供参考。
1.前端有四处需要改动：


    1.在packages.json中:   "homepage": "https://zhangliang7190.github.io/ZLswap",
    2.在packages.json中:   "scripts" : ,"deploy":"gh-pages -d build"
    3.src/constants/index.ts:export const ROUTER_ADDRESS = '0x463BB2E82ef14EffE0a64c965DB37c350CCA2fEE'
    4..env中修改为Klaytn的网络配置：
	REACT_APP_CHAIN_ID="8217"
	REACT_APP_NETWORK_URL="https://api.cypress.klaytn.net:8651"
	
2.部署。在项目目录中

    #安装gh-pages
    yarn add gh-pages
    #将修改commit并push
    git add .
    git commit -m "change .env to Klaytn"
    git push
    #编译并部署
    yarn build
    yarn deploy

### SushiSwap部署

##### 1.按照部署UpSwap的步骤部署Factory和Router

##### 2.部署SushiToken和MasterChef
1.将/contracts/SushiToken.sol和/migrations/1_initial_SushiToken.js解除后缀改动，将其他文件按照.sol->.solxx,.js->.jsxxxx格式改动，使其失效。
2.注释部署MasterChef的deployer方法，这样仅可部署SushiToken。
3.修改truffle-config.js中的编译器版本为“0.6.12”运行下面命令：
`truffle migrate --network networkname`
4.记录SushiToken合约地址。
5.注释部署SushiToken的deployer方法，这样仅可部署MasterChef。
6.设置部署参数，依次分别为：SushiToken合约地址，开发者地址，每个block产生的sushi数量，开始挖矿块高，结束挖矿块高。
7.运行下面命令：
`truffle migrate --network networkname`
8.记录MasterChef合约地址。

##### 部署SushiBar
1.将/contracts/SushiBar.sol和/migrations/1_initial_SushiBar.js解除后缀改动，将其他文件按照.sol->.solxx,.js->.jsxxxx格式改动，使其失效。
2.设置部署参数，参数为sushi合约地址。
3.运行下面命令：
`truffle migrate --network networkname`
4.记录SushiBar合约地址。

##### 部署SushiMaker
1.将/contracts/SushiMaker.sol和/migrations/1_initial_SushiMaker.js解除后缀改动，将其他文件按照.sol->.solxx,.js->.jsxxxx格式改动，使其失效。
2.设置部署参数，依次是：Factory合约地址，SushiBar地址，SushiToken合约地址，WKlay地址。
3.运行下面命令：
`truffle migrate --network networkname`
4.记录SushiMaker合约地址。