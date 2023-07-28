// chrome.runtime.sendMessage( {action:"test" , test:"TEST" });


// chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
//     alert(message.action);
//     if(message.action === "mainOutput"){
//         let mainOutput = document.getElementById('mainOutput');
//         mainOutput.textContent = message.text;
//         alert(message.text);
//     }
// });