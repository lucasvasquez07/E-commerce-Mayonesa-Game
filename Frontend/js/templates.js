export function create_template_card_game(dict_juego) {
    const card_game = document.createElement("div")
    card_game.classList = "col"
    const template = `
        <div class="card-game">
            <a href="#${dict_juego.id}">
                <img src="${dict_juego.imagen}"
                    class="card-img-top" alt="...">
                <div class="card-body ">
                    <div>
                        <p class="fs-4 text-card text-card-title">${dict_juego.nombre}</p>
                    </div>
                    <div>
                        <p class="fs-6 text-card text-card-price">$${dict_juego.precio}</p>
                    </div>
                </div>
            </a>
        </div>`
    card_game.innerHTML = template
    return card_game
}

export function template_li_list_category(categoria) {
    const primeraLetra = categoria.charAt(0).toUpperCase();
    const restoDelTexto = categoria.slice(1);
    const categoria_Capitalizado = primeraLetra + restoDelTexto;
    return `<li><a class="dropdown-item " href="./category.html?categoria=${categoria}">${categoria_Capitalizado}</a>
    </li>`
}