// category.js
import { get_by_category } from "./metodos_backend.js";
import { create_template_card_game } from "./templates.js";

function show_category(categoria) {
    const title_category = document.getElementById("t-category");
    title_category.innerText = `Categoria: ${categoria}`;
}

async function get_category_game() {
    const params = new URLSearchParams(window.location.search);
    const categoria = params.get("categoria");

    console.log('Categoria:', categoria); // Verificar el valor de categoria

    if (!categoria) {
        console.error('No se ha proporcionado una categoría en la URL.');
        return [];
    }

    show_category(categoria);

    try {
        const response = await get_by_category(categoria);
        console.log('Respuesta del servidor:', response); // Verificar la respuesta del servidor
        if (response && response.juego) {
            return response.juego;
        } else {
            console.error('No se encontraron juegos o la respuesta no es válida.');
            return [];
        }
    } catch (err) {
        console.error('Error al obtener los juegos por categoría:', err);
        return [];
    }
}

window.addEventListener("load", async () => {
    setTimeout(async () => {
        const row_games = document.getElementById("list_games_home");
        row_games.innerHTML = "";
        const category_games = await get_category_game();
        console.log('Juegos de la categoría:', category_games); // Verificar los juegos obtenidos
        category_games.forEach((dict_juego) => {
            row_games.appendChild(create_template_card_game(dict_juego));
        });
    }, 1500);
});
