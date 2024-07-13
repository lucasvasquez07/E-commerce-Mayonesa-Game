
export function get_all_games() {
    const url = "http://localhost:5000/juegos";
    return fetch(url)
        .then(response => response.json())
        .catch(err => console.log(err))
}

export function get_by_category(categoria) {
    const url = "http://localhost:5000/juegos/categoria/" + categoria;
    return fetch(url)
        .then(response => response.json())
        .catch(err => console.log(err))
}

export function get_by_id_game(id_game) {
    const url = "http://localhost:5000/juegos/id/" + id_game;
    return fetch(url)
        .then(response => response.json())
        .catch(err => console.log(err))
}

export function get_by_search(name) {
    const url = "http://localhost:5000/juegos/search";
    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: name })
    })
    .then(response => response.json())
    .catch(err => console.log(err));
}

export function get_by_email(email, password) {
    const url = "http://localhost:5000/usuario/log_in";
    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email, password: password })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    })
    .catch(err => console.log('Fetch error: ', err));
}


export function get_user_by_id(id) {
    const url = "http://localhost:5000/usuarios/id/" + id;
    return fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .catch(err => console.log('Fetch error: ', err));
}

 
export function post_user_sign_in(email, password, name) {
    const url = "http://localhost:5000/sign_in";
    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email, password: password, name: name })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    })
    .catch(err => console.log('Fetch error: ', err));
}


export function put_user_update(id, data) {
    const url = "http://localhost:5000/data_user/" + id;
    return fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .catch(err => console.log(err));
}
