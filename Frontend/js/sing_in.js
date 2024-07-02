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

const btn_pw1 = document.getElementById("btn-pw1")
btn_pw1.addEventListener('click', () => {
    change_icon_eye("icono-ojo-sing-in-1", "pw1-sing-in")
})
const btn_pw2 = document.getElementById("btn-pw2")
btn_pw2.addEventListener('click', () => {
    change_icon_eye("icono-ojo-sing-in-2", "pw2-sing-in")
})