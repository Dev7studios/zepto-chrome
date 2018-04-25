function postData(url, data) {
    return fetch(url, {
            body: JSON.stringify(data),
            headers: {
                'accept': 'application/json',
                'content-type': 'application/json',
                'user-agent': 'Zepto Chrome Extension',
            },
            method: 'POST',
            mode: 'cors',
        })
        .then(response => response.json());
}

function init() {
    const longurl = document.getElementById('longurl');
    const shortlink = document.getElementById('shortlink');
    shortlink.innerHTML = 'Shortening...';

    chrome.tabs.query({ 'active': true, 'lastFocusedWindow': true }, function (tabs) {
        if (!tabs.length) {
            return;
        }

        var url = tabs[0].url;
        longurl.value = url;
        longurl.blur();

        chrome.storage.sync.get({
            api_key: '',
        }, function (items) {
            if (!items.api_key) {
                shortlink.innerHTML = 'Error: Zepto API Key required (see options)';
                return;
            }

            postData('https://zepl.ink/api/links?api_token=' + items.api_key, { url: url })
                .then(function (data) {
                    shortlink.innerHTML = data.data.shorturl;
                    shortlink.focus();
                    window.getSelection().selectAllChildren(shortlink);
                })
                .catch(function (error) {
                    shortlink.innerHTML = 'Error';
                    console.error(error);
                });
        });
    });
}

document.addEventListener('DOMContentLoaded', init);