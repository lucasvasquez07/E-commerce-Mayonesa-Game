import { get_by_email } from "./metodos_backend.js"

function change_input_pw(type_pw_input) {
    const input_pw_login = document.getElementById("pw-login")
    input_pw_login.type = type_pw_input
}

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

function get_values_form_login() {
    const email = document.getElementById("email-login").value
    const password = document.getElementById("pw-login").value
    const data = { email, password }
    return data
}

async function verify_user(user_data) {
    const users = await get_by_email()
    const user_find = users.find(user => user.email == user_data.email && user.password == user_data.password)
    return user_find
}

const btn_send_login = document.getElementById("btn-send-login")
btn_send_login.addEventListener("click", async (event) => {
    event.preventDefault()
    const data_user_login = get_values_form_login()
    const user_find_data = await verify_user(data_user_login)
    if (user_find_data) {
        localStorage.setItem("id", user_find_data.id)
    } else {
        console.log("usuario error");
    }
})