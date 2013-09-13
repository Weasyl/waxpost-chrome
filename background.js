localStorage['waxpost-wzlroot'] = localStorage['waxpost-wzlroot'] || 'https://www.weasyl.com/';

chrome.tabs.onUpdated.addListener(function (tabID, changeInfo, tab) {
    if (!localStorage['waxpost-apikey']) return;
    if (tab.url.indexOf("https://www.furaffinity.net/view/") == 0) {
        console.log('show');
        chrome.pageAction.show(tabID);
    }
});

chrome.pageAction.onClicked.addListener(function (tab) {
    console.log('hi');
    chrome.tabs.executeScript(tab.id, {file: "furaffinity.js"});
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    console.log([request, sender, sendResponse]);
    if (request.method == 'getSettings')
        sendResponse({settings: localStorage});
    else
        sendResponse({});
});
