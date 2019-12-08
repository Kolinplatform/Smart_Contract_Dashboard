let WUSD = 'Ft8X1v1LTa1ABafufpaCWyVj8KkaxUWE6xBhW6sNFJck';
let WEUR = 'Gtb1WRznfchDnTh37ezoDTJ4wcoKaRsKqKjJjy7nm2zU';
let WBTC = '8LQW8f7P5d5PZM7GtZEBgaqRPGSzS3DfPuiXrURJ4AJS';
let KOLIN ='FiKspxSpkpzT4pMUA9ccZkbJmVXTdu4JhFDXNNXr5noW';
let WETH = '474jTeYx2r2Va35794tCScAXWJG9hU2HcgxzMowaZUnu';
let WLTC = 'HZk1mbfuJpmxU1Fs4AX5MWLVYtctsNcg6e2C6VKqK8zk';
let workToSubmitName ="";
let workToSubmitType="";
let workToSubmitModified="";
let workToSubmitBytes="";
let workToSubmitWords="";
let workToSubmitCharacters="";
let workToSubmitLines="";
let workToSubmitHash256="";
let workToSubmitHash512="";
let workToSubmitFutureBlocks ="";
let workToSubmitAssetID = "";
let amountToPay = "";
let datajson ="";
let workToSubmitAmountToPay = "";
let workToSubmitAssetIDChosen= "";
let currencySelectedToPayWith = document.querySelectorAll('[name="currency"]');
for (let i = 0; i < currencySelectedToPayWith.length; i++) {
  currencySelectedToPayWith[i].addEventListener("click", function() {
    workToSubmitAssetID = document.querySelector('[name="currency"]:checked').value;
    console.log(workToSubmitAssetID);
    if (workToSubmitAssetID == "WBTC"){(workToSubmitAmountToPay = priceToPayInWBTC)&&(workToSubmitAssetIDChosen = "8LQW8f7P5d5PZM7GtZEBgaqRPGSzS3DfPuiXrURJ4AJS")}
    else if (workToSubmitAssetID == "WUSD"){(workToSubmitAmountToPay = priceToPayInWUSD)&&(workToSubmitAssetIDChosen ='Ft8X1v1LTa1ABafufpaCWyVj8KkaxUWE6xBhW6sNFJck')}
    else if (workToSubmitAssetID == "WEUR"){(workToSubmitAmountToPay = priceToPayInWEUR)&&(workToSubmitAssetIDChosen ='Gtb1WRznfchDnTh37ezoDTJ4wcoKaRsKqKjJjy7nm2zU')}
    else if (workToSubmitAssetID == "KOLIN"){(workToSubmitAmountToPay = priceToPayInKOLIN)&&(workToSubmitAssetIDChosen ='FiKspxSpkpzT4pMUA9ccZkbJmVXTdu4JhFDXNNXr5noW')} 
    else if (workToSubmitAssetID == "WAVES"){(workToSubmitAmountToPay = priceToPayInWAVES)&&(workToSubmitAssetIDChosen = 'WAVES')} 
    else if (workToSubmitAssetID == "WETH"){(workToSubmitAmountToPay = priceToPayInWETH)&&(workToSubmitAssetIDChosen ='474jTeYx2r2Va35794tCScAXWJG9hU2HcgxzMowaZUnu')}
    else if (workToSubmitAssetID == "WLTC"){(workToSubmitAmountToPay = priceToPayInWLTC)&&(workToSubmitAssetIDChosen = 'HZk1mbfuJpmxU1Fs4AX5MWLVYtctsNcg6e2C6VKqK8zk')}
    else {console.log("please select a valid currency")} 
 // amountToPay = document.querySelector('[name="currency"]').innerText;
})};
//Adds WavesKeeper functionalities
//Calculate days in Month

var getDaysInMonth = function(month, year) {
  // Here January is 1 based
  //Day 0 is the last day in the previous month
  return new Date(year, month, 0).getDate();
  // Here January is 0 based
  // return new Date(year, month+1, 0).getDate();
};
var Jan = getDaysInMonth(1, 2019);
var Feb = getDaysInMonth(2, 2019);
var Mar = getDaysInMonth(3, 2019);
var Apr = getDaysInMonth(4, 2019);
var May = getDaysInMonth(5, 2019);
var Jun = getDaysInMonth(6, 2019);
var Jul = getDaysInMonth(7, 2019);
var Aug = getDaysInMonth(8, 2019);
var Sep = getDaysInMonth(9, 2019);
var Oct = getDaysInMonth(10, 2019);
var Nov = getDaysInMonth(11, 2019);
var Dec = getDaysInMonth(12, 2019);

//Import Kolin Balance
function getbalance() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var text = this.responseText;
      var obj = JSON.parse(text);
      var balancef = obj.balance / 100;
      //balances
      document.getElementById("KolinBalance").innerHTML = balancef
        .toFixed(2)
        .toLocaleString();
      document.getElementById("percentageKolinHolder").innerHTML = (
        (obj.balance / 300000000000) *
        100
      ).toFixed(2);
    }
  };
  xhttp.open(
    "GET",
    "https://nodes.wavesnodes.com/assets/balance/" +
      WavesAddress +
      "/FiKspxSpkpzT4pMUA9ccZkbJmVXTdu4JhFDXNNXr5noW?t=",
    true
  );
  xhttp.send();
  xhttp.onload = function() {
    if (xhttp.status !== 404 && xhttp.status !== 400) {
      getbalance2();
    } else {
      console.log("Please check entered address");
    }
  };
}
//BTC balance
function getbalance2() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var text = this.responseText;
      var obj = JSON.parse(text);
      //balances
      document.getElementById("BitcoinBalance").innerHTML = (
        obj.balance / 100000000
      )
        .toFixed(8)
        .toLocaleString();
      document.getElementById("percentageBitcoinHolder").innerHTML = (
        (obj.balance / 2100000000000000) *
        100
      ).toFixed(2);
    }
  };
  xhttp.open(
    "GET",
    "https://nodes.wavesnodes.com/assets/balance/" +
      WavesAddress +
      "/8LQW8f7P5d5PZM7GtZEBgaqRPGSzS3DfPuiXrURJ4AJS?t=",
    true
  );
  xhttp.send();
  getbalance3();
}
//WavesBalance
function getbalance3() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var text = this.responseText;
      var obj = JSON.parse(text);
      //balances
      document.getElementById("WavesBalance").innerHTML = (
        obj.balance / 100000000
      )
        .toFixed(8)
        .toLocaleString();
      document.getElementById("percentageWavesHolder").innerHTML = (
        (obj.balance / 100000000 / 100000000) *
        100
      ).toFixed(2);
    }
  };
  xhttp.open(
    "GET",
    "https://nodes.wavesplatform.com/addresses/balance/" + WavesAddress + "?t=",
    true
  );
  xhttp.send();
  getbalance4();
}
//wEURBalance
function getbalance4() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var text = this.responseText;
      var obj = JSON.parse(text);
      //balances
      document.getElementById("wEURBalance").innerHTML = (obj.balance / 100)
        .toFixed(2)
        .toLocaleString();
      document.getElementById("percentagewEURHolder").innerHTML = (
        (obj.balance / 100000000 / 100000000) *
        100
      ).toFixed(2);
    }
  };
  xhttp.open(
    "GET",
    "https://nodes.wavesnodes.com/assets/balance/" +
      WavesAddress +
      "/Gtb1WRznfchDnTh37ezoDTJ4wcoKaRsKqKjJjy7nm2zU?t=",
    true
  );
  xhttp.send();
  getbalance5();
}
//wUSDBalance
function getbalance5() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var text = this.responseText;
      var obj = JSON.parse(text);
      //balances
      document.getElementById("wUSDBalance").innerHTML = (obj.balance / 100)
        .toFixed(2)
        .toLocaleString();
      document.getElementById("percentagewUSDHolder").innerHTML = (
        (obj.balance / 100000000 / 100000000) *
        100
      ).toFixed(2);
    }
  };
  xhttp.open(
    "GET",
    "https://nodes.wavesnodes.com/assets/balance/" +
      WavesAddress +
      "/Ft8X1v1LTa1ABafufpaCWyVj8KkaxUWE6xBhW6sNFJck?t=",
    true
  );
  xhttp.send();
  getbalance6();
}
//LTCBalance
function getbalance6() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var text = this.responseText;
      var obj = JSON.parse(text);
      //balances
      document.getElementById("LTCBalance").innerHTML = (
        obj.balance / 100000000
      )
        .toFixed(8)
        .toLocaleString();
      document.getElementById("percentageLTCHolder").innerHTML = (
        (obj.balance / 100000000 / 100000000) *
        100
      ).toFixed(2);
    }
  };
  xhttp.open(
    "GET",
    "https://nodes.wavesnodes.com/assets/balance/" +
      WavesAddress +
      "/HZk1mbfuJpmxU1Fs4AX5MWLVYtctsNcg6e2C6VKqK8zk?t=",
    true
  );
  xhttp.send();
  getbalance7();
}
//ETHBalance
function getbalance7() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var text = this.responseText;
      var obj = JSON.parse(text);
      //balances
      document.getElementById("ETHBalance").innerHTML = (
        obj.balance / 100000000
      )
        .toFixed(8)
        .toLocaleString();
      document.getElementById("percentageETHHolder").innerHTML = (
        (obj.balance / 100000000 / 100000000) *
        100
      ).toFixed(2);
    }
  };
  xhttp.open(
    "GET",
    "https://nodes.wavesnodes.com/assets/balance/" +
      WavesAddress +
      "/474jTeYx2r2Va35794tCScAXWJG9hU2HcgxzMowaZUnu?t=",
    true
  );
  xhttp.send();
}
window.onload = function height() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var text = this.responseText;
      var obj = JSON.parse(text);

      //currentheight
      document.getElementById("height").innerHTML = obj.height.toLocaleString();
      //document.getElementById("futureHeight").min = obj.height;
      currentHeight = obj.height;
    }
  };
  xhttp.open("GET", "https://nodes.wavesnodes.com/blocks/height?t=", true);
  xhttp.send();
  WavesKeeper.publicState()
    .then(state => {
      console.log(state);
      var profileName = document.getElementsByClassName("profile-name");
          for (i = 0; i < profileName.length; i++) {
            profileName[i].innerText = state.account.address;
          };
      var profilePicture = document.getElementsByClassName("profile-pic");
          for (i = 0; i < profilePicture.length; i++) {
            profilePicture[i].src = 'https://kolinplatform.com/avatar/avatar.png';
          };
      WavesAddress = state.account.address;
      document.getElementById("WavesAddress").value = WavesAddress;
      getbalance();
      console.log("you are already logged in");
    })
    .catch(error => {
      console.error(error);
      wavesKeeper();
    });
};
var WavesAddress = "3PGsboZa7nvTMcAhL8jzPtrXGjsgU8yKWeQ";
//WavesKeeeper interaction
function wavesKeeper() {
  if (typeof WavesKeeper !== "undefined") {
    console.log("WavesKeeper found");
    login();
    //login with Waveskeeper
    function login(x) {
      const authData = {
        data: "",
        name: "Kolin Locker 1.0",
        icon:
          "https://raw.githubusercontent.com/Kolinplatform/demo/master/images/Kolin-png.png"
      };
      WavesKeeper.auth(authData)
        .then(data => {
          //data – data from Waves Keeper
          //verifying signature and saving the address...
          console.log(data);
          var profileName = document.getElementsByClassName("profile-name");
          for (i = 0; i < profileName.length; i++) {
            profileName[i].innerText = data.address;
          }
          WavesAddress = data.address;
          getbalance();
          // if data.address...
          //then {
          //document.getElementById("addressRegistered").innerHTML = ", welcome back <img class='img img-small' href='" data.avatar "'></img> <strong> " + data.alias + "</strong>";
          // }
          // else{document.getElementById("addressRegistered").innerHTML = "your wallet has not been used with this dApp before, please register" }
          // })
        })
        .catch(error => {
          console.log(error) && alert(error);
        });
    }
  } else {
    console.log("WavesKeeper is not installed");
    alert("Please install WavesKeeper");
  }
}

// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
  document.getElementById("orderToSubmit").value = "You are submitting the following file: " + workToSubmitName;
  document.getElementById("orderToSubmitData").value = "Your work has " + wordCount + " words and has a cost of " + workToSubmitAmountToPay + " " + workToSubmitAssetID;
};

// When the user clicks on <span> (x), close the modal
function closeModal() {
  modal.style.display = "none";
}
span.onclick = function() {
  modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
//Signing the Script transaction
document.getElementById("futureHeight").addEventListener("change", event => {
  workToSubmitFutureBlocks = FutureHeight = document.getElementById("futureHeight").value;
  if (currentHeight+FutureHeight <= currentHeight || FutureHeight <1440) {
    alert("please choose a height higher than current height " + currentHeight);
    //Script = "please choose a height higher than current height" + currentHeight;
    document.getElementById("acceptDeployment").style.visibility = "hidden";
  } else {
    document.getElementById("acceptDeployment").style.visibility = "visible";
    
  }
});

function submitWork() {
  datajson = {
    "Name": workToSubmitName,
"Type": workToSubmitType,
"Modified": workToSubmitModified,
"Bytes": workToSubmitBytes,
"Words": workToSubmitWords,
"Characters": workToSubmitCharacters,
"Lines": workToSubmitLines,
"Hash256": workToSubmitHash256,
"Hash512": workToSubmitHash512,
}
WavesKeeper.signAndPublishTransaction({
    type: 16,
    data: {
    fee: {
      "tokens": "1000",
      "assetId": KOLIN
    },
    dApp: '3PBJG85FaSkeF7Lc49S7wj6EvmGY2mpcWZa',
    call: {
            function: 'submitTranslation',
            args: [
                      {type: "string", key: "document", value: workToSubmitName},
                      {type: "string", key: "data", value: datajson},
                      {type: "string", key: "assetID", value: workToSubmitAssetID},
                      {type: "integer", key: "futureBlocks", value: workToSubmitFutureBlocks},
                      {type: "integer", key: "wordCount" , value: workToSubmitWords},
                      {type: "integer", key: "typeOfWork", value: selectedPrice/10},
                      {type: "integer", key: "priceAssetId", value: workToSubmitAmountToPay},
                    
                    ],
      }, payment: [//{assetId: workToSubmitAssetIDChosen, tokens: workToSubmitAmountToPay}
      ],
}
})
    .then(tx => {
      console.log("Your translation work has been posted successfully");
    })
    .catch(error => {
      console.error("Something went wrong", error);
    });
}
