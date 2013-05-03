function AddJiraLinks(node) {
    var JIRA_LINK_REGEX = /(\b[A-Z]{2,5}\-\d{1,5}\b)/g;
    var nodeText = node.nodeValue;
    var caretPosition = GetCaretPosition();
    if (node.nodeType == 3 &&
        JIRA_LINK_REGEX.test(nodeText) &&
        node.parentNode !== null &&
        node.parentNode.nodeName !== 'A' &&
        node.parentNode.className !== 'JIRALINK' &&
        (node !== caretPosition && node.parentNode !== caretPosition)
    ) {
        var jiraLink = document.createElement('span');
        jiraLink.className = 'JIRALINK';
        var text = nodeText;

        var matches = $.unique(nodeText.match(JIRA_LINK_REGEX));
        var matched = 0;

        for (var i = 0; i < matches.length; i++) {
            var match = matches[i];

            var updateLink = function(match) {
                return function(data, status) {
                    var issueKey = match,
                    issueSummary = '',
                    issueAssignee = '';

                    matched += 1;

                    if (status === 'success') {
                        issueSummary = ' - ' + data.fields.summary;
                        if (data.fields.assignee) {
                            issueAssignee = ' (' + data.fields.assignee.displayName + ')'
                        }
                    }

                    text = text.replace(
                        match,
                        '<a ' +
                            'href="https://services.wisertogether.com/jira/browse/' + match + '"' +
                        'target="_blank">' + match + '</a>' + issueSummary + issueAssignee
                    );

                    if (matched === matches.length) {
                        jiraLink.innerHTML = text;
                        node.parentNode.replaceChild(jiraLink, node);
                    }
                    else {
                        console.log(matched + ' : ' + matches.length);
                    }
                };
            };

            $.ajax({
                url: 'https://services.wisertogether.com/jira/rest/api/2/issue/' +
                    match + '.json?fields=summary,assignee',
                error: updateLink(match),
                success: updateLink(match)
            });
        }
    } else if (node.nodeType == 1) { // element
        $(node).contents().each(function() {
            AddJiraLinks(this);
        });
    }
}

function GetCaretPosition() {
    var node = document.getSelection().anchorNode;
    if (node === null) {
        return;
    }
    var startNode = (node.nodeType == 3 ? node.parentNode : node);
    return startNode;
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
                    AddJiraLinks(node);
                }
            }
        });
    });
    observer.observe(document, {childList: true, subtree: true});
}

$('body').on('blur keyup paste', '[contenteditable]', function() {
    AddJiraLinks(this);
});
