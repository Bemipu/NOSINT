let isEnabled;
let backendIP = "http://127.0.0.1:5000"
// let backendIP = "http://140.130.34.120:10250/";

chrome.storage.sync.get(['toggle'], function(result) {
  isEnabled = result.toggle;
});

let originTab;




// Message Listener (Message from popup.js)
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  
  

  // Update toggle status
  if(message.action === "toggle"){
    isEnabled = message.toggle;
    // Send toggle status to script.js
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      const activeTab = tabs[0];
      chrome.tabs.sendMessage(activeTab.id, { action: "toggle", toggle: isEnabled });
    });
  }

  // SendRequestToBackend
  if (message.action === "sendRequestToBackend") {
    // 在這裡進行實際的 HTTP 請求，例如使用 fetch 或 XMLHttpRequest
    
    // fetch(`${backendIP}/testAPI?url=${message.url}`)
    //   .then(response => {
    //     if (!response.ok){
    //       throw new Error("Can't connect to backend server");
    //     }
    //     return response.text();
    //   })
    //   .then(data => {
    //     // 回傳結果給 Content Script
    //     sendResponse(data);
    //   })
    //   .catch(error => {
    //     // 處理錯誤並回傳給 Content Script
    //     sendResponse(error.message);
    //   });
    
    // postData = {"url": message.url};
    // fetch(`${backendIP}/url`, {method: "POST", headers: {
    //   "Content-Type": "application/json",
    //   // 'Content-Type': 'application/x-www-form-urlencoded',
    // }, body: JSON.stringify(postData)})

    const formData = new URLSearchParams();
    formData.append('url', message.url);

    fetch(`${backendIP}/url`, {method: "POST", body: formData})
      .then(response => response.text()) //response.json()
      .then(sendResponse)
      .catch(function (err) { sendResponse(err.message); });

    // 因為 fetch 是非同步的，所以這裡需要返回 true 來告訴 Chrome Extension 等待 sendResponse 的調用
    return true;
  }



  if(message.action === "createWindow"){
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      originTab = tabs[0];
    });

    chrome.windows.create({
      url: chrome.runtime.getURL("output.html"),
      type: "popup",
      height: 500,
      width: 670
    });
  }

  // if(message.action === "test"){
  //   chrome.tabs.sendMessage(originTab.id, {action:"test" , test:"TEST" });
  // }
});
