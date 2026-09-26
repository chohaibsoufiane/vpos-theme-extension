chrome.action.onClicked.addListener((tab) => {
    // Tell the browser to reload the page
    chrome.tabs.reload(tab.id);
    
    // Immediately reload the extension itself to pick up new files
    setTimeout(() => {
        chrome.runtime.reload();
    }, 50);
});
