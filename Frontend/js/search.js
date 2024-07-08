import { get_by_search } from "./metodos_juegos.js"
import { create_template_card_game } from "./templates.js"

async function get_search() {
    const params = new URLSearchParams(window.location.search);
    const search = params.get("search");
    const videojuegos = await get_by_search()
    console.log(videojuegos);
    const search_games = videojuegos.filter(juego => juego.nombre.toLowerCase().includes(search.toLowerCase()))
    return search_games
}
window.addEventListener("load", async () => {
    setTimeout(async () => {
        const row_games = document.getElementById("list_games_home")
        row_games.innerHTML = ""
        const category = await get_search()
        console.log(category);
        category.forEach((dict_juego) => {
            row_games.appendChild(create_template_card_game(dict_juego))
        })
    }, 5000)
})