import { get_user_by_id } from "./metodos_backend.js"
import { template_data_user } from "./templates.js"

//Cambia el tipo de un input
function change_input_pw(type_pw_input, id_input_pw) {
    const input_pw_login = document.getElementById(id_input_pw)
    input_pw_login.type = type_pw_input
}
//Obtiene el elemento y cambia la clase del icono i y llama a otra funcion
function change_icon_eye(id_icon, id_input_pw) {
    const icon_eye = document.getElementById(id_icon)
    if (icon_eye.classList.contains("fi-rs-eye")) {
        icon_eye.classList.replace("fi-rs-eye", "fi-rs-crossed-eye")
        change_input_pw("text", id_input_pw)
    } else {
        icon_eye.classList.replace("fi-rs-crossed-eye", "fi-rs-eye")
        change_input_pw("password", id_input_pw)
    }
}
const btn_pw = document.getElementById("btn-pw")
btn_pw.addEventListener('click', () => {
    change_icon_eye("icono-ojo-update", "pw-update")
})

function get_id_params() {
    const params = new URLSearchParams(window.location.search);
    return params.get("id_user");
}
window.addEventListener("load", async () => {
    const id_user = get_id_params()
    if ((localStorage.getItem("id") == id_user) || (sessionStorage.getItem("id") == id_user)) {
        const data_user = await get_user_by_id(id_user)
        data_user.usuario.fecha_de_creacion = data_user.usuario.fecha_de_creacion.slice(5, 16)
        const cont_data_user = document.getElementById("cont-data-user")
        cont_data_user.innerHTML = template_data_user(data_user.usuario)
    }
    else {
        window.location.href = "./index.html"
    }
})