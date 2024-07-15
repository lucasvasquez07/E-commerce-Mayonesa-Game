import { get_user_by_id } from "./metodos_backend.js"
import { template_li_list_category, template_login_sing, template_login_user_data } from "./templates.js"

async function show_sesion() {
    const id_user = localStorage.getItem("id") ? localStorage.getItem("id") : sessionStorage.getItem("id")
    const { usuario } = await get_user_by_id(id_user)
    const ul_user = document.getElementById("ul-sesion")
    const template_user = template_login_user_data(usuario)
    ul_user.innerHTML = template_user
}
function show_btn_log_sing() {
    const ul_user = document.getElementById("ul-sesion")
    const template_log_sing = template_login_sing()
    ul_user.innerHTML = template_log_sing
}
window.addEventListener("load", async () => {
    const lista_categorias = ["accion", "aventura", "deportes", "fantasia", "multijugador", "samurais"]
    lista_categorias.forEach(categoria => {
        const element_list_category = document.getElementById("lista_categorias")
        element_list_category.innerHTML += template_li_list_category(categoria)
    })
    if (localStorage.getItem("id") || sessionStorage.getItem("id")) {
        await show_sesion()
        const btn_log_out = document.getElementById("btn-log-out")
        btn_log_out.addEventListener("click", () => {
            localStorage.removeItem("id")
            sessionStorage.removeItem("id")
            window.location.href = "./index.html"
        })
    } else {
        show_btn_log_sing()
    }
})

const btn_search = document.getElementById("btn-search")

btn_search.addEventListener("click", (e) => {
    e.preventDefault()
    const search_data = document.getElementById("input-search").value
    window.location.href = "./search.html?search=" + search_data;
})

