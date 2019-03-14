import Web3 from "web3";

import metaCoinArtifact from "../../build/contracts/MetaCoin.json";
import twentyOneArtifact from "../../build/contracts/TwentyOneGame.json";

import PubNub from 'pubnub';

var GameContract;
var bytecode = "60806040527fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff600855336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055503460048190555061012c600781905550611937806100876000396000f3fe6080604052600436106100e6576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680630e1da6c3146100eb5780630e76f9db14610102578063238ac9331461012d57806359a5f12d14610184578063701bd985146101db57806370dea79a146102265780637a4558941461025157806393694f6714610268578063b688a363146102bf578063bdb337d1146102c9578063c19d93fb146102f8578063ceec2c9014610369578063d24257c014610458578063d30895e414610483578063ea8a1af0146104da578063f6b4dfb4146104f1575b600080fd5b3480156100f757600080fd5b50610100610548565b005b34801561010e57600080fd5b5061011761068c565b6040518082815260200191505060405180910390f35b34801561013957600080fd5b50610142610692565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34801561019057600080fd5b506101996106b8565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b3480156101e757600080fd5b50610224600480360360408110156101fe57600080fd5b81019080803560ff169060200190929190803560ff1690602001909291905050506106de565b005b34801561023257600080fd5b5061023b610beb565b6040518082815260200191505060405180910390f35b34801561025d57600080fd5b50610266610bf1565b005b34801561027457600080fd5b5061027d610da5565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b6102c7610dcb565b005b3480156102d557600080fd5b506102de611063565b604051808215151515815260200191505060405180910390f35b34801561030457600080fd5b5061030d611076565b604051808460ff1660ff1681526020018360ff1660ff1681526020018273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001935050505060405180910390f35b34801561037557600080fd5b506104566004803603608081101561038c57600080fd5b81019080803560ff169060200190929190803560ff169060200190929190803590602001906401000000008111156103c357600080fd5b8201836020820111156103d557600080fd5b803590602001918460018302840111640100000000831117156103f757600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f820116905080830192505050505050509192919290803560ff1690602001909291905050506110c8565b005b34801561046457600080fd5b5061046d611370565b6040518082815260200191505060405180910390f35b34801561048f57600080fd5b50610498611376565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b3480156104e657600080fd5b506104ef61139b565b005b3480156104fd57600080fd5b506105066115a0565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b600560009054906101000a900460ff161515156105cd576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252600f8152602001807f47616d652068617320656e6465642e000000000000000000000000000000000081525060200191505060405180910390fd5b60085442101515156105de57600080fd5b6001600560006101000a81548160ff0219169083151502179055506000610629600660000160029054906101000a900473ffffffffffffffffffffffffffffffffffffffff166115a8565b90508073ffffffffffffffffffffffffffffffffffffffff166108fc3073ffffffffffffffffffffffffffffffffffffffff16319081150290604051600060405180830381858888f19350505050158015610688573d6000803e3d6000fd5b5050565b60075481565b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600560009054906101000a900460ff16151515610763576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252600f8152602001807f47616d652068617320656e6465642e000000000000000000000000000000000081525060200191505060405180910390fd5b600660000160029054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614151561082b576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252600e8152602001807f4e6f7420796f7572207475726e2e00000000000000000000000000000000000081525060200191505060405180910390fd5b60018160ff1610158015610843575060038160ff1611155b15156108dd576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252602b8152602001807f4d6f7665206f7574206f662072616e67652e204d75737420626520626574776581526020017f656e203120616e6420332e00000000000000000000000000000000000000000081525060400191505060405180910390fd5b601581600660000160019054906101000a900460ff160160ff161115151561096d576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260158152602001807f4d6f766520776f756c64206578636565642032312e000000000000000000000081525060200191505060405180910390fd5b8160ff16600660000160009054906101000a900460ff1660ff161415156109fc576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252601a8152602001807f496e636f72726563742073657175656e6365206e756d6265722e00000000000081525060200191505060405180910390fd5b80600660000160018282829054906101000a900460ff160192506101000a81548160ff021916908360ff160217905550610a35336115a8565b600660000160026101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506001600660000160008282829054906101000a900460ff160192506101000a81548160ff021916908360ff1602179055507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff6008819055506015600660000160019054906101000a900460ff1660ff161415610b68576001600560006101000a81548160ff0219169083151502179055503373ffffffffffffffffffffffffffffffffffffffff166108fc3073ffffffffffffffffffffffffffffffffffffffff16319081150290604051600060405180830381858888f19350505050158015610b66573d6000803e3d6000fd5b505b7f10ac166a969b6ae9b140c9d6b88c6c4e565e4fc22f858bf92f1542535f0f161a338383604051808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018360ff1660ff1681526020018260ff1660ff168152602001935050505060405180910390a15050565b60085481565b600560009054906101000a900460ff16151515610c76576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252600f8152602001807f47616d652068617320656e6465642e000000000000000000000000000000000081525060200191505060405180910390fd5b610c7f336115a8565b73ffffffffffffffffffffffffffffffffffffffff16600660000160029054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16141515610d6c576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260238152602001807f43616e6e6f7420737461727420612074696d656f7574206f6e20796f7572736581526020017f6c662e000000000000000000000000000000000000000000000000000000000081525060400191505060405180910390fd5b60075442016008819055507f02bdd5174ce27e71542ca96bbba5c2c21920793759d94795d2f17eff6f7f2a0f60405160405180910390a1565b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600073ffffffffffffffffffffffffffffffffffffffff16600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16141515610e91576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260198152602001807f47616d652068617320616c726561647920737461727465642e0000000000000081525060200191505060405180910390fd5b600560009054906101000a900460ff16151515610f16576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260128152602001807f47616d65207761732063616e63656c65642e000000000000000000000000000081525060200191505060405180910390fd5b60045434141515610f8f576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260118152602001807f57726f6e672062657420616d6f756e742e00000000000000000000000000000081525060200191505060405180910390fd5b33600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff16600660000160026101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055507f762f260439bb4be3ef6e4dc2786e2e7bd187d3d80b79057d7a424fe98563e33560405160405180910390a1565b600560009054906101000a900460ff1681565b60068060000160009054906101000a900460ff16908060000160019054906101000a900460ff16908060000160029054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905083565b600660000160009054906101000a900460ff1660ff168460ff161015151561117e576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260248152602001807f53657175656e6365206e756d6265722063616e6e6f7420676f206261636b776181526020017f7264732e0000000000000000000000000000000000000000000000000000000081525060400191505060405180910390fd5b600061124a308686604051602001808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166c010000000000000000000000000281526014018360ff1660ff167f01000000000000000000000000000000000000000000000000000000000000000281526001018260ff1660ff167f01000000000000000000000000000000000000000000000000000000000000000281526001019350505050604051602081830303815290604052805190602001206117e1565b90506112568184611839565b600260006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555061129f336115a8565b600360006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555084600660000160006101000a81548160ff021916908360ff16021790555083600660000160016101000a81548160ff021916908360ff16021790555033600660000160026101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555061136985836106de565b5050505050565b60045481565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614151561145f576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252601d8152602001807f4f6e6c7920666972737420706c61796572206d61792063616e63656c2e00000081525060200191505060405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff16600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16141515611525576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260198152602001807f47616d652068617320616c726561647920737461727465642e0000000000000081525060200191505060405180910390fd5b6001600560006101000a81548160ff0219169083151502179055503373ffffffffffffffffffffffffffffffffffffffff166108fc3073ffffffffffffffffffffffffffffffffffffffff16319081150290604051600060405180830381858888f1935050505015801561159d573d6000803e3d6000fd5b50565b600030905090565b60008073ffffffffffffffffffffffffffffffffffffffff16600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614151515611670576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260158152602001807f47616d6520686173206e6f7420737461727465642e000000000000000000000081525060200191505060405180910390fd5b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1614156116ef57600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1690506117dc565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff16141561176e576000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1690506117dc565b6040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252600f8152602001807f496e76616c696420706c617965722e000000000000000000000000000000000081525060200191505060405180910390fd5b919050565b60008160405160200180807f19457468657265756d205369676e6564204d6573736167653a0a333200000000815250601c01828152602001915050604051602081830303815290604052805190602001209050919050565b600080600080611848856118c6565b80935081945082955050505060018684848460405160008152602001604052604051808581526020018460ff1660ff1681526020018381526020018281526020019450505050506020604051602081039080840390855afa1580156118b1573d6000803e3d6000fd5b50505060206040510351935050505092915050565b6000806000604184511415156118db57600080fd5b60008060006020870151925060408701519150606087015160001a9050808383955095509550505050919390925056fea165627a7a7230582085f54573cb6d2bde2fe0c00cc536be1d0b660d58a5131d8be8ff51343c0c9ecc0029";

var abi = twentyOneArtifact.abi;
let util;
let eth_abi;

// GameContract = Contract(twentyOneArtifact);

let accounts;
let account;



// accounts = window.web3.eth.getAccounts();
// account = accounts[0];

let maxuint = 115792089237316195423570985008687907853269984665640564039457584007913129639935;
// var maxuint2 = web3.toBigNumber(2).pow(256).sub(1);
// console.log("max", maxuint, maxuint2, web3);
// console.log(maxuint === maxuint2);

let pubnub = new PubNub({
  publishKey: 'pub-c-bb74265f-0631-4f6f-b34f-67dc66d76cfb',
  subscribeKey: 'sub-c-5b729cbc-2bd6-11e9-828a-52de7eb65672'
});

pubnub.addListener({
  message: ({ message }) => {
    // console.log("MY MESSAGE IS", message.move);
    try {
      if (message.timeout) {
        console.log("RECEIVED MESSAGE timeout", message);
        App.updateLatePlayer(message.player);
      }
      else if (message.noLatePlayer) {
        console.log("RECEIVED MESSAGE noLatePlayer", message);
        App.updateLatePlayer(NaN);
      }
      else {
        console.log("RECEIVED MESSAGE updateIfValid", message);
        App.updateIfValid(message.move, message.signature);
      }
    } catch(err) {
      console.log("error is", err);
    }
    // App.updateIfValid(message.move, message.signature);
  }
});

document.getElementById('timeoutButton').disabled = true;


window.App = {
  // web3: null, //i don't think this is needed
  account: null,
  // meta: null, //Metacoin
  // game: null, //metacoin
  contract: null,
  opponent: null,
  gameOver: false,
  seq: 0,
  num: 0,
  whoseTurn: null,
  pendingMove: null,
  signature: null,
  timeout: null,
  latePlayer: null,
  timeLeft: null,


  start: async function() {
    const { web3 } = this;

    const that = this;

    util = require('ethereumjs-util');
    eth_abi = require('ethereumjs-abi');

    // get accounts
    accounts = await web3.eth.getAccounts();
    that.account = accounts[0];

    // GameContract = new web3.eth.Contract(abi);

  },

// TwentyOneGame Contract Functions 
  
  prefixed: function (hash) {
    return eth_abi.soliditySHA3(
    ["string", "bytes32"],
    ["\x19Ethereum Signed Message:\n32", hash]
    );
  },

  recoverSigner: function(message, signature) {
    let split = util.fromRpcSig(signature);
    let publicKey = util.ecrecover(message, split.v, split.r, split.s);
    let signer = util.pubToAddress(publicKey).toString("hex");
    return signer;
  },

  stateHash: function (seq, number) {
    return "0x" + eth_abi.soliditySHA3(
      ["address", "uint8", "uint8"],
      [this.contract.options.address, seq, number]
    ).toString("hex");
  },

  // beginTimeout: async function () {
  //   this.fetchContractState();
  //   let startTime = "05:00"
  //   document.getElementById('timer').innerHTML = startTime;
  //   let item = document.getElementById('timeout');
  //   item.className = 'unhidden' ;
  //   this.value = 'hide';
  //   document.getElementById('timeoutButton').disabled = true;
  //   startTimer();

  //   function checkSecond(sec) {
  //     if (sec < 10 && sec >= 0) {sec = "0" + sec}; // add zero in front of numbers < 10
  //     if (sec < 0) {sec = "59"};
  //     return sec;
  //   }
  //   function startTimer() {
  //       let presentTime = document.getElementById('timer').innerHTML;
  //       let timeArray = presentTime.split(/[:]+/);
  //       let m = timeArray[0];
  //       let s = checkSecond((timeArray[1] - 1));
  //       if(s==59){m=m-1}
  //       if(m<0){
  //         alert('timer completed')
  //         clearTimeout();
  //       }
        
  //       document.getElementById('timer').innerHTML =
  //         m + ":" + s;
  //       setTimeout(startTimer, 1000);
  //   }

  // },

  //https://codepen.io/ishanbakshi/pen/pgzNMv
  // startTimeout: async function() {
  //   let that = this;

  //   let address = document.getElementById('address').value;
  //   const channel = '21-' + that.contract.options.address;

  //   const timeout = (obj) => {
  //     return new Promise((resolve, reject) => {
  //       that.contract.methods.startTimeout().send(obj, (error, transactionHash) => {
  //         if (error) {
  //           reject(error);
  //         } else {
  //           resolve(transactionHash);
  //         }
  //       })
  //     })
  //   };

  //   const transactionHash = await timeout({
  //     from: that.account
  //   });

  //   const message = {
  //     timeout: true,
  //     timeLeft: 5,
  //   };
    
  //   pubnub.publish({
  //     channel: channel,
  //     message
  //   });

    
  //   let startTime = "05:00"
  //   document.getElementById('timer').innerHTML = startTime;
  //   let item = document.getElementById('timeout');
  //   item.className = 'unhidden' ;
  //   this.value = 'hide';
  //   document.getElementById('timeoutButton').disabled = true;
  //   startTimer();

  //   function checkSecond(sec) {
  //     if (sec < 10 && sec >= 0) {sec = "0" + sec}; // add zero in front of numbers < 10
  //     if (sec < 0) {sec = "59"};
  //     return sec;
  //   }
  //   function startTimer() {
  //       let presentTime = document.getElementById('timer').innerHTML;
  //       let timeArray = presentTime.split(/[:]+/);
  //       let m = timeArray[0];
  //       let s = checkSecond((timeArray[1] - 1));
  //       if(s==59){m=m-1}
  //       if(m<0){
  //         alert('timer completed')
  //         clearTimeout();
  //       }
        
  //       document.getElementById('timer').innerHTML =
  //         m + ":" + s;
  //       setTimeout(startTimer, 1000);
  //   }
  // },

  updateLatePlayer: function (player) {
    let that = this;
    let obj = JSON.parse(localStorage.getItem(that.contract.options.address)); 
    
    if (player) {
      that.latePlayer = player;
      obj.latePlayer = that.latePlayer;  
    }
    else {
      that.latePlayer = null;
      obj.latePlayer = that.latePlayer;
    }
    
    localStorage.setItem(that.contract.options.address, JSON.stringify(obj));
    that.fetchContractState();
  },

  moveFromStateAndStartTimeout: async function() {
    let that = this;
    
    async function startTimeout() {
      console.log("yes");
      const timeout = (obj) => {
        return new Promise((resolve, reject) => {
          that.contract.methods.startTimeout().send(obj, (error, transactionHash) => {
            if (error) {
              reject(error);
            } else {
              resolve(transactionHash);
            }
          })
        })
      };
      
      const transactionHash = await timeout({
        from: that.account
      });

      if (transactionHash) {
        console.log("TIMEOUT STARTED", transactionHash);
        that.sendTimeoutMessage();
      }
      else {
        console.log("TIMEOUT FAILED", transactionHash); 
      }
      that.fetchContractState();
  }

    console.log("THIS IS IS ", this);
    console.log("THAT THAT", that);
    // this.signature means the other user has sent them a move
    if (this.pendingMove && !(this.signature)) {
      console.log("Newest move is on-chain", this);
      await that.chainMove(this.seq, this.pendingMove);
    }
    else {  
      await this.contractMove(this.pendingMove);
      // nothing
    }
    await startTimeout();
    await this.fetchContractState();
  },

  chainMove: async function (seq, pendingMove) {
    let that = this;
    const move = (obj) => {
      return new Promise((resolve, reject) => {
        that.contract.methods.move(seq, pendingMove).send(obj, (error, transactionHash) => {
          if (error) {
            reject(error);
          } else {
            resolve(transactionHash);
          }
        })
      })
    };

    const transactionHash = await move({
      from: that.account
    });

    const message = {
      timeout: true
    };
    let channel = '21-' + that.contract.options.address;
    await pubnub.publish({
      channel: channel,
      message
    });

    that.fetchContractState();
  },

  sendUpdateMessage: function () {
    const message = {
      noLatePlayer: true
    };
    let channel = '21-' + this.contract.options.address;
    pubnub.publish({
      channel: channel,
      message
    });
  }, 

  sendTimeoutMessage: function () {
    const message = {
      timeout: true,
      player: this.opponent
    };
    let channel = '21-' + this.contract.options.address;
    pubnub.publish({
      channel: channel,
      message
    }); 
  },

  //this function starts a new instance of a game
  startGame: async function() {
    const { web3 } = this;
    var that = this;

    GameContract = new web3.eth.Contract(abi);

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
        })
      })
    };

    let game = new Object();
    
    let contract = await deployContract({
      from: that.account,
      gas: 2000000,
      gasPrice: 3000000000,
      value: web3.utils.toWei('0.1', 'ether'),
    });

    localStorage.setItem(contract.options.address, JSON.stringify(game));

    that.contract = contract;

    that.subscribe();
    console.log("Deployment succeeded. Contract address: ", contract.options.address);

    document.getElementById('addy').innerHTML = contract.options.address;
    document.getElementById('cancelContract').style.display = 'block';

    that.contract.events.GameStarted(function () {
      that.contract.methods.player2().call().then((opponent) => {
        //update local state to reflect our opponent's address
        //and the fact that it's our turn.
        let obj = JSON.parse(localStorage.getItem(that.contract.options.address)); 
        that.opponent = opponent;
        that.whoseTurn = that.account;
        obj.opponent = that.opponent;
        obj.whoseTurn = that.whoseTurn;
        localStorage.setItem(that.contract.options.address, JSON.stringify(obj));
        document.getElementById('whoseTurn').innerHTML = obj.whoseTurn;
        document.getElementById('timeoutButton').disabled = false;
        document.getElementById('cancelContract').style.display = 'none';
      }) 
    });
  },

  cancelGame: async function() {
    let that = this;

    const cancel = (obj) => {
      return new Promise((resolve, reject) => {
        this.contract.methods.cancel().send(obj, (error, cancellation) => {
          if (error) {
            reject(error);
          }
          else {
            resolve(cancellation);
          }
        })
      })
    };

    await cancel({
      from: that.account
    });

  },

  subscribe: async function () {
    let that = this;
    console.log("this in subscribe is", this.contract);
    
    const allEvents = (obj) => {
      return new Promise((resolve, reject) => {
        this.contract.events.allEvents(obj, (error, events) => {
          if (error) {
            reject(error);
          } else {
            resolve(events);
          }
        })
      })
    };


    const events = await allEvents({
      fromBlock: 0,
      toBlock: 'latest'
    });
    that.fetchContractState();

    let channel = '21-' + this.contract.options.address;
    
    pubnub.subscribe({
      channels: [channel],
    });
  },



  join: async function () {
    const { web3 } = this;
    
    let that = this;

    let address = document.getElementById('address').value;


    let contract = new web3.eth.Contract(abi, address);
    // contract.options.address = address;
    // fetch player 1
    contract.methods.player1().call(async function (err, player1) {
      contract.methods.player2().call(async function (err, player2) {
        if (that.account === player1) {
          //if we're player 1
          document.getElementById('addy').innerHTML = address;
          if (player2 !== "0x0000000000000000000000000000000000000000") {
            //if there's already a player2
            that.whoseTurn = that.account;
            that.opponent = player2;
            let obj = JSON.parse(localStorage.getItem(address)); 
            obj.opponent = that.opponent;
            localStorage.setItem(address, JSON.stringify(obj));
          }
          if (player2 === "0x0000000000000000000000000000000000000000") {
            document.getElementById('cancelContract').style.display = 'block';
          }
          that.contract = contract;
          that.fetchContractState();
          that.subscribe();
        } else if (that.account === player2) {
          // if we're player 2
          // document.getElementById('addy').innerHTML = window.localStorage.address;
          that.opponent = player1;
          that.whoseTurn = player1;
          that.contract = contract;
          document.getElementById('addy').innerHTML = address;
          that.fetchContractState();
          that.subscribe();
        } else {
          //if we're neither player, let's try to join.
          const joinGame = (obj) => {
            return new Promise((resolve, reject) => {
              contract.methods.join().send(obj, (error, transactionHash) => {
                if (error) {
                  reject(error);
                } else {
                  resolve(transactionHash);
                }
              })
            })
          };

          const transactionHash = await joinGame({
            value: web3.utils.toWei('0.1', 'ether'),
            from: that.account
          });

          const receipt = await web3.eth.getTransactionReceipt(transactionHash);

          if (receipt.status) {
            // document.getElementById('addy').innerHTML = localStorage.address;
            that.contract = contract;
            that.opponent = player1; 
            that.whoseTurn = player1;
            let obj = new Object();
            obj.opponent = player1;
            obj.whoseTurn = player1;
            localStorage.setItem(address, JSON.stringify(obj));
            document.getElementById('cancelContract').style.display = 'none';
            document.getElementById('addy').innerHTML = address;
            that.subscribe(); 
          }

        }
      })
    })
    document.getElementById('timeoutButton').disabled = false;
          
  },


  fetchContractState: async function () {
    let that = this;

    const getState = (obj) => {
      return new Promise((resolve, reject) => {
        that.contract.methods.state().call(obj).then((state) => {
          resolve(state);          
        }) 
      })
    };
    
    const getTimeout = (obj) => {
      return new Promise((resolve, reject) => {
        that.contract.methods.timeout().call(obj, (error, timeout) => {
          if (error) {
            reject(error);
          } else {
            resolve(timeout);
          }
        })
      })
    };

    const isGameOver = (obj) => {
      return new Promise((resolve, reject) => {
        that.contract.methods.gameOver().call(obj, (error, gameOver) => {
          if (error) {
            reject(error);
          } else {
            resolve(gameOver);
          }
        })
      })
    };
    
    const contractState = await getState({
      from: this.account
    });

    let seq = Number(contractState[0]);
    let num = Number(contractState[1]);
    let whoseTurn = contractState[2];

    if (seq > that.seq) {
      that.seq = seq;
      that.num = num;
      that.whoseTurn = whoseTurn;
      that.pendingMove = null;
      that.signature = null;
      document.getElementById('chainNumber').innerHTML = that.num;
      document.getElementById('chainSequence').innerHTML = that.seq;
      document.getElementById('chainWhoseTurn').innerHTML = that.whoseTurn
      document.getElementById('oppAddress').innerHTML = that.opponent;
    }

    let obj = JSON.parse(localStorage.getItem(this.contract.options.address)); 
    
    document.getElementById('whoseTurn').innerHTML = obj.whoseTurn;
    //i want to fetch the opponents most recent messagee but not alter the new messaage. 
    try {
      if (obj.seq > that.seq) {
        that.seq = obj.seq;
        that.num = obj.num;
        that.whoseTurn = obj.whoseTurn;
        that.signature = obj.signature;
        that.pendingMove = obj.pendingMove;
        document.getElementById('number').innerHTML = obj.num;
        document.getElementById('sequence').innerHTML = obj.seq;
        document.getElementById('signature').innerHTML = obj.signature;
        document.getElementById('oppAddress').innerHTML = obj.opponent;
      }      
    } catch(err) {
      console.log("Nothing to fetch")
    }
    

    // console.log("Fetching object state", obj);
    // console.log("THAT in fetch", that);

    // console.log("web3", this);
    
    // const BN = this.web3.utils.BN;
    // let maxxx = new BN('115792089237316195423570985008687907853269984665640564039457584007913129639935');
    // console.log("MAXXX", maxxx);
    // const timeout = await getTimeout({});
    // console.log("TIMEOUT", timeout, "MAXUINT", maxxx);
    // console.log(timeout === maxxx);
    // if (String(timeout) === String(maxxx)) {
    //   // A value of 2^256-1 indicates no timeout.
    //   that.timeout = null;
    //   that.latePlayer = null;
    //   obj.timeout = that.timeout;
    //   obj.latePlayer = that.latePlayer;
    // } else {
    //   that.timeout = Number(timeout);
    //   that.latePlayer = whoseTurn;
    //   obj.timeout = that.timeout;
    //   obj.latePlayer = that.latePlayer;
    // }

    

    const gameOver = await isGameOver({});
    that.gameOver = gameOver;
    obj.gameOver = that.gameOver;
    localStorage.setItem(this.contract.options.address, JSON.stringify(obj));

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

    let num = this.num;
    let seq = this.seq;

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
    let message = this.prefixed(this.stateHash(seq, num));
    let signer = "0x" + this.recoverSigner(message, signature);

    if (signer !== this.opponent.toLowerCase()) {
      console.log("CANT UPDATE 4");
      return;
    }

    this.seq = seq;
    this.num = num;
    this.whoseTurn = this.account;
    this.pendingMove = null;
    this.signature = signature;

    //updating local storage
    let obj = JSON.parse(localStorage.getItem(this.contract.options.address)); 
    // console.log("My old obj", obj);
    obj.seq = this.seq;
    obj.num = this.num;
    obj.whoseTurn = this.whoseTurn;
    obj.signature = this.signature;
    obj.pendingMove = this.pendingMove;
    localStorage.setItem(this.contract.options.address, JSON.stringify(obj));
    // console.log("My new obj", obj);

    document.getElementById('number').innerHTML = obj.num;
    document.getElementById('sequence').innerHTML = obj.seq;
    document.getElementById('signature').innerHTML = obj.signature;
    document.getElementById('oppAddress').innerHTML = obj.opponent; 
    document.getElementById('whoseTurn').innerHTML = obj.whoseTurn;  
    
  },



move: async function (n) {
  const { web3 } = this;

  // const n = parseInt(document.getElementById('move').value);
  // const checked = document.getElementById('onChain').checked;
  let that = this;
  let message = this.stateHash(this.seq + 1, this.num + n);
  let obj = JSON.parse(localStorage.getItem(that.contract.options.address)); 
  console.log("MOVEE THAT", that);
  if (this.num + n === 21) { 
    this.contractMove(n);
  } else {
      //const address = web3.utils.toChecksumAddress(this.account);
      
      if (that.latePlayer === that.account){
            const getState = (obj) => {
              return new Promise((resolve, reject) => {
                that.contract.methods.state().call(obj).then((state) => {
                  resolve(state);          
                }) 
              })
            };
            const contractState = await getState({
              from: this.account
            });

            let seq = Number(contractState[0]);
            console.log("SEQUENCE", seq);
            this.chainMove(seq, n);
            that.sendUpdateMessage();
            that.pendingMove = null; 
            obj.pendingMove = that.pendingMove;
      } else {
      
          web3.eth.personal.sign(message, this.account,
            async (error, signature) => {
              if (error) return console.log("move error", error);
              
              // if (checked) { //if user wants on chain transaction
              //   that.contractMove(that.pendingMove);
              // }
              
              const message = {
                move: n,
                signature: signature
              };
              const channel = '21-' + that.contract.options.address;
              pubnub.publish({
                channel: channel,
                message
              });   
              that.pendingMove = n; 
              obj.pendingMove = that.pendingMove;
        });
        that.whoseTurn = that.opponent;
        obj.whoseTurn = that.whoseTurn;
        localStorage.setItem(that.contract.options.address, JSON.stringify(obj));
        document.getElementById('whoseTurn').innerHTML = obj.whoseTurn;  
      }
  }

  console.log("AFTER MOVE", that);
},


contractMove: async function (n, cb) {
  var that = this;

  // const getGasEstimate = (obj) => {
  //   return new Promise((resolve, reject) => {
  //     this.contract.methods.moveFromState(
  //       this.seq, 
  //       this.num,
  //       this.signature, 
  //       n).estimateGas(obj).then((gasAmount) => {
  //         resolve(gasAmount);
  //     })
  //   })
  // };

  const moveOnChain = (obj) => {
    return new Promise((resolve, reject) => {
      this.contract.methods.moveFromState(
        this.seq, 
        this.num,
        this.signature, 
        n).send(obj).then((trxHash) => {
          resolve(trxHash);
      })
    })
  };

  // const gasPrice = getGasEstimate({
  //   from: this.account
  // });

  const move = await moveOnChain({
    from: this.account,
    gas: 2000000
  });

},

};

window.App = App;
// let pubnub = new PubNub({
//   publishKey: 'pub-c-bb74265f-0631-4f6f-b34f-67dc66d76cfb',
//   subscribeKey: 'sub-c-5b729cbc-2bd6-11e9-828a-52de7eb65672'
// });

// pubnub.addListener({
//   message: msg => {
//     console.log("MY MESSAGE IS", msg);
//     // App.updateIfValid(msg.message.move, msg.message.signature);
//   },
// });


window.addEventListener("load", async function() {
  if (window.ethereum) {
    // use MetaMask's provider
    App.web3 = new Web3(window.ethereum);
    window.ethereum.enable(); // get permission to access accounts
  } 
  // else {
  //   console.warn(
  //     "No web3 detected. Falling back to http://127.0.0.1:9545. You should remove this fallback when you deploy live",
  //   );
  //   // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
  //   web3 = new Web3(
  //     new Web3.providers.HttpProvider("http://127.0.0.1:9545"),
  //   );
  // }

  // accounts = await web3.eth.getAccounts();
  // account = accounts[0];
  // console.log("ACCOUNT2", account);
  App.start();
});
