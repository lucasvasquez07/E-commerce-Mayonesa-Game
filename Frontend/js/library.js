import { get_games_by_id_user } from "./metodos_backend.js"
import { create_template_card_game_user } from "./templates.js";

function get_id_params() {
    const params = new URLSearchParams(window.location.search);
    return params.get("id_user");
}

window.addEventListener("load", async () => {
    try {
        const id_user = get_id_params()
        if ((localStorage.getItem("id") == id_user) || (sessionStorage.getItem("id") == id_user)) {
            const juegos_user = await get_games_by_id_user(id_user)
            const cont_juegos_user = document.getElementById("list_games_user")
            cont_juegos_user.innerHTML = ""
            juegos_user.juegos_comprados.forEach(juego => {
                cont_juegos_user.appendChild(create_template_card_game_user(juego))
            });
        }
    } catch (error) {
        Swal.fire({
            title: "Error del servidor",
            text: "El servidor no esta funcionando correctamente",
            icon: "error",
            confirmButtonColor: '#DC001A'
        });
    }
})