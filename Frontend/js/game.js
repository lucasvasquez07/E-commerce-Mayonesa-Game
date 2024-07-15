import { get_by_id_game, post_game_buy } from "./metodos_backend.js";
import { template_game_data } from "./templates.js";

function show_game_data(game_data) {
    game_data.fecha_de_adicion = game_data.fecha_de_adicion.slice(5, 16)
    const game_data_cont = document.getElementById("game-cont")
    game_data_cont.innerHTML = template_game_data(game_data)
}

async function get_game_id() {
    const params = new URLSearchParams(window.location.search);
    const id_game = params.get("id_game");
    const response = await get_by_id_game(id_game);
    return response
}

function evento_buy_game() {
    const params = new URLSearchParams(window.location.search);
    const id_game = params.get("id_game");
    if (localStorage.getItem("id") || sessionStorage.getItem("id")) {
        if (localStorage.getItem("id")) {
            const id_user = localStorage.getItem("id")
            post_game_buy(id_user, id_game)
        } else {
            const id_user = sessionStorage.getItem("id")
            post_game_buy(id_user, id_game)
        }
        Swal.fire({
            title: "Compra Exitosa",
            text: "Se ha hecho la compra con exito",
            icon: "success",
            confirmButtonColor: '#2FAA4B'
        });
    } else {
        window.location.href = "./login.html"
        console.log("redireccionado");
    }
}

window.addEventListener("load", async () => {
    try {
        const game_data = await get_game_id();
        await show_game_data(game_data.juego)
        const btn_buy = document.getElementById("btn-buy-game")
        btn_buy.addEventListener("click", evento_buy_game)
    } catch (error) {
        Swal.fire({
            title: "Error del servidor",
            text: "El servidor no esta funcionando correctamente",
            icon: "error",
            confirmButtonColor: '#DC001A'
        });
    }

});
