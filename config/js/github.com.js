// https://github.com/matthewrobertson/Github-Collapse-Diff
(function() {

  var butHtml = '<div class="button-group"><a href="#collapse_diff" style="margin-left: 5px" class="diff-collapse-button minibutton" rel="nofollow">Collapse</a></div>';
  var collapsedHtml = '<div class="image diff-collapsed-message" style="display: none"><a href="#" class="expand-diff-link">Diff suppressed. Click to show.</a></div>';

  var expand = function(button, content, message) {
    button.textContent = 'Collapse';
    content.style.display = ''; // Restore original display (table/block)
    if(message) { message.style.display = 'none'; }

  };

  var collapse = function(button, content, message) {
    button.textContent = 'Expand';
    content.style.display = 'none';
    if(message) { message.style.display = 'block'; }
  };

  var bindToggler = function(buttonContainer, tableToToggle, addPlaceHolder) {
    var messageDiv, button;
    if(!tableToToggle) { return; }

    buttonContainer.insertAdjacentHTML('afterbegin', butHtml);
    tableToToggle.insertAdjacentHTML('afterend', collapsedHtml);
    button = buttonContainer.querySelector('.diff-collapse-button');

    if(addPlaceHolder) {
      messageDiv = tableToToggle.parentElement.querySelector('.diff-collapsed-message');
      messageDiv.querySelector('.expand-diff-link').addEventListener('click', function(e) {
        e.preventDefault();
        expand(button, tableToToggle, messageDiv);
      }, true);
    }


    button.addEventListener('click', function(e) {
      e.preventDefault();
      if (button.textContent !== 'Collapse') {
        expand(button, tableToToggle, messageDiv);
      } else {
        collapse(button, tableToToggle, messageDiv);
      }
    }, true);
  };

  var fileContainers = document.querySelectorAll('#files .file');
  for (var i = 0; i < fileContainers.length; ++i) {
    bindToggler(fileContainers[i].querySelector('.meta .actions'),
      fileContainers[i].querySelector('table.file-diff, .diff-table'), true);
  }

  var discussions = document.querySelectorAll('.mini-discussion-bubble-action');
  for (var i = 0; i < discussions.length; ++i) {
    var buttonContainer = discussions[i].appendChild(document.createElement('div'));
    buttonContainer.style.cssText = 'float:right';
    bindToggler(buttonContainer, discussions[i].nextElementSibling, false);
  }

})();
