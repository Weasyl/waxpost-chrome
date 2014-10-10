$waxpost.query(function ($) {
    var title = $('#sfContentTitle').get(0).innerText;
    var tagContainers = $('#submission_tags div.section-content');
    var tags = $.map($('a', tagContainers.get(0)).get(),
                     function (x) { return x.innerText.replace(/ /g, '_'); });
    var description = $('#sfContentDescription').get(0).innerText;
    var imageURL = $('#sfContentImage a').attr('href');
    chrome.runtime.sendMessage({method: 'getSettings'}, function (response) {
        var url = response.settings['waxpost-wzlroot'] + 'submit/visual?' + $.param({
            title: title,
            tags: tags,
            description: description,
            baseURL: document.location,
            imageURL: imageURL,
        }, true);
        chrome.runtime.sendMessage({method: 'openTab', properties: {url: url}});
    });
});
