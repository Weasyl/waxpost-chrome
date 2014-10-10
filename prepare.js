$waxpost.query(function () {
    chrome.runtime.sendMessage({method: 'showButton'});
});
