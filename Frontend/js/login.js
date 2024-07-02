
function change_input_pw(type_pw_input) {
    const input_pw_login = document.getElementById("pw-login")
    input_pw_login.type = type_pw_input
}

const btn_pw = document.getElementById("btn-pw")
btn_pw.addEventListener('click', () => {
    const icon_eye = document.getElementById("icono-ojo-login")
    if (icon_eye.classList.contains("fi-rs-eye")) {
        icon_eye.classList.replace("fi-rs-eye", "fi-rs-crossed-eye")
        change_input_pw("text")
    } else {
        icon_eye.classList.replace("fi-rs-crossed-eye", "fi-rs-eye")
        change_input_pw("password")
    }
})