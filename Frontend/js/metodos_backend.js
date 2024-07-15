export function get_all_games() {
    const url = "http://localhost:5000/juegos";
    return fetch(url)
        .then(async response => {
            if (!response.ok) {
                const error = await response.json()
                throw new Error(error["message"])
            }
            return response.json()
        })
        .catch(err => {
            if (!(err instanceof TypeError && err.message === 'Failed to fetch')) {
                Swal.fire({
                    title: err,
                    icon: "error",
                    confirmButtonColor: '#DC001A'
                })
            }
        })
}

export function get_by_category(categoria) {
    const url = "http://localhost:5000/juegos/categoria/" + encodeURIComponent(categoria);
    return fetch(url)
        .then(async response => {
            if (!response.ok) {
                const error = await response.json()
                throw new Error(error["message"])
            }
            return response.json()
        })
        .catch(err => {
            if (!(err instanceof TypeError && err.message === 'Failed to fetch')) {
                Swal.fire({
                    title: err,
                    icon: "error",
                    confirmButtonColor: '#DC001A'
                })
            }
        })
}


export function get_by_id_game(id_game) {
    const url = "http://localhost:5000/juegos/id/" + id_game;
    return fetch(url)
        .then(async response => {
            if (!response.ok) {
                const error = await response.json()
                throw new Error(error["message"])
            }
            return response.json()
        })
        .catch(err => {
            if (!(err instanceof TypeError && err.message === 'Failed to fetch')) {
                Swal.fire({
                    title: err,
                    icon: "error",
                    confirmButtonColor: '#DC001A'
                })
            }
        })
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
        .then(async response => {
            if (!response.ok) {
                const error = await response.json()
                throw new Error(error["message"])
            }
            return response.json()
        })
        .catch(err => {
            if (!(err instanceof TypeError && err.message === 'Failed to fetch')) {
                Swal.fire({
                    title: err,
                    icon: "error",
                    confirmButtonColor: '#DC001A'
                })
            }
        })
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
        .then(async response => {
            if (!response.ok) {
                const error = await response.json()
                throw new Error(error["message"])
            }
            return response.json()
        })
        .catch(err => {
            if (!(err instanceof TypeError && err.message === 'Failed to fetch')) {
                Swal.fire({
                    title: err,
                    icon: "error",
                    confirmButtonColor: '#DC001A'
                })
            }
        })
}


export function get_user_by_id(id) {
    const url = "http://localhost:5000/usuarios/id/" + id;
    return fetch(url)
        .then(async response => {
            if (!response.ok) {
                const error = await response.json()
                throw new Error(error["message"])
            }
            return response.json();
        })
        .catch(err => {
            if (!(err instanceof TypeError && err.message === 'Failed to fetch')) {
                Swal.fire({
                    title: err,
                    icon: "error",
                    confirmButtonColor: '#DC001A'
                })
            }
        })
}


export function post_user_sign_in(email, password, name) {
    const url = "http://localhost:5000/sign_in"
    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email, password: password, name: name })
    })
        .then(async response => {
            if (!response.ok) {
                const error = await response.json()
                throw new Error(error["message"])
            }
            return response.json()
        })
        .catch(err => {
            if (!(err instanceof TypeError && err.message === 'Failed to fetch')) {
                Swal.fire({
                    title: err,
                    icon: "error",
                    confirmButtonColor: '#DC001A'
                })
            }
        })
}


export function put_user_update(id, data) {
    const url = "http://localhost:5000/data_user/" + id
    return fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
        .then(async response => {
            if (!response.ok) {
                const error = await response.json()
                throw new Error(error["message"])
            }
            return response.json()
        })
        .catch(err => {
            if (!(err instanceof TypeError && err.message === 'Failed to fetch')) {
                Swal.fire({
                    title: err,
                    icon: "error",
                    confirmButtonColor: '#DC001A'
                })
            }
        })
}

export function del_user(id) {
    const url = `http://localhost:5000/data_user/${id}`
    return fetch(url, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .then(async response => {
            if (!response.ok) {
                const error = await response.json()
                throw new Error(error["message"])
            }
            return response.json()
        })
        .catch(err => {
            if (!(err instanceof TypeError && err.message === 'Failed to fetch')) {
                Swal.fire({
                    title: err,
                    icon: "error",
                    confirmButtonColor: '#DC001A'
                })
            }
        })
}

export function post_game_buy(user_id, game_id) {
    const url = "http://localhost:5000/game_buy"
    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'user-buy': user_id,
            'game-id': game_id
        })
    })
        .then(async response => {
            if (!response.ok) {
                const error = await response.json()
                throw new Error(error["message"])
            }
            return response.json()
        })
        .catch(err => {
            if (!(err instanceof TypeError && err.message === 'Failed to fetch')) {
                Swal.fire({
                    title: err,
                    icon: "error",
                    confirmButtonColor: '#DC001A'
                })
            }
        })
}

export function get_games_by_id_user(user_id) {
    const url = `http://localhost:5000/data_user/user_games/${user_id}`
    return fetch(url, {
        method: 'GET',
        headers: {
            'Accept': 'application/json'
        },
    })
        .then(async response => {
            if (!response.ok) {
                const error = await response.json()
                throw new Error(error["message"])
            }
            return response.json()
        })
        .catch(err => {
            if (!(err instanceof TypeError && err.message === 'Failed to fetch')) {
                Swal.fire({
                    title: err,
                    icon: "error",
                    confirmButtonColor: '#DC001A'
                })
            }
        })
}
