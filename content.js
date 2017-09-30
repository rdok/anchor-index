chrome.runtime.sendMessage({
    from: 'content',
    subject: 'showPageAction'
});

let getAnchors = function () {

    let anchors = {};

    let headerElements = document.querySelectorAll('h1,h2,h3,h4,h5,h6');

    headerElements.forEach(function (header) {

        if (header.id) {
            anchors[header.id] = {'text': header.textContent, 'headTag': header.tagName};

            return;
        }

        for (let index = 0; index < header.children.length; index++) {

            let child = header.children[index];

            if (!child.id) {

                continue;
            }

            anchors[child.id] = {'text': child.textContent, 'headTag': header.tagName};
        }
    });

    return anchors;
};

chrome.runtime.onMessage.addListener(function (msg, sender, callbackResponse) {

    if (msg.from === 'popup' && msg.subject === 'DOM') {

        callbackResponse(getAnchors());
    }

    if (msg.from === 'visitAnchor') {

        document
            .getElementById(msg.subject)
            .scrollIntoView({behavior: "smooth", block: "start", inline: "start"});
    }
});