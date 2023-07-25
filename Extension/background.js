let isFeatureEnabled = true;

// Message Listener (Message from popup.js)
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  // Update toggle status
  isFeatureEnabled = request.toggle;
  // Send toggle status to script.js
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    const activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, { toggle: isFeatureEnabled });
  });
});
