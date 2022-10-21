function getQuiz(fields) {
  fetch('/api/assessment')
    .then(showResponse)
    .catch(showResponse);
}

function sendAnswers(fields) {
  fetch('/api/assessment/grade', {method: 'PUT', body: JSON.stringify(fields), headers: {'Content-Type': 'application/json'}})
    .then(showResponse)
    .catch(showResponse);
}

function getScore(fields) {
  fetch('/api/assessment/score')
    .then(showResponse)
    .catch(showResponse);
}
