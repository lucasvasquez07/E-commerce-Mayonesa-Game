import { template_li_list_category } from "./templates.js"

window.addEventListener("load", () => {
    const lista_categorias = ["accion", "aventura", "deportes", "fantasia", "multijugador", "shooter"]
    lista_categorias.forEach(categoria => {
        const element_list_category = document.getElementById("lista_categorias")
        element_list_category.innerHTML += template_li_list_category(categoria)
    })
})

const btn_search = document.getElementById("btn-search")

btn_search.addEventListener("click", (e) => {
    e.preventDefault
    const search_data = document.getElementById("input-search").value
    window.location.href = "./search.html?search=" + search_data;
})

