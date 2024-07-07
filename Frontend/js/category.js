import { get_by_category } from "./metodos_juegos.js"
import { create_template_card_game } from "./templates.js"

async function get_category_game() {
    const params = new URLSearchParams(window.location.search);
    const categoria = params.get("categoria");
    const videojuegos = await get_by_category()
    const new_category_games = videojuegos.filter(juego => juego.genero.split(",").find(genero => genero == categoria))
    return new_category_games
}

window.addEventListener("load", async () => {
    setTimeout(async () => {
        const row_games = document.getElementById("list_games_home")
        row_games.innerHTML = ""
        const category = await get_category_game()
        category.forEach((dict_juego) => {
            row_games.appendChild(create_template_card_game(dict_juego))
        })
    }, 5000)


})