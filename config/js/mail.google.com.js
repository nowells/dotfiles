function recursiveReplace(node) {
    var JIRA_LINK_REGEX = /(\b[A-Z]{2,5}\-\d{1,5}\b)/g;
    var nodeText = node.nodeValue;
    if (node.nodeType == 3 &&
        JIRA_LINK_REGEX.test(nodeText) &&
        node.parentNode.nodeName !== 'A') {
        var jiraLink = document.createElement('span');
        jiraLink.innerHTML = nodeText.replace(
            JIRA_LINK_REGEX,
            '<a ' +
                'href="https://services.wisertogether.com/jira/browse/$1" ' +
                'target="_blank">' +
            '$1' +
            '</a>'
            );
        node.parentNode.replaceChild(jiraLink, node);
    } else if (node.nodeType == 1) { // element
        $(node).contents().each(function() {
            recursiveReplace(this);
        });
    }
}

var mo = window.MutationObserver ||
    window.MozMutationObserver ||
    window.WebKitMutationObserver;

if (typeof mo !== 'undefined') {
    var observer = new mo(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.addedNodes !== null) {
                for (var i = 0; i < mutation.addedNodes.length; i++) {
                    var node = mutation.addedNodes[i];
                    recursiveReplace(node);
                }
            }
        });
    });
    observer.observe(document, {childList: true, subtree: true});
}
