const fetch = require('node-fetch');

function CreateBody(title, content) {
    return {title, content}
}

fetch('http://localhost:8000/notes', {
    method: 'POST',
    headers: {
        // 'Content-Type': 'application/x-www-form-urlencoded'
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(CreateBody('sms', 'from: 111, text: laiwanya.'))
})
.then(res => res.text())
.then(console.log)
.catch(console.log)