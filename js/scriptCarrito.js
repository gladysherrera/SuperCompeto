"user strict";

// armo los arreglos trayendolos del localStorage
let arrayProductos = localStorage.getItem('productos');
let arrayPrecios = localStorage.getItem('precios');
let arrayCompras = localStorage.getItem('compras');
let arrayCantCompras = localStorage.getItem('cantCompras');
let arrayStock = localStorage.getItem('arrayStock');
let arrayOfertas = localStorage.getItem('ofertas');
//convierte el JSON a arreglo
arrayProductos = JSON.parse(arrayProductos);
arrayPrecios = JSON.parse(arrayPrecios);
arrayCompras = JSON.parse(arrayCompras);
arrayCantCompras = JSON.parse(arrayCantCompras);
arrayStock = JSON.parse(arrayStock);
arrayOfertas = JSON.parse(arrayOfertas);


let total = 0;
total = crearPantalla(total);
terminarCompraEvento();
cancelarCompraEvento();
eliminarProductoEvento();


window.addEventListener("beforeunload", function (e) {
    //e.preventDefault();
  cargarEnStorage(arrayCompras,arrayCantCompras,arrayStock);
});

// ------- funciones -----------------
function terminarCompraEvento() {//evento para el boton de terminar compra
    const btn = document.getElementById("btnCompra");
    btn.addEventListener("click", (e) => {
        if (arrayCompras.length == 0) {
            alertaSinBoton("Seguir descubriendo productos")
        } else {
            alertaSinBoton("Gracias por su compra")
        }
        }
    );
}

function alertaSinBoton(texto) {
    Swal.fire({
        position: "top",
        icon: "success",
        title: texto,
        showConfirmButton: false,
        timer: 1500
    }).then(() => {//promesa, se ejecuta cuando se termina el alert
        cargarEnStorage([], [], arrayStock); //arraycompras, arraycantCompras
        location.href = "super.html";
    });
}

function cancelarCompraEvento() {
    //evento para el boton cancelar
    const btn = document.getElementById("btnCancelar");
    btn.addEventListener("click", (e) => {
        if (arrayCompras.length==0) {
            alertaSinBoton("Siga descubriendo productos");
        } else {
        Swal.fire({
            title: "Desea continuar? Perderá todos los elementos del carrito",
            showCancelButton: true,
            confirmButtonColor: "#036a0aa7",
            confirmButtonText: "  SI  ",
        }).then((result) => {
            if (result.isConfirmed) {
                eliminarProductos(arrayCompras, arrayCantCompras, arrayStock);
                cargarEnStorage(arrayCompras, arrayCantCompras, arrayStock);
                Swal.fire({
                    title: "Su carrito está vacio",
                    icon: "success",
                    confirmButtonColor: "#036a0aa7"
                }).then(() => {
                    location.href = "super.html";
                }); // :)
            }
        })
    }
});
}

function eliminarProductoEvento() {
    //evento de los eliminar trash
    const contenedorProductos = document.getElementById("contenedorProductosComprados");

    contenedorProductos.addEventListener("click", (e) => {
        if (e.target.classList.contains("fa-trash")) {
            // Si se hizo clic en un icono de basura, extrae el índice
            const indice = parseInt(e.target.id.substr(5)); //extrae una subcadena a partir de la posicion 5 (donde comienza el nro)
            eliminarUnProducto(indice, arrayCompras, arrayCantCompras, arrayStock);
            // Redibuja la pantalla
            borrarPantallaProductos();
            total = 0;
            total = crearPantalla(total);
            // No necesitas volver a llamar a eliminarProductoEvento
        }
    })


}

function borrarPantallaProductos() {
    let div = document.getElementById("productosComprados"); // borro los producto
    div.innerHTML = "";
    //div.removeChild(div.firstChild);  //SI BORRO UN SOLO PRODUCTO SE ME COMPLICA LA LOGICA DE LA SUMA :(
    div = document.getElementById("contenedorResumen"); //borro el resumen
    div.innerHTML = "";

    // ----- eliminar uno
    /*  const div = document.getElementById("miDiv"); // Reemplaza "miDiv" con el ID de tu div
  const elementoAEliminar = document.getElementById("elemento-a-eliminar"); // Reemplaza con el ID del elemento que deseas eliminar
  div.removeChild(elementoAEliminar);
  // ---------------------eliminar todos
  const div = document.getElementById("miDiv"); // Reemplaza "miDiv" con el ID de tu div
  while (div.firstChild) {
      div.removeChild(div.firstChild);
  }*/



}

function eliminarUnProducto(posicion, arrayCompras, arrayCantCompras, arrayStock) {

    let cantADevolver = arrayCantCompras.splice(posicion, 1); //comienza a eliminar desde posicion y elimina 1 solo elemento y antes de borrarlo lo guarda en la variable
    arrayStock[arrayCompras[posicion]] += cantADevolver[0]; //agregaa al stock la cantidad de productos no compradas
    arrayCompras.splice(posicion, 1); // borra la compra
}

function crearPantalla(total) {
    if (arrayCompras.length == 0) {
        mostrarSinProductos();
    } else {
        total = mostrarProductos(arrayProductos, arrayCompras, arrayPrecios, arrayCantCompras, total);
    }
    crearResumen(total);
    return total;
}

function mostrarProductos(arrayProductos, arrayCompras, arrayPrecios, arrayCantCompras, total) {
    for (let i = 0; i < arrayCompras.length; i++) {
        let contenedor = document.createElement("div");
        contenedor.classList.add("conCompras");
        // ---- agrego el producto -----
        crearElemento("p", "primerCol", arrayProductos[arrayCompras[i]], contenedor, i);

        // ---- agrego precio unitario -----
        let precioU = arrayPrecios[arrayCompras[i]];
        if (arrayOfertas[arrayCompras[i]]!==0){
            precioU = precioU - (precioU * arrayOfertas[arrayCompras[i]]/100);
        }
        crearElemento("p", "otrasColumnas", `$ ${precioU}`, contenedor, i);

        // ---- agrego cantidad -----
        crearElemento("p", "otrasColumnas", arrayCantCompras[i], contenedor, i);

        // ---- agrego subtotal -----
        let subtotal = arrayCantCompras[i] * precioU;
        total += subtotal;
        crearElemento("p", "otrasColumnas", `$ ${subtotal}`, contenedor, i);

        // ----- agrego el borrar -----

        crearElemento("p", "ultimaColumna", `"fa-solid", "fa-trash"`, contenedor, i);
        //lo agrego a la pagina
        let productoComprado = document.getElementById("productosComprados");
        productoComprado.appendChild(contenedor);
    };
    return total; //no estamos en ts, se usa asi para devolver la variable
}

function cargarEnStorage(compras, cantCompras, arrayStock) {
    localStorage.setItem('compras', JSON.stringify(compras));
    localStorage.setItem('cantCompras', JSON.stringify(cantCompras));
    localStorage.setItem('arrayStock', JSON.stringify(arrayStock));
}

function mostrarSinProductos() {
    let contenedor = document.createElement("div");
    contenedor.classList.add("sinCompras");
    crearElemento("h2", "aPagar", "Carrito sin Productos", contenedor);
    //agrego la imagen
    let elemento = document.createElement("img");
    elemento.classList.add("imagenCarrito");
    elemento.setAttribute("src", `./imagenes/carrito.png`);
    elemento.setAttribute("alt", `carrito vacio`);
    contenedor.appendChild(elemento);

    let productosComprados = document.getElementById("productosComprados");
    productosComprados.appendChild(contenedor);
}



function crearResumen(total) {
    // ----- Resumen -----
    contenedor = document.getElementById("contenedorResumen");
    crearElemento("p", "aPagar", "Total a Pagar", contenedor);
    crearElemento("p", "aPagar", `$ ${total}`, contenedor);
}



function crearElemento(etiqueta, clase, txt, padre, posicion) {
    let elemento = document.createElement(etiqueta);
    elemento.classList.add(clase);
    if (clase == "ultimaColumna") { //agrego el icono de eliminar en el p de la ultima columna
        let icono = document.createElement("i");
        icono.classList.add("fa-solid", "fa-trash");
        icono.setAttribute("id", `icono${posicion}`);
        elemento.appendChild(icono);
    } else {
        let texto = document.createTextNode(txt);
        elemento.appendChild(texto);
    }
    padre.appendChild(elemento);
}

function eliminarProductos(arrayCompras, arrayCantCompras, arrayStock) {
    for (let i = arrayCantCompras.length - 1; i >= 0; i--) {
        eliminarUnProducto(i, arrayCompras, arrayCantCompras, arrayStock);
    }
}

