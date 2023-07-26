let isFeatureEnabled = true;
let backendIP = "http://127.0.0.1:5000";

// Message Listener (Message from popup.js)
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  
  // Update toggle status
  if(message.action === "toggle"){
    isFeatureEnabled = message.toggle;
    // Send toggle status to script.js
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      const activeTab = tabs[0];
      chrome.tabs.sendMessage(activeTab.id, { toggle: isFeatureEnabled });
    });
  }

  // SendRequestToBackend
  if (message.action === "sendRequestToBackend") {
    // 在這裡進行實際的 HTTP 請求，例如使用 fetch 或 XMLHttpRequest
    
    fetch(backendIP + '/testAPI?url=' + message.url)
      .then(response => {
        if (!response.ok){
          throw new Error("Can't connect to backend server");
        }
        return response.text();
      })
      .then(data => {
        // 回傳結果給 Content Script
        sendResponse(data);
      })
      .catch(error => {
        // 處理錯誤並回傳給 Content Script
        sendResponse(error.message);
      });

    // 因為 fetch 是非同步的，所以這裡需要返回 true 來告訴 Chrome Extension 等待 sendResponse 的調用
    return true;
  }
});
