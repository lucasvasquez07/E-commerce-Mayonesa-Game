
export function get_all_games() {
    const url = "../juegos.json";
    return fetch(url)
        .then(response => response.json().then(data => data))
        .catch(err => console.log(err))
}

export function get_by_category(categoria) {
    const url = "../juegos.json?categoria=" + categoria;
    return fetch(url)
        .then(response => response.json().then(data => data))
        .catch(err => console.log(err))
}

export function get_by_id_game(id_game) {
    const url = "../juegos.json?id_game=" + id_game;
    return fetch(url)
        .then(response => response.json().then(data => data))
        .catch(err => console.log(err))
}
export function get_by_search(name) {
    const url = "../juegos.json?name=" + name;
    return fetch(url)
        .then(response => response.json().then(data => data))
        .catch(err => console.log(err))
}