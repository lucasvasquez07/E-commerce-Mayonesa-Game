import { post_user_sign_in } from "./metodos_backend.js"

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

function get_data_form() {
    const name = document.getElementById("user-sing-in").value
    const email = document.getElementById("email-sing-in").value
    const password = document.getElementById("pw1-sing-in").value
    const password2 = document.getElementById("pw2-sing-in").value
    return { name, email, password, password2 }
}

const btn_send_sing_in = document.getElementById("btn-send-sing-in")
btn_send_sing_in.addEventListener("click", async (event) => {
    event.preventDefault()
    const data_user = get_data_form()
    if (data_user.name.length > 0 && data_user.email.length > 0 && data_user.password.length > 0 && data_user.password2.length > 0) {
        if (data_user.password === data_user.password2) {
            delete data_user.password2;
            const data_user_login = await post_user_sign_in(data_user.email, data_user.password, data_user.name)
            const remember_box = document.getElementById("remember-box")
            if (remember_box.checked) {
                sessionStorage.removeItem("id")
                localStorage.setItem("id", data_user_login.id)
            }
            else {
                localStorage.removeItem("id")
                sessionStorage.setItem("id", data_user_login.id)
            }
            Swal.fire({
                title: "Registro exitoso",
                text: "Se ha registrado el usuario con exito",
                icon: "success",
                confirmButtonColor: '#2FAA4B'
            });
        } else {
            Swal.fire({
                title: "Error Contraseña",
                text: "La contraseña y la recontraseña no son iguales",
                icon: "warning",
                confirmButtonColor: '#ffc107'
            });
        }
    } else {
        Swal.fire({
            title: "Datos incompletos",
            text: "Rellene todos los campos",
            icon: "warning",
            confirmButtonColor: '#ffc107'
        });
    }

})