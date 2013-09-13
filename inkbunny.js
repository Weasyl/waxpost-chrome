$(function ($) {
    var title = $('div.content td:nth-child(2) div', $('div.elephant').get(2)).get(0).innerText;
    var tags = $('div div:nth-child(1) a span', $('#kw_scroll').next());
    var tags = $.map(tags.get(),
                     function (x) { return x.innerText.replace(/ /g, '_'); });
    var description = $('div.elephant_bottom.elephant_white div.content div').get(0).innerText;
    var image = $('div.widget_imageFromSubmission img').eq(0);
    var imageLink = image.parent('a');
    var imageURL;
    if (imageLink.length)
        imageURL = imageLink.attr('href');
    else
        imageURL = image.attr('src');
    chrome.runtime.sendMessage({method: 'getSettings'}, function (response) {
        document.location = response.settings['waxpost-wzlroot'] + 'submit/visual?' + $.param({
            title: title,
            tags: tags,
            description: description,
            baseURL: document.location,
            imageURL: imageURL,
        }, true);
    });
});
