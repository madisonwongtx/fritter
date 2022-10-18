function getInteractions(fields) {
  fetch('/api/interactions')
    .then(showResponse)
    .catch(showResponse);
}

function createInteraction(fields) {
  fetch('/api/interactions', {method: 'POST', body: JSON.stringify(fields), headers: {'Content-Type': 'application/json'}})
    .then(showResponse)
    .catch(showResponse);
}

function changeInteraction(fields) {
  fetch('/api/interactions', {method: 'PUT', body: JSON.stringify(fields), headers: {'Content-Type': 'application/json'}})
    .then(showResponse)
    .catch(showResponse);
}

function deleteInteraction(fields) {
  fetch('/api/interactions', {method: 'DELETE', body: JSON.stringify(fields), headers: {'Content-Type': 'application/json'}})
    .then(showResponse)
    .catch(showResponse);
}
