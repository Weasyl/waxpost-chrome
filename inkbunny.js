$waxpost.query(function ($) {
    var titlePos = $('div.welcomeanon_userdetails').length ? 2 : 1; //check user login state
    var title = $('div.content td:nth-child(2) div', $('div.elephant').get(titlePos)).get(0).innerText;
    var tags = $('div div:nth-child(1) a span', $('#kw_scroll').next());
    var tags = $.map(tags.get(),
                     function (x) { return x.innerText.replace(/ /g, '_'); });
    var description = $('div.elephant_bottom.elephant_white div.content div').get(0).innerText;
    var image = $('div.widget_imageFromSubmission img').eq(0);
    var imageLink = image.parent('a');
    var imageURL = imageLink.length ? imageLink.attr('href') : image.attr('src');
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
