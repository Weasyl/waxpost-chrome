$waxpost.query(function ($) {
    var title, tags, description, imageURL;
    if (document.getElementById('submission-details') == null) {
        //using classic theme
        title = $('table.maintable table.maintable td.cat b');
        title = title.get(title.length-1).innerText;
        tags = $.map($('#keywords a').get(),
                     function (x) { return x.innerText.replace(/ /g, '_'); });
        description = $('table.maintable td.alt1[width="70%"]').text();
    } else {
        //using beta theme
        title = $('#submission-details div.desc-col span.fontsize20 b').get(0).innerText;
        description = $('#submission-details div.desc').text();
        tags = Array.prototype.map.call(document.getElementsByClassName('tags'), 
            function(tag) {
                return tag.getElementsByTagName('a')[0].innerText;
            });
    }
    imageURL = $('a:contains("Download")').attr('href');
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
