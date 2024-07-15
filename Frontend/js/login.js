//Archivo Js para la pagina de login

import { get_by_email } from "./metodos_backend.js"
//funcion que obtiene el input de password y le cambia el tipo
function change_input_pw(type_pw_input) {
    const input_pw_login = document.getElementById("pw-login")
    input_pw_login.type = type_pw_input
}

//evento de boton de mostrar la contraseña
const btn_pw = document.getElementById("btn-pw")
btn_pw.addEventListener('click', (event) => {
    event.preventDefault()
    const icon_eye = document.getElementById("icono-ojo-login")
    if (icon_eye.classList.contains("fi-rs-eye")) {
        icon_eye.classList.replace("fi-rs-eye", "fi-rs-crossed-eye")
        change_input_pw("text")
    } else {
        icon_eye.classList.replace("fi-rs-crossed-eye", "fi-rs-eye")
        change_input_pw("password")
    }
})

//obtiene los valores de los input
function get_values_form_login() {
    const email = document.getElementById("email-login").value
    const password = document.getElementById("pw-login").value
    const data = { email, password }
    return data
}

//Evento del boton enviar del formulario login
const btn_send_login = document.getElementById("btn-send-login")
btn_send_login.addEventListener("click", async (event) => {
    event.preventDefault()
    const data_user_login = get_values_form_login()
    try {
        if (data_user_login.email.length === 0 || data_user_login.password.length === 0) {
            Swal.fire({
                title: "Datos incompletos",
                text: "Rellene todos los campos",
                icon: "warning",
                confirmButtonColor: '#ffc107'
            });
        } else {
            const user_find_data = await get_by_email(data_user_login.email, data_user_login.password)
            if (!("message" in user_find_data)) {
                const remember_box = document.getElementById("remember-box")
                if (remember_box.checked) {
                    sessionStorage.removeItem("id")
                    localStorage.setItem("id", user_find_data.id)
                }
                else {
                    localStorage.removeItem("id")
                    sessionStorage.setItem("id", user_find_data.id)
                }
            } else {
                Swal.fire({
                    title: "Datos Erroneos",
                    text: "El usuario y contraseña son incorrectos",
                    icon: "error",
                    confirmButtonColor: '#DC001A'
                });
            }
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