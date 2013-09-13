var allSettings = ['wzlroot'];

document.addEventListener('DOMContentLoaded', function () {
    allSettings.forEach(function (setting) {
        var value = localStorage['waxpost-' + setting];
        if (value)
            document.getElementById(setting).value = value;
    });
});

document.querySelector('#save-button').addEventListener('click', function () {
    allSettings.forEach(function (setting) {
        localStorage['waxpost-' + setting] = document.getElementById(setting).value;
    });
});
