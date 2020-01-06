const fetch = require('node-fetch');

function CreateBody(title, content) {
    return {title, content, timestamp: new Date().getTime()}
}

function insert() {

    fetch('http://localhost:8000/notes', {
        method: 'POST',
        headers: {
            // 'Content-Type': 'application/x-www-form-urlencoded'
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(CreateBody('sms', 'from: 222, text: laiwanya.'))
    })
    .then(res => res.text())
    .then(console.log)
    .catch(console.log)

}
function clear() {

    fetch('http://localhost:8000/notes/clear', {
        method: 'DELETE',
        headers: {
            // 'Content-Type': 'application/x-www-form-urlencoded'
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({pwd: 'hth123456'})
    })
    .then(res => res.text())
    .then(console.log)
    .catch(console.log)

}

insert()
// clear()