$waxpost.query(function ($) {
    var title = $('table.maintable table.maintable td.cat b').get(0).innerText;
    var tags = $.map($('#keywords a').get(),
                     function (x) { return x.innerText.replace(/ /g, '_'); });
    var description = $('table.maintable td.alt1[width="70%"]').text();
    var imageURL = $('a:contains("Download")').attr('href');
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
