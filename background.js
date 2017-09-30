chrome.runtime.onMessage.addListener(function (msg, sender) {

    if (msg.from !== 'content') {
        return;
    }

    if (msg.subject !== 'showPageAction') {
        return;
    }

    chrome.pageAction.show(sender.tab.id);
});