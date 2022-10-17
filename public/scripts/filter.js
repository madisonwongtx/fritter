function userStatus(fields) {
  fetch('/api/filter')
    .then(showResponse)
    .catch(showResponse);
}

function switchUserFilter(fields) {
  fetch('/api/filter', {method: 'PUT'})
    .then(showResponse)
    .catch(showResponse);
}
