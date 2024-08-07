const nav = document.getElementById("menuNav");
const abrir = document.getElementById("abrir");
const cerrar = document.getElementById("cerrar");

abrir.addEventListener("click", () => {
    nav.classList.add("navVisible");
    console.log(nav.classList);
    console.log("entro a abrir");
})

cerrar.addEventListener("click", (e) => {
    nav.classList.remove("navVisible");
    console.log(nav.classList);
    console.log("entro a cerrarr");
})
