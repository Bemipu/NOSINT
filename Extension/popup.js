alert('Hello');

chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    var currentUrl = tabs[0].url;
    var currentUrlDiv = document.getElementById('current-url');
    currentUrlDiv.textContent = 'Current URL: ' + currentUrl;
});