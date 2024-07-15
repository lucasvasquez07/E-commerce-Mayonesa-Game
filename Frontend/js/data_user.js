import { del_user, get_user_by_id, put_user_update } from "./metodos_backend.js"
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

function evento_del_user() {
    Swal.fire({
        title: "¿Esta seguro de borrar su cuenta?",
        text: "Esta accion es irreversible",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, Borrala!"
    }).then(async (result) => {
        if (result.isConfirmed) {
            const user_id = get_id_params()
            if ((localStorage.getItem("id") == user_id) || (sessionStorage.getItem("id") == user_id)) {
                await del_user(user_id)
                localStorage.removeItem("id")
                sessionStorage.removeItem("id")
                window.location.href = "./index.html"
                Swal.fire({
                    title: "Cuenta borrada!",
                    text: "Tu cuenta ha sido borrada con exito",
                    icon: "success",
                    confirmButtonColor: '#2FAA4B'
                });
            }
        }
    });
}
window.addEventListener("load", async () => {
    const id_user = get_id_params()
    if ((localStorage.getItem("id") == id_user) || (sessionStorage.getItem("id") == id_user)) {
        const data_user = await get_user_by_id(id_user)
        console.log(data_user);
        data_user.usuario.fecha_de_creacion = data_user.usuario.fecha_de_creacion.slice(5, 16)
        const cont_data_user = document.getElementById("cont-data-user")
        cont_data_user.innerHTML = template_data_user(data_user.usuario)
        const btn_del = document.getElementById("btn-del-user")
        btn_del.addEventListener("click", evento_del_user)
    }
    else {
        window.location.href = "./index.html"
    }
})

function get_data_form() {
    const nuevo_nombre_usuario = document.getElementById("user-update").value
    const nuevo_email = document.getElementById("email-update").value
    const nueva_contraseña = document.getElementById("pw-update").value
    const data_update = {}
    if (nuevo_nombre_usuario) {
        data_update.nuevo_nombre = nuevo_nombre_usuario
    }
    if (nuevo_email) {
        data_update.nuevo_email = nuevo_email
    }
    if (nueva_contraseña) {
        data_update.nueva_contraseña = nueva_contraseña
    }
    return data_update
}
const btn_send_update = document.getElementById("btn-send-update")
btn_send_update.addEventListener("click", async (e) => {
    e.preventDefault()
    try {
        const data_update = get_data_form()
        const id_user = get_id_params()
        const response = await put_user_update(id_user, data_update);
        if (response) {
            window.location.href = "./data_user.html?id_user=" + id_user
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