export function create_template_card_game(dict_juego) {
    const card_game = document.createElement("div")
    card_game.classList = "col"
    const template = `
        <div class="card-game">
            <a href="./game.html?id_game=${dict_juego.id}">
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

export function template_login_user_data(data_user) {
    return `<li class="nav-item">
    <a class="nav-link" href="./data_user.html?id_user=${data_user.id}"> <i class="fi fi-rs-circle-user"></i> ${data_user.nombre}</a>
</li>
<li class="nav-item">
    <button class="nav-link" id="btn-log-out">Log out</button>
</li>`
}

export function template_login_sing() {
    return `<li class="nav-item">
    <a class="nav-link" href="./login.html">Login</a>
</li>
<li class="nav-item">
    <a class="nav-link" href="./sing_in.html">Sign in</a>
</li>`
}

export function template_data_user(usuario) {
    return `<p><span class="atributo-user">Username:</span> ${usuario.nombre}</p>
    <p><span class="atributo-user">Email:</span> ${usuario.email}</p>
    <p><span class="atributo-user">Fecha de creación:</span> ${usuario.fecha_de_creacion}</p>
    <button class="btn-del-user" id="btn-del-user">Borrar Cuenta</button>
    `
}

export function template_game_data(game_data) {
    return `<div class="container-xxl mt-5 container-game" id="container-game-data">
    <div class="cont-img-game">
    <img src="${game_data.imagen}"
        alt="${game_data.nombre}">
</div>
<div class="cont-game-data">
    <h1 class="title-game ">${game_data.nombre}</h1>
    <p class="description-game"><span class="atribut">Descripcion:</span> ${game_data.descripcion}</p>
    <p class="category-game"><span class="atribut">Categoria:</span>: ${game_data.categoria}</p>
    <p class="date-game"><span class="atribut">Fecha de Lanzamiento:</span> ${game_data.fecha_de_adicion}</p>
    <p class="price-game"><span class="atribut">Precio:</span> <span class="span-price">$${game_data.precio}ARS</span></p>
    <button class="btn-buy" id="btn-buy-game">Comprar</button>
</div>
</div>`
}