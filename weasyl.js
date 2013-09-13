console.log('?');
$(function ($) {
    console.log('??');
    var managementBox = $('#detail-manage');
    if (managementBox.length == 0)
        return;
    console.log('???');
    var xpostIB = $('<a>').text('Crosspost to Inkbunny').click(function () {
        var submission = $('a:contains("Download")').attr('href');
        var d = $.ajax({url: submission, dataType: 'blob'});
        d.done(function (data) {
            chrome.runtime.sendMessage({method: 'xpost', file: data});
            var input = $('<input type="hidden">').appendTo(managementBox);
            input.val(data);
            //document.location = 'https://inkbunny.net/filesedit.php?sales=no&wizardmode=yes';
        });
        return false;
    });
    xpostIB.attr('href', '#');
    $('<p>').append(xpostIB).appendTo(managementBox);
});
