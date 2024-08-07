"use strict";

let nombre = document.getElementById("nombre");
let apellido = document.getElementById("apellido");
let correo = document.getElementById("correo");
let telefono = document.getElementById("telefono");
let asunto = document.getElementById("asunto");
let consulta = document.getElementById("consulta");
let btnEnviar = document.getElementById("enviar");


let info = [];

/* La diferencia entre btnEnviar.addEventListener("click", (e) => { y btnEnviar.addEventListener("submit", (e) => { está relacionada con el comportamiento predeterminado de los eventos en un formulario HTML.

1. *btnEnviar.addEventListener("click", (e) => {*:
   - Cuando usas el evento click, se activa solo cuando se hace clic en el botón, pero no necesariamente cuando se envía el formulario.
   - Por lo tanto, si tienes un campo con el atributo required, no se verificará automáticamente cuando hagas clic en el botón. Debes verificar manualmente si los campos están completos antes de enviar el formulario.

2. *btnEnviar.addEventListener("submit", (e) => {*:
   - El evento submit se activa cuando se envía el formulario, ya sea haciendo clic en un botón de envío o presionando la tecla "Enter" en un campo de texto.
   - Cuando usas este evento, el navegador automáticamente verifica los campos con el atributo required antes de enviar el formulario. Si algún campo obligatorio está vacío, el envío se bloquea y se muestra un mensaje de error.

En resumen, si deseas que la validación automática del atributo required funcione correctamente, debes usar btnEnviar.addEventListener("submit", (e) => {. De esta manera, el navegador se encargará de verificar los campos antes de enviar el formulario*/

btnEnviar.addEventListener("click", (e) => {   //ojo cuando pongo submit, me valida, pero se me cae algo da error 405
    e.preventDefault(); /*para que no se actualice la pagina cuando pulsa enviar*/
    alert("entro al manejador de evento")
    
    info[0] = nombre.value;
    info[1] = apellido.value;
    info[2] = correo.value;
    info[3] = telefono.value;
    info[4] = asunto.value;
    info[5] = consulta.value;

    let error = 0;

    switch (true) {
        case validarCamposVacios(info, error)==1:
            alertaError("Faltan completar datos");
            break;
        case validarCorreo(correo.value.trim(), error)==1:
            alertaError("Posible correo invalido");
            break;
        case validarTelefono(telefono.value.trim(), error)==1:
            alertaError("Telefono invalido");
            break;
        default:
            let blob = new Blob([info], { type: "text/plain;charset=utf-8" }); //corchetes para que separe con ,

                saveAs(blob, "contacto.txt"); //de la libreria FileSaver

                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Consulta enviada",
                    showConfirmButton: false,
                    timer: 2500
                });

                nombre.value = "";
                apellido.value = "";
                correo.value = "";
                telefono.value = "";
                asunto.value = "";
                consulta.value = "";
    }
})

function validarCorreo(correo, error) {
    console.log("correo", correo);
    if (!correo.includes("@")) {
        error = 1;
        console.log("no tiene @");
    } else {
        let pos = correo.indexOf("@");
        if (pos == 0 || pos == correo.length - 1) {
            error = 1;
            console.log("tiene @ pero la posicion es ", pos);
        }
    }
    return error;
}

function validarCamposVacios(info, error) {
    for (let i = 0; i < info.length; i++) {
        if (info[i] == "") {
            error = 1;
        }
    }
    return error;
}

function validarTelefono( tel, error) {
    console.log("entro a validar telefono");
   if (tel.length<4 || tel.length>10) {
    error = 1;
    console.log("mal longitude del tel");
   } else {
    for (let i=0; i<tel.length; i++) {
        if (isNaN(parseInt(tel[i]))) {
            error = 1;
            console.log("no es un nro", tel[i]);
        }
    }
   }
    return error;
}

function alertaError (texto) {
    Swal.fire({
        icon: "error",
        title: "Error",
        text: texto,
        confirmButtonColor: "#036a0aa7"
    });
}