localStorage['waxpost-wzlroot'] = localStorage['waxpost-wzlroot'] || 'https://www.weasyl.com/';

chrome.tabs.onUpdated.addListener(function (tabID, changeInfo, tab) {
    if (!localStorage['waxpost-apikey']) return;
    if (tab.url.indexOf("https://www.furaffinity.net/view/") == 0) {
        chrome.pageAction.show(tabID);
    }
});

chrome.pageAction.onClicked.addListener(function (tab) {
    chrome.tabs.executeScript(tab.id, {file: "furaffinity.js"});
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.method == 'getSettings')
        sendResponse({settings: localStorage});
    else
        sendResponse({});
});
