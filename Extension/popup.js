//alert('Hello');
let isEnabled = true;


// Get Current URL.
chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    let currentUrl = tabs[0].url;
    let currentUrlDiv = document.getElementById('current-url');
    currentUrlDiv.textContent = 'Current URL: ' + currentUrl;
});

// Extension Enable Toggle
const toggleSwitch = document.getElementById('toggleSwitch');
chrome.storage.sync.get(['toggle'], function(result) {
    isEnabled = result.toggle || false;
    toggleSwitch.checked = isEnabled;
});
// Toggle Event Listener
toggleSwitch.addEventListener('change', function(event) {
  // Send toggle event to background script
  chrome.runtime.sendMessage({ toggle: event.target.checked });
  chrome.storage.sync.set({ toggle: event.target.checked });
});