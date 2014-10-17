$waxpost.query(function ($) {
    var title = $('div.dev-title-container h1 a').get(0).innerText;
    var tags = $.map($('a.discoverytag').get(),
                     function (x) { return x.getAttribute('data-canonical-tag'); });
    var description = $('div.dev-description').get(0).innerText;
    var imageURL = $('img.dev-content-full').attr('src');
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
