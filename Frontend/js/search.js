import { get_by_search } from "./metodos_backend.js";
import { create_template_card_game } from "./templates.js";

async function get_search() {
    const params = new URLSearchParams(window.location.search);
    const search = params.get("search");
    const videojuegos = await get_by_search(search);
    return videojuegos.juegos; // Asegúrate de extraer la lista de juegos correctamente
}

window.addEventListener("load", async () => {
    try {
        const row_games = document.getElementById("list_games_home");
        row_games.innerHTML = "";
        
        const games = await get_search();
        games.forEach((dict_juego) => {
            row_games.appendChild(create_template_card_game(dict_juego));
        });
    } catch (error) {
        console.error('Error al procesar juegos obtenidos:', error);
    }
});
