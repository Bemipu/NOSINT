//alert('Hello');

var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  });
}

var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.maxHeight){
      content.style.maxHeight = null;
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
    }
  });
}
// ------------------------------------------------------------------------------------
// Get Current URL.
chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    let currentUrl = tabs[0].url;
    let currentUrlDiv = document.getElementById('current-url');
    currentUrlDiv.textContent = 'Current URL: ' + currentUrl;
});


// Extension Enable Toggle
const toggleSwitch = document.getElementById('toggleSwitch');
chrome.storage.sync.get(['toggle'], function(result) {
    if(result.toggle !== true && result.toggle !== false){
        chrome.storage.sync.set({ toggle: true });
    }
    toggleSwitch.checked = result.toggle
});


// Toggle Event Listener
toggleSwitch.addEventListener('change', function(event) {
  // Send toggle event to background script
  chrome.runtime.sendMessage({ action: "toggle", toggle: event.target.checked });
  chrome.storage.sync.set({ toggle: event.target.checked });
});

