localStorage['waxpost-wzlroot'] = localStorage['waxpost-wzlroot'] || 'https://www.weasyl.com/';

var tabScripts = {};
var tabScriptRegexps = [
    [/^https?:\/\/(?:[^.]+\.)?deviantart\.com\/art\//, 'deviantart.js'],
    [/^https?:\/\/www\.sofurry\.com\/view\//, 'sofurry.js'],
    [/^https?:\/\/(?:[^.]+\.)?furaffinity\.net\/view\//, 'furaffinity.js'],
    [/^https?:\/\/inkbunny\.net\/submissionview\.php/, 'inkbunny.js'],
    [/^https?:\/\/i\.imgur\.com\//, 'imgur.js'],
];

chrome.tabs.onUpdated.addListener(function (tabID, changeInfo, tab) {
    if (changeInfo.status != 'loading') return;
    var foundNoMatch = tabScriptRegexps.every(function (entry) {
        if (entry[0].test(tab.url)) {
            tabScripts[tabID] = entry[1];
            return false;
        }
        return true;
    });
    if (!foundNoMatch) {
        chrome.tabs.executeScript(tabID, {file: 'prepare.js'});
    }
});

chrome.tabs.onRemoved.addListener(function (tabID, removeInfo) {
    delete tabScripts[tabID];
});

chrome.pageAction.onClicked.addListener(function (tab) {
    chrome.tabs.executeScript(tab.id, {file: tabScripts[tab.id]});
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.method == 'getSettings')
        sendResponse({settings: localStorage});
    else if (request.method == 'openTab') {
        request.properties.windowId = sender.tab.windowId;
        request.properties.openerTabId = sender.tab.id;
        request.properties.index = sender.tab.index + 1;
        chrome.tabs.create(request.properties);
    } else if (request.method == 'showButton') {
        chrome.pageAction.show(sender.tab.id);
    } else
        sendResponse({});
});
