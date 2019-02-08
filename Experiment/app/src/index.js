import Web3 from "web3";

import metaCoinArtifact from "../../build/contracts/MetaCoin.json";
import twentyOneArtifact from "../../build/contracts/TwentyOneGame.json";

var GameContract;
var bytecode = '0x60806040527fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff600655336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055503460028190555061012c600581905550611775806100876000396000f3fe6080604052600436106100c5576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680630e1da6c3146100ca5780630e76f9db146100e157806359a5f12d1461010c578063701bd9851461016357806370dea79a146101ae5780637a455894146101d9578063b688a363146101f0578063bdb337d1146101fa578063c19d93fb14610229578063ceec2c901461029a578063d24257c014610389578063d30895e4146103b4578063ea8a1af01461040b575b600080fd5b3480156100d657600080fd5b506100df610422565b005b3480156100ed57600080fd5b506100f6610566565b6040518082815260200191505060405180910390f35b34801561011857600080fd5b5061012161056c565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34801561016f57600080fd5b506101ac6004803603604081101561018657600080fd5b81019080803560ff169060200190929190803560ff169060200190929190505050610592565b005b3480156101ba57600080fd5b506101c3610a9f565b6040518082815260200191505060405180910390f35b3480156101e557600080fd5b506101ee610aa5565b005b6101f8610c59565b005b34801561020657600080fd5b5061020f610ef1565b604051808215151515815260200191505060405180910390f35b34801561023557600080fd5b5061023e610f04565b604051808460ff1660ff1681526020018360ff1660ff1681526020018273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001935050505060405180910390f35b3480156102a657600080fd5b50610387600480360360808110156102bd57600080fd5b81019080803560ff169060200190929190803560ff169060200190929190803590602001906401000000008111156102f457600080fd5b82018360208201111561030657600080fd5b8035906020019184600183028401116401000000008311171561032857600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f820116905080830192505050505050509192919290803560ff169060200190929190505050610f56565b005b34801561039557600080fd5b5061039e6111b6565b6040518082815260200191505060405180910390f35b3480156103c057600080fd5b506103c96111bc565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34801561041757600080fd5b506104206111e1565b005b600360009054906101000a900460ff161515156104a7576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252600f8152602001807f47616d652068617320656e6465642e000000000000000000000000000000000081525060200191505060405180910390fd5b60065442101515156104b857600080fd5b6001600360006101000a81548160ff0219169083151502179055506000610503600460000160029054906101000a900473ffffffffffffffffffffffffffffffffffffffff166113e6565b90508073ffffffffffffffffffffffffffffffffffffffff166108fc3073ffffffffffffffffffffffffffffffffffffffff16319081150290604051600060405180830381858888f19350505050158015610562573d6000803e3d6000fd5b5050565b60055481565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600360009054906101000a900460ff16151515610617576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252600f8152602001807f47616d652068617320656e6465642e000000000000000000000000000000000081525060200191505060405180910390fd5b600460000160029054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415156106df576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252600e8152602001807f4e6f7420796f7572207475726e2e00000000000000000000000000000000000081525060200191505060405180910390fd5b60018160ff16101580156106f7575060038160ff1611155b1515610791576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252602b8152602001807f4d6f7665206f7574206f662072616e67652e204d75737420626520626574776581526020017f656e203120616e6420332e00000000000000000000000000000000000000000081525060400191505060405180910390fd5b601581600460000160019054906101000a900460ff160160ff1611151515610821576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260158152602001807f4d6f766520776f756c64206578636565642032312e000000000000000000000081525060200191505060405180910390fd5b8160ff16600460000160009054906101000a900460ff1660ff161415156108b0576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252601a8152602001807f496e636f72726563742073657175656e6365206e756d6265722e00000000000081525060200191505060405180910390fd5b80600460000160018282829054906101000a900460ff160192506101000a81548160ff021916908360ff1602179055506108e9336113e6565b600460000160026101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506001600460000160008282829054906101000a900460ff160192506101000a81548160ff021916908360ff1602179055507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff6006819055506015600460000160019054906101000a900460ff1660ff161415610a1c576001600360006101000a81548160ff0219169083151502179055503373ffffffffffffffffffffffffffffffffffffffff166108fc3073ffffffffffffffffffffffffffffffffffffffff16319081150290604051600060405180830381858888f19350505050158015610a1a573d6000803e3d6000fd5b505b7f10ac166a969b6ae9b140c9d6b88c6c4e565e4fc22f858bf92f1542535f0f161a338383604051808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018360ff1660ff1681526020018260ff1660ff168152602001935050505060405180910390a15050565b60065481565b600360009054906101000a900460ff16151515610b2a576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252600f8152602001807f47616d652068617320656e6465642e000000000000000000000000000000000081525060200191505060405180910390fd5b610b33336113e6565b73ffffffffffffffffffffffffffffffffffffffff16600460000160029054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16141515610c20576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260238152602001807f43616e6e6f7420737461727420612074696d656f7574206f6e20796f7572736581526020017f6c662e000000000000000000000000000000000000000000000000000000000081525060400191505060405180910390fd5b60055442016006819055507f02bdd5174ce27e71542ca96bbba5c2c21920793759d94795d2f17eff6f7f2a0f60405160405180910390a1565b600073ffffffffffffffffffffffffffffffffffffffff16600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16141515610d1f576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260198152602001807f47616d652068617320616c726561647920737461727465642e0000000000000081525060200191505060405180910390fd5b600360009054906101000a900460ff16151515610da4576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260128152602001807f47616d65207761732063616e63656c65642e000000000000000000000000000081525060200191505060405180910390fd5b60025434141515610e1d576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260118152602001807f57726f6e672062657420616d6f756e742e00000000000000000000000000000081525060200191505060405180910390fd5b33600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff16600460000160026101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055507f762f260439bb4be3ef6e4dc2786e2e7bd187d3d80b79057d7a424fe98563e33560405160405180910390a1565b600360009054906101000a900460ff1681565b60048060000160009054906101000a900460ff16908060000160019054906101000a900460ff16908060000160029054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905083565b600460000160009054906101000a900460ff1660ff168460ff161015151561100c576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260248152602001807f53657175656e6365206e756d6265722063616e6e6f7420676f206261636b776181526020017f7264732e0000000000000000000000000000000000000000000000000000000081525060400191505060405180910390fd5b60006110d8308686604051602001808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166c010000000000000000000000000281526014018360ff1660ff167f01000000000000000000000000000000000000000000000000000000000000000281526001018260ff1660ff167f010000000000000000000000000000000000000000000000000000000000000002815260010193505050506040516020818303038152906040528051906020012061161f565b90506110e3336113e6565b73ffffffffffffffffffffffffffffffffffffffff166111038285611677565b73ffffffffffffffffffffffffffffffffffffffff1614151561112557600080fd5b84600460000160006101000a81548160ff021916908360ff16021790555083600460000160016101000a81548160ff021916908360ff16021790555033600460000160026101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506111af8583610592565b5050505050565b60025481565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415156112a5576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252601d8152602001807f4f6e6c7920666972737420706c61796572206d61792063616e63656c2e00000081525060200191505060405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff16600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614151561136b576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260198152602001807f47616d652068617320616c726561647920737461727465642e0000000000000081525060200191505060405180910390fd5b6001600360006101000a81548160ff0219169083151502179055503373ffffffffffffffffffffffffffffffffffffffff166108fc3073ffffffffffffffffffffffffffffffffffffffff16319081150290604051600060405180830381858888f193505050501580156113e3573d6000803e3d6000fd5b50565b60008073ffffffffffffffffffffffffffffffffffffffff16600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16141515156114ae576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260158152602001807f47616d6520686173206e6f7420737461727465642e000000000000000000000081525060200191505060405180910390fd5b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff16141561152d57600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905061161a565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1614156115ac576000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905061161a565b6040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252600f8152602001807f496e76616c696420706c617965722e000000000000000000000000000000000081525060200191505060405180910390fd5b919050565b60008160405160200180807f19457468657265756d205369676e6564204d6573736167653a0a333200000000815250601c01828152602001915050604051602081830303815290604052805190602001209050919050565b60008060008061168685611704565b80935081945082955050505060018684848460405160008152602001604052604051808581526020018460ff1660ff1681526020018381526020018281526020019450505050506020604051602081039080840390855afa1580156116ef573d6000803e3d6000fd5b50505060206040510351935050505092915050565b60008060006041845114151561171957600080fd5b60008060006020870151925060408701519150606087015160001a9050808383955095509550505050919390925056fea165627a7a72305820c59e44dfac646103471b26f0e9e068a267f4d42da7faa482fc3d0b289d53a3c40029';
var abi = twentyOneArtifact.abi;
let util;

// GameContract = Contract(twentyOneArtifact);

var accounts;
var account;

const App = {
  web3: null,
  account: null,
  meta: null,
  game: null,

  start: async function() {
    const { web3 } = this;

    util = require('ethereumjs-util')

    // get accounts
    accounts = await web3.eth.getAccounts();
    account = accounts[0];
    console.log("accounts", accounts);
    
    GameContract = new web3.eth.Contract(abi);

    try {
      // get contract instance
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = metaCoinArtifact.networks[networkId];
      this.meta = new web3.eth.Contract(
        metaCoinArtifact.abi,
        deployedNetwork.address,
      );

      this.refreshBalance();

    } catch (error) {
      console.error("Could not connect to contract or chain.");
    }

    try {

      // get contract instance
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = twentyOneArtifact.networks[networkId];
      GameContract = new web3.eth.Contract(
        twentyOneArtifact.abi,
        //deployedNetwork.address,
      );

    } catch (error) {
      console.error("Could not connect to contract or chain.");
    }
  },

// TwentyOneGame Contract Functions 
  
  //this function starts a new instance of a game
  startGame: async function() {
    const { web3 } = this;
    var that = this;


    const deployContract = (obj) => {
      return new Promise((resolve, reject) => {
        GameContract.deploy( {
          data: bytecode
        }).send(obj).then((contract) => {
          // if (error) {
          //   reject(error);
          // } else {
            resolve(contract);
          // }
        });
      });
    }

    let contract = await deployContract({
      from: account,
      gas: 2000000,
      gasPrice: 3000000000,
      value: web3.utils.toWei('0.01', 'ether'),
    });

    that.contract = contract;

    that.subscribe();
    console.log("Deployment succeeded. Contract address: ", contract.options.address);

    that.contract.events.GameStarted(function () {
      that.contract.methods.player2().call().then((opponent) => {
        //update local state to reflect our opponent's address
        //and the fact that it's our turn.
        
        that.opponent = opponent;
        that.whoseTurn = that.account;
        console.log("OPOPO is", opponent, that.account);
      }); 
    });

    // console.log(contract);

    // GameContract.deploy( {
    //   data: bytecode
    // }).send({
    //   from: account,
    //   gas: 2000000,
    //   gasPrice: 3000000000,
    //   value: web3.utils.toWei('0.01', 'ether'),
    // }).then((contract) => {
    //   //console.log(contract.options.address) // instance with the new contract address
      
    //   that.contract = contract;

    //   if (contract.options.address) {
    //     that.subscribe();
    //     that.contract.events.GameStarted(function () {
    //       that.contract.methods.player2().call().then((opponent) => {
    //         //update local state to reflect our opponent's address
    //         //and the fact that it's our turn.
            
    //         that.opponent = opponent;
    //         that.whoseTurn = that.account;
    //         console.log("OPOPO is", opponent, that.account);
    //       }); 
    //     });
    //     console.log("Deployment successful @ address", contract.options.address);
    //   } 

    // });
  },

      // const sendCoins = (obj) => {
    //   return new Promise((resolve, reject) => {
    //     contract.methods.join().send(obj, (error, transactionHash) => {
    //       if (error) {
    //         reject(error)
    //       } else {
    //         resolve(transactionHash)
    //       }

    //     });
    //   })
    // }

  subscribe: function () {
    let that = this;
    console.log("this in subscribe is", this);
    this.contract.events.allEvents(function (err, event) {
      that.fetchContractState();  
    });

    // pubnub.subscribe({
    //   channels: ['21-' + this.contract.options.address],
    // });
  },

  join: async function () {
    const { web3 } = this;
    let that = this;

    let address = document.getElementById('address').value;

    // var address = "0x8B7E72e1815b0ACbA67453e87001Fe94534c8F52"; //user input
    let contract = GameContract;
    contract.options.address = address;

    // const sendCoins = (obj) => {
    //   return new Promise((resolve, reject) => {
    //     contract.methods.join().send(obj, (error, transactionHash) => {
    //       if (error) {
    //         reject(error)
    //       } else {
    //         resolve(transactionHash)
    //       }

    //     });
    //   })
    // }


    // const tranascationHash = await sendCoins({
    //   value:
    //   from: 
    // })
    // const tranascationHash = await sendCoins({
    //   value:
    //   from: 
    // })
    // const tranascationHash = await sendCoins({
    //   value:
    //   from: 
    // })
    // const tranascationHash = await sendCoins({
    //   value:
    //   from: 
    // })
    // const tranascationHash = await sendCoins({
    //   value:
    //   from: 
    // })

        // const sendCoins = (obj) => {
    //   return new Promise((resolve, reject) => {
    //     contract.methods.join().send(obj, (error, transactionHash) => {
    //       if (error) {
    //         reject(error)
    //       } else {
    //         resolve(transactionHash)
    //       }

    //     });
    //   })
    // }

    const join = (obj) => {
      return new Promise((resolve, reject) => {
        contract.methods.join().send(obj, (error, transactionHash) => {
          if (error) {
            reject(error);
          } else {
            resolve(transactionHash);
          }
        })
      });
    };

    const transactionHash = await join({
      value: web3.utils.toWei('0.01', 'ether'),
      from: account
    });

    const receipt = await web3.eth.getTransactionReceipt(transactionHash);

    contract.methods.player1().call().then((player1) => { 
      if (receipt.status) {
        console.log("Game Officially Joined");
        that.contract = contract;
        that.opponent = player1; //casino
        that.whoseTurn = player1;
        that.subscribe(); //not too sure what this does yet
        console.log("Join that", that);
      }

    });          
    
    // contract.methods.join().send({
    //   value: web3.utils.toWei('0.01', 'ether'),
    //   from: accounts[0]
    // }, async (error, transactionHash) => {
    //     if (error) console.log("JOIN ERROR", error);
    //     else {
    //     // console.log("Transaction hash", transactionHash);
    //       const receipt = await web3.eth.getTransactionReceipt(transactionHash);
    //       console.log("JOIN CONTRACT DATA", contract);
    //       console.log(receipt);

    //       contract.methods.player1().call().then((player1) => { 
    //         if (receipt.status) {
    //           console.log("Game Officially Joined");
    //           that.contract = contract;
    //           that.opponent = player1; //casino
    //           that.whoseTurn = player1;
    //           that.subscribe(); //not too sure what this does yet
    //           console.log("Join that", that);
    //         }

    //       })

          
    //     }
    //   }
    // );        
  },

  fetchContractState: function () {
    var that = this;

    // fetching state from the contract
    this.contract.methods.state().call({

    }, (error, state) => {
      if(error) return console.log(error);
      var seq = state[0];
      var num = state[1];
      var whoseTurn = state[2];
      
      if (seq > that.seq) {
        that.seq = seq;
        that.num = num;
        that.whoseTurn = whoseTurn;
        that.pendingMove = null;
        that.signature = null;
      }

      console.log("that is", that);
      console.log("state is", state);

    });
  },

  updateIfValid: function (move, signature) {
    if (this.whoseTurn !== this.opponent) {
      console.log("CANT UPDATE 1");
      return;
    }
    if (move < 1 || move > 3) {
      console.log("CANT UPDATE 2");
      return;
    }

    var num = this.num;
    var seq = this.seq;

    if (this.pendingMove) {
      seq += 1;
      num += this.pendingMove;
    }

    seq += 1;
    num += move;

    if (num > 21) {
      console.log("CANT UPDATE 3");
      return;
    }

    var message = prefixed(this.stateHash(seq, num));
    var signer = recoverSigner(message, signature);
    if (signer !== this.opponent.toLowerCase()) {
      console.log("CANT UPDATE 4");
      return;
    }

    this.seq = seq;
    this.num = num;
    this.whoseTurn = this.account;
    this.pendingMove = null;
    this.signature = signature;
  },

  prefixed: function (hash) {
    return web3.utils.soliditySha3(
    ["string", "bytes32"],
    ["\x19Ethereum Signed Message:\n32", hash]
    );
  },

// recoverSigner: function (message, signature) {
//   var split = util.fromRpcSig(signature);
//   var publicKey = util.ecrecover(message, split.v, split.r, split.s);
//   var signer = util.pubToAddress(publicKey).toString("hex");
//   return signer;
// },

stateHash: function (seq, number) {
  const { web3 } = this;
  return "0x" + web3.utils.soliditySha3(
    // ["address", "uint256", "uint256"],
    this.contract.address, seq, number
  ).toString("hex");
},

move: function (n) {
  const { web3 } = this;
  var that = this;
  var message = this.stateHash(this.seq + 1, this.num + n);

  if (this.num + n === 21) {//late player 
    this.contractMove(n);
  } else {
    web3.personal.sign(message, this.account,
      (error, signature) => {
        if (error) return console.log("move error", error);
        console.log("move signature is", signature);
      });
    that.whoseTurn = that.opponent;
    that.pendingMove = n; 
  }
},

contractMove: function (n, cb) {
  var that = this;

  async function callback(err, hash) {
    if (err) return console.log("ContractMove callback error", err);

    const receipt = await web3.eth.getTransactionReceipt(hash);



  }
},




// MetaCoin Contract Functions 
  refreshBalance: async function() {
    const { getBalance } = this.meta.methods;
    const balance = await getBalance(account).call();

    const balanceElement = document.getElementsByClassName("balance")[0];
    balanceElement.innerHTML = balance;
  },

  sendCoin: async function() {
    const amount = parseInt(document.getElementById("amount").value);
    const receiver = document.getElementById("receiver").value;

    this.setStatus("Initiating transaction... (please wait)");

    const { sendCoin } = this.meta.methods;
    await sendCoin(receiver, amount).send({ from: account });

    this.setStatus("Transaction complete!");
    this.refreshBalance();
  },

  setStatus: function(message) {
    const status = document.getElementById("status");
    status.innerHTML = message;
  },
};

window.App = App;

window.addEventListener("load", function() {
  if (window.ethereum) {
    // use MetaMask's provider
    App.web3 = new Web3(window.ethereum);
    window.ethereum.enable(); // get permission to access accounts
  } else {
    console.warn(
      "No web3 detected. Falling back to http://127.0.0.1:9545. You should remove this fallback when you deploy live",
    );
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    App.web3 = new Web3(
      new Web3.providers.HttpProvider("http://127.0.0.1:9545"),
    );
  }

  App.start();
});
