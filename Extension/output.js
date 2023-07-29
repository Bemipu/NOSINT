// chrome.runtime.sendMessage( {action:"test" , test:"TEST" });

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    //alert(message.action);
    if(message.action === "changeiframe"){
        let mainiframe = document.getElementById('mainiframe');
        mainiframe.src = 'http://140.130.34.120:10250/html/' + message.data;
        //alert(message.data);
    }
});


function scroll() {
  document.getElementById("confirmJohn").style.display = "block";

  const anchorElement = document.getElementById("myAnchor");
  if (anchorElement) {
    anchorElement.scrollIntoView({ behavior: "smooth" });
  }

  document.getElementById("oldOptions").style.display = "None";
}

async function acceptButtonClick() {
  await chrome.runtime.sendMessage( {action:"choice" , answer:"yes" });
  window.close()
}

async function rejectButtonClick() {
  await chrome.runtime.sendMessage( {action:"choice" , answer:"no" });
  window.close()
}

// Add event listeners to the buttons
document.getElementById("acceptButton").addEventListener("click", scroll);
document.getElementById("bottomAcceptButton").addEventListener("click", acceptButtonClick);
document.getElementById("rejectButton").addEventListener("click", rejectButtonClick);
document.getElementById("bottomRejectButton").addEventListener("click", rejectButtonClick);