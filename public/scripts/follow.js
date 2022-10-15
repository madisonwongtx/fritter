/**
 * Fields is an object mapping the names of the form inputs to the values typed in
 */

function followUser(fields) {
  fetch('/api/follow', {method: 'POST', body: JSON.stringify(fields), headers: {'Content-Type': 'application/json'}})
    .then(showResponse)
    .catch(showResponse);
}

function unfollowUser(fields) {
  fetch('/api/follow', {method: 'DELETE', body: JSON.stringify(fields), headers: {'Content-Type': 'application/json'}})
    .then(showResponse)
    .catch(showResponse);
}

function allFollowing(fields) {
  fetch('/api/follow')
    .then(showResponse)
    .catch(showResponse);
}

function allFollowers(fields) {
  fetch('/api/follow/followers')
    .then(showResponse)
    .catch(showResponse);
}
