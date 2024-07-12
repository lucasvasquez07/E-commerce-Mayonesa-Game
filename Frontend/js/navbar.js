import { template_li_list_category, template_login_sing, template_login_user_data } from "./templates.js"

function show_sesion() {
    const get_data_user = {
        id: 1,
        email: "lucas@gmail.com",
        date: "2024/07/08",
        name: "Lucas Vasquez"
    }
    const ul_user = document.getElementById("ul-sesion")
    const template_user = template_login_user_data(get_data_user)
    ul_user.innerHTML = template_user
}
function show_btn_log_sing() {
    const ul_user = document.getElementById("ul-sesion")
    const template_log_sing = template_login_sing()
    ul_user.innerHTML = template_log_sing
}
window.addEventListener("load", () => {
    const lista_categorias = ["accion", "aventura", "deportes", "fantasia", "multijugador", "shooter"]
    lista_categorias.forEach(categoria => {
        const element_list_category = document.getElementById("lista_categorias")
        element_list_category.innerHTML += template_li_list_category(categoria)
    })
    if (localStorage.getItem("id") || sessionStorage.getItem("id")) {
        show_sesion()
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

