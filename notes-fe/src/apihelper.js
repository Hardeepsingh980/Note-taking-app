const apiUrl = 'http://127.0.0.1:8000/api/notes/';
const headers = {
    'Content-Type': 'application/json',
    'Accept': "application/json",
}

export function getAllNotes() {
    return fetch(apiUrl).then(function (response) {
        return response.json();
    });
}

export function createNote(note) {
    return fetch(apiUrl, {
        method: 'POST',
        body: JSON.stringify(note),
        headers
    })
}

export function deleteNote(id) {
    return fetch(apiUrl + id, {
        method: 'DELETE',
    });
}

export function updateNote(id, note) {
    return fetch(apiUrl + id + '/', {
        method: 'PUT',
        body: JSON.stringify(note),
        headers
    }).catch(function (err) {
        console.log(err);
    });
}