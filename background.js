localStorage['waxpost-wzlroot'] = localStorage['waxpost-wzlroot'] || 'https://www.weasyl.com/';

var tabScripts = {};
var tabScriptRegexps = [
    [/^https?:\/\/(?:[^.]+\.)?furaffinity.net\/view\//, 'furaffinity.js'],
    [/^https?:\/\/inkbunny.net\/submissionview.php/, 'inkbunny.js'],
];

chrome.tabs.onUpdated.addListener(function (tabID, changeInfo, tab) {
    if (changeInfo.status != 'loading') return;
    console.log(changeInfo);
    var foundNoMatch = tabScriptRegexps.every(function (entry) {
        console.log([entry, tab.url, entry[0].test(tab.url)]);
        if (entry[0].test(tab.url)) {
            tabScripts[tabID] = entry[1];
            return false;
        }
        return true;
    });
    console.log(tabScripts);
    if (!foundNoMatch)
        chrome.pageAction.show(tabID);
});

chrome.pageAction.onClicked.addListener(function (tab) {
    chrome.tabs.executeScript(tab.id, {file: tabScripts[tab.id]});
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.method == 'getSettings')
        sendResponse({settings: localStorage});
    else
        sendResponse({});
});
