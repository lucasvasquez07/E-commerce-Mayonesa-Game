const videojuegos = [
    {
        nombre: "Super Mario Odyssey",
        precio: 59.99,
        descripcion: "Un juego de plataformas en 3D donde Mario explora reinos fantásticos.",
        id: 1,
        imagen: "https://assets.nintendo.com/image/upload/ar_16:9,c_lpad,w_502/b_white/f_auto/q_auto/ncom/software/switch/70010000001130/c42553b4fd0312c31e70ec7468c6c9bccd739f340152925b9600631f2d29f8b5"
    },
    {
        nombre: "The Legend of Zelda: Breath of the Wild",
        precio: 69.99,
        descripcion: "Un juego de aventura de mundo abierto en Hyrule.",
        id: 2,
        imagen: "https://assets.nintendo.com/image/upload/ar_16:9,c_lpad,w_502/b_white/f_auto/q_auto/ncom/software/switch/70010000000025/7137262b5a64d921e193653f8aa0b722925abc5680380ca0e18a5cfd91697f58"
    },
    {
        nombre: "Red Dead Redemption 2",
        precio: 59.99,
        descripcion: "Un juego de vaqueros de mundo abierto en el Salvaje Oeste.",
        id: 3,
        imagen: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1174180/header.jpg?t=1714055653"
    },
    {
        nombre: "Horizon Zero Dawn",
        precio: 49.99,
        descripcion: "Un juego de rol de acción en un mundo postapocalíptico con robots dinosaurios.",
        id: 4,
        imagen: "https://media.vandal.net/i/1280x720/2-2022/202221617154992_1.jpg.webp"
    },
    {
        nombre: "God of War (2018)",
        precio: 39.99,
        descripcion: "Un juego de acción y aventura con Kratos en la mitología nórdica.",
        id: 5,
        imagen: "https://t2.tudocdn.net/329334?w=646&h=284"
    }
];

function create_template(dict_juego) {
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

window.addEventListener("load", async () => {
    setTimeout(() => {
        const row_games = document.getElementById("list_games_home")
        row_games.innerHTML = ""
        videojuegos.forEach((dict_juego) => {
            row_games.appendChild(create_template(dict_juego))
        })
    }, 5000)

})