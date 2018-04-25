function restoreOptions() {
    chrome.storage.sync.get({
        api_key: '',
    }, function (items) {
        document.getElementById('api_key').value = items.api_key;
    });
}

function saveOptions() {
    chrome.storage.sync.set({
        api_key: document.getElementById('api_key').value,
    }, function () {
        var alert = document.getElementById('alert');
        alert.style.display = 'block';
        setTimeout(function () {
            alert.style.display = 'none';
        }, 3000);
    });
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('save').addEventListener('click', saveOptions);