let paddings = {'H1': 15, 'H2': 20, 'H3': 25, 'H4': 30, 'H5': 35, 'H6': 40};

function callbackWithAnchors(anchors) {
    let htmlAnchors = document.querySelector('#anchors');

    htmlAnchors.innerHTML = "";

    for (let id in anchors) {

        let element = JSON.parse(JSON.stringify(anchors[id]));
        let text = element['text'];
        let headTag = element['headTag'];
        let linkText = document.createTextNode(text);
        let link = document.createElement('a');
        let leftPaddingSize = paddings[headTag];
        let fontWeight = headTag === 'H1' ? 'bold' : 'normal';

        link.setAttribute('style', 'padding-left:' + leftPaddingSize + 'px; font-weight: ' + fontWeight);

        link.setAttribute('class', 'list-group-item anchorable');
        link.setAttribute('id', id);
        link.addEventListener('click', visitAnchor);
        link.appendChild(linkText);

        link.title = text;
        link.href = '#';

        htmlAnchors.appendChild(link);
    }
}

function visitAnchor() {

    let id = this.id;

    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {

        chrome.tabs.sendMessage(tabs[0].id, {from: 'visitAnchor', subject: id});
    });
}


// |-------------------------------------------------------------------------------------------------------------------|
// | This extension indexes all the anchors of the load pages, in a clickable list.                                    |
// |-------------------------------------------------------------------------------------------------------------------|
document.addEventListener('DOMContentLoaded', () => {

    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {

        chrome.tabs.sendMessage(tabs[0].id, {from: 'popup', subject: 'DOM'}, callbackWithAnchors);
    });
});

