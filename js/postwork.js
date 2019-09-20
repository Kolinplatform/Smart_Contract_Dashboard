//select card
var userSelectionOld = "";
var wordCount = "";
function usdKOLIN(){
var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    var text = this.responseText;
    var obj = JSON.parse(text);
    usdKOLIN = obj.market_data.current_price.usd;
  };
};
xhttp.open("GET", "https://api.coingecko.com/api/v3/coins/kolin?t=", true);
xhttp.send();
};
function usdEUR(){
  var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    var text = this.responseText;
    var obj = JSON.parse(text);
    usdEUR = obj.rates.USD;
  };
};
xhttp.open("GET", "https://api.exchangeratesapi.io/latest?symbols=USD&t=", true);
xhttp.send();
};
function usdWAVES(){
  var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    var text = this.responseText;
    var obj = JSON.parse(text);
    usdWAVES = obj.market_data.current_price.usd;
  };
};
xhttp.open("GET", "https://api.coingecko.com/api/v3/coins/waves?t=", true);
xhttp.send();
};
function usdLTC(){
  var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    var text = this.responseText;
    var obj = JSON.parse(text);
    usdLTC = obj.market_data.current_price.usd;
  };
};
xhttp.open("GET", "https://api.coingecko.com/api/v3/coins/litecoin?t=", true);
xhttp.send();
};
function usdBTC(){
  var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    var text = this.responseText;
    var obj = JSON.parse(text);
    usdBTC = obj.market_data.current_price.usd;
  };
};
xhttp.open("GET", "https://api.coingecko.com/api/v3/coins/bitcoin?t=", true);
xhttp.send();
};
function usdETH(){
  var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    var text = this.responseText;
    var obj = JSON.parse(text);
    usdETH = obj.market_data.current_price.usd;
  };
};
xhttp.open("GET", "https://api.coingecko.com/api/v3/coins/ethereum?t=", true);
xhttp.send();
};


window.addEventListener("load", function() {
  userSelectionOld = document.getElementById("selectcard").innerHTML;
  console.log(userSelectionOld);
  usdBTC();
  usdETH();
  usdLTC();
  usdKOLIN();
  usdWAVES();
  usdEUR();
});
let selectedPrice = "you have not selected a price";
let userSelection = document.getElementsByClassName("priceButton");
var itemsList = [
  { key: "0", value: "generalTranslation" },
  { key: "1", value: "professionalTranslation" },
  { key: "2", value: "advancedTranslation" },
  { key: "3", value: "certifiedTranslation" }
];
for (let i = 0; i < userSelection.length; i++) {
  selectedPrice = userSelection[i];
  userSelection[i].addEventListener("click", function() {
    console.log("Clicked index: " + i);
    document.getElementById("fileUpload").style.display ="inline";
    document.getElementById("fileUpload").scrollIntoView();
    selectedPrice = i.valueOf()});
    //userSelectionChange = delete userSelection[i];
    if (userSelection[i] !== selectedPrice){
    document.getElementsByClassName("quoteCard")[i].style.display = "none";
    };
    //document.getElementById("selectcard").appendChild(
      //"<div class='col-lg-12 my-12'>You have selected the service <strong> No." +
      //selectedPrice +
      //" </strong> <button class='btn-bold btn-primary' onclick='changeOption()'>Change</button></div>"
 // );
}
let userSelectionChange ="";
function changeOption() {
  document.getElementById("selectcard").innerHTML = userSelectionOld;
  selectedPrice = "you have not selected a price";
  userSelection = document.getElementsByClassName("pricecard");
  for (let i = 0; i < userSelection.length; i++) {
    userSelection[i].addEventListener("click", function(){
      console.log("Clicked index: " + i);
      selectedPrice = i;
      if (selectedPrice > -1) {
        userSelection.splice(selectedPrice);
        document.getElementsByClassName("quoteCard").userSelection[i].style.visibility = "hidden";
      };
      
      //document.getElementsByClassName("selectcard").innerHTML ="<div class='col-lg-12 my-12'>You have selected the service <strong> No." +
      // selectedPrice +
      // " </strong> " +
      //  "   " +
      // "<button class='btn-bold btn-primary' onclick='changeOption()'>Change</button></div>";
    });
  }
}


// Check for the various File API support.
if (window.File && window.FileReader && window.FileList && window.Blob) {
  console.log("Great success! All the File APIs are supported.");
} else {
  alert("The File APIs are not fully supported in this browser.");
}
// Setup the dropzone listeners.
var dropZone = document.getElementById("drop_zone");
dropZone.addEventListener("dragover", handleDragOver, false);
dropZone.addEventListener("drop", wc, false);
dropZone.addEventListener("click", wc, false);
function handleDragOver(evt) {
  evt.stopPropagation();
  evt.preventDefault();
  evt.dataTransfer.dropEffect = "copy"; // Explicitly show this is a copy.
}

function wc(i) {
  document.getElementById("quotePrices").style.display = "inline";
  document.getElementById("quotePrices").scrollIntoView();
  WordCount.bytes("drop_zone" || "input", function(size) {
    document.getElementById("fileBytes").innerText = size;
  });

  WordCount.words("drop_zone" || "input", function(words) {
    document.getElementById("fileWords").innerText = words;
    wordCount = words;
    document.getElementById("quoteWORDS").innerText = ": " + wordCount.toLocaleString("en") + " words";
    document.getElementById("quotewUSD").innerText = ": " + ((wordCount*((parseInt(selectedPrice)+1)/10)).toFixed(2)).toLocaleString("en") + " USD";
    document.getElementById("quotewEUR").innerText = ": " + ((wordCount*((parseInt(selectedPrice)+1)/10)/usdEUR).toFixed(2)).toLocaleString("en") + " EUR";
    document.getElementById("quoteKOLIN").innerText = ": " + ((wordCount*((parseInt(selectedPrice)+1)/10)/usdKOLIN).toFixed(2)).toLocaleString("en") + " KOLIN";
    document.getElementById("quoteWAVES").innerText = ": " + ((wordCount*((parseInt(selectedPrice)+1)/10)/usdWAVES).toFixed(2)).toLocaleString("en") + " WAVES";
    document.getElementById("quoteBTC").innerText = ": " + (wordCount*((parseInt(selectedPrice)+1)/10)/usdBTC).toLocaleString("en") + " BTC";
    document.getElementById("quoteETH").innerText = ": " + ((wordCount*((parseInt(selectedPrice)+1)/10)/usdETH).toFixed(2)).toLocaleString("en") + " ETH";
    document.getElementById("quoteLTC").innerText = ": " + ((wordCount*((parseInt(selectedPrice)+1)/10)/usdLTC).toFixed(2)).toLocaleString("en") + " LTC";
  });

  WordCount.lines("drop_zone" || "input", function(lines) {
    document.getElementById("fileLines").innerText = lines;
  });

  //WordCount.longest("drop_zone" || "input", function(longest) {
  //  document.getElementById("fileLongest").innerText = longest;
  //});

  WordCount.chars("drop_zone" || "input", function(chars) {
    document.getElementById("fileChars").innerText = chars;
  });
  //handling files

  var files = i.files;
  for (var i = 0; i < files.length; i++) {
    document.getElementById("fileName").innerText = files[i].name;
    document.getElementById("fileType").innerText = files[i].type || "n/a";
    document.getElementById("fileModified").innerText =
    new Date(files[i].lastModified) || "n/a";
    document.getElementById("file256Hash").innerText = CryptoJS.SHA256(files[i].name);
    document.getElementById("file512Hash").innerText = CryptoJS.SHA512(files[i].name);
   
    }
    
  }


/*
//handling files
function handleFileSelect(evt) {
    evt.stopPropagation();
    evt.preventDefault();

    var files = evt.dataTransfer.files; // FileList object.
    // files is a FileList of File objects. List some properties.
    var output = [];
    for (var i = 0, f; f = files[i]; i++) {
      output.push('<li><strong>', escape(f.name), '</strong> (', f.type || 'n/a', ') - ',
                  f.size, ' bytes, last modified: ',
                  f.lastModifiedDate ? f.lastModifiedDate.toLocaleDateString() : 'n/a',
                 '</li>');
    }
    document.getElementById('list').innerHTML = '<ul>' + output.join('') + '</ul>';
  }
/*


  

  //Read and slice
/*
  function readBlob(opt_startByte, opt_stopByte) {

    var files = document.getElementById('files').files;
    if (!files.length) {
      alert('Please select a file!');
      return;
    }

    var file = files[0];
    var start = parseInt(opt_startByte) || 0;
    var stop = parseInt(opt_stopByte) || file.size - 1;

    var reader = new FileReader();

    // If we use onloadend, we need to check the readyState.
    reader.onloadend = function(evt) {
      if (evt.target.readyState == FileReader.DONE) { // DONE == 2
        document.getElementById('byte_content').textContent = evt.target.result;
        document.getElementById('byte_range').textContent = 
            ['Read bytes: ', start + 1, ' - ', stop + 1,
             ' of ', file.size, ' byte file'].join('');
      }
    };

    var blob = file.slice(start, stop + 1);
    reader.readAsText(blob, "UTF-8");
  }
  
  document.querySelector('.readBytesButtons').addEventListener('click', function(evt) {
    if (evt.target.tagName.toLowerCase() == 'button') {
      var startByte = evt.target.getAttribute('data-startbyte');
      var endByte = evt.target.getAttribute('data-endbyte');
      readBlob(startByte, endByte);
    }
  }, false);

  */
