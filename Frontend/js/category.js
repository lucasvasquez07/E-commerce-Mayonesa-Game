// category.js
import { get_by_category } from "./metodos_backend.js";
import { create_template_card_game } from "./templates.js";

function show_category(categoria) {
    document.title = categoria
    const title_category = document.getElementById("t-category");
    title_category.innerText = `Categoria: ${categoria}`;
}


async function get_category_game() {
    const params = new URLSearchParams(window.location.search);
    const categoria = params.get("categoria");
    const lista_categorias = ["accion", "aventura", "deportes", "fantasia", "multijugador", "samurais"]
    if ((lista_categorias.includes(categoria))) {
        show_category(categoria);
        try {
            const response = await get_by_category(categoria);
            return response.juego;
        } catch (err) {
            Swal.fire({
                title: "Error del servidor",
                text: "El servidor no esta funcionando correctamente",
                icon: "error",
                confirmButtonColor: '#DC001A'
            });
            return [];
        }
    } else {
        Swal.fire({
            title: "Categoria Invalida o inexistente",
            text: "La url ingresada es inexistente",
            icon: "error",
            confirmButtonColor: '#DC001A'
        });
    }
}

window.addEventListener("load", async () => {
    const row_games = document.getElementById("list_games_home");
    row_games.innerHTML = "";
    const category_games = await get_category_game();
    category_games.forEach((dict_juego) => {
        row_games.appendChild(create_template_card_game(dict_juego));
    });
});
