"use strict"
console.log(localStorage);
// armo los arreglos trayendolos del localStorage
let arrayProductos = localStorage.getItem('productos');
let arrayPrecios = localStorage.getItem('precios');
let arrayOfertas = localStorage.getItem('ofertas');
let compras = localStorage.getItem('compras');
let cantCompras = localStorage.getItem('cantCompras');
let arrayStock = localStorage.getItem('arrayStock');


//convierte el JSON a arreglo
arrayProductos = JSON.parse(arrayProductos);
arrayPrecios = JSON.parse(arrayPrecios);
arrayOfertas = JSON.parse(arrayOfertas);
compras = JSON.parse(compras);
cantCompras = JSON.parse(cantCompras);
arrayStock = JSON.parse(arrayStock);


//dibujo las cards
mostrarProductos(arrayProductos, arrayPrecios, arrayStock, arrayOfertas);


let cajaCard = document.getElementsByClassName("btnComprar");
//lanzo los eventos a cada boton de las cards
for (let subi = 0; subi < cajaCard.length; subi++) {
    cajaCard[subi].addEventListener("click", (e) => {
        let nroCard = e.target.closest(".card"); //me da null el e.target.id
        controlStock(arrayStock, nroCard.id);
    })
}

window.addEventListener("beforeunload", function (e) {
    //e.preventDefault();
    cargarEnStorage(compras, cantCompras, arrayStock);
});


function controlStock(arrayStock, nroCard) {
    let elementoInput = document.getElementById(`num${nroCard}`);
    let cantidad = parseInt(elementoInput.value);
    console.log("cantidad", cantidad);
    console.log("el input", elementoInput.value);
    switch (true) {
        case cantidad < 0:
            alertaError("la cantidad no puede ser menor que 0");
            elementoInput.value = 0;
            break;
        case cantidad == 0:
            alertaError("debe ingresar la cantidad a comprar");
            break;
        case cantidad > arrayStock[nroCard]:
            alertaError("la cantidad a comprar supera el stock");
            elementoInput.value = 0;
            break
        default:
            elementoInput.value = 0;
            comprarProducto(arrayStock, arrayProductos, arrayPrecios, compras, cantCompras, parseInt(nroCard), cantidad,arrayOfertas);
    }
}

function alertaError(texto) {
    Swal.fire({
        title: texto,
        confirmButtonColor: "#036a0aa7",
        icon: "error"
    });
}

function comprarProducto(stock, productos, precios, compras, cantCompras, id, cantidadProducto, arrayOfertas) {

    //actualizo el stock
    stock[id] -= cantidadProducto;
    let divStock = document.getElementById(`stock${id}`);
    divStock.textContent = `Stock : ${stock[id]} unidades`;

    if (arrayStock[id] == 0) {
        divStock.classList.add("cardSinStock");
    }

    //agrego el id del producto al arreglo compras y la cantidad en cantCompras
    compras[compras.length] = id;
    cantCompras[compras.length - 1] = parseInt(cantidadProducto);
    let precioCompra = precios[id] * cantidadProducto;
    if (arrayOfertas[id] !== 0) {
        console.log("encontro una oferta", precioCompra, arrayOfertas[id]);
        precioCompra = precioCompra - (precioCompra * arrayOfertas[id] / 100);
    }

    Swal.fire({
        title: `Seleccionó ${cantidadProducto} unidades  `,
        text: `de ${productos[id]} por un total de $ ${precioCompra}`,
       // icon: "info",
       iconHtml: '<i class="fa-solid fa-cart-arrow-down" style="font-size:0.6em"></i>',
        iconColor: "#036a0aa7",
        showCancelButton: true,
        confirmButtonColor: "#036a0aa7",
        cancelButtonColor: "#E09900",
        cancelButtonText: "Finalizar compra",
        confirmButtonText: "Seguir comprando"
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: "Producto agregado al carrito",
                text: "",
                confirmButtonColor: "#036a0aa7",
                icon: "success"
            });
        }
        if (result.isDismissed) { //ir al Carrito
            cargarEnStorage(compras, cantCompras, stock);
        }
    });
    /*cantidadProducto.value = 0;//en el input pongo 0 */
};

function cargarEnStorage(compras, cantCompras, stock) {
    localStorage.setItem('compras', JSON.stringify(compras));
    localStorage.setItem('cantCompras', JSON.stringify(cantCompras));
    //linea agregada - guardo el stock
    localStorage.setItem('arrayStock', JSON.stringify(stock));
    location.href = "carrito.html";
}

function mostrarProductos(arrayProductos, arrayPrecios, arrayStock, arrayOfertas) {
    let cardContenedor = document.getElementById("cardContainer");

    for (let i = 0; i < arrayProductos.length; i++) {
        //creo la card
        let card = document.createElement("div");
        card.classList.add("card");
        card.setAttribute("id", `${i}`);

        //agrego la imagen
        let elemento = document.createElement("img");
        elemento.classList.add("cardImagen");
        elemento.setAttribute("src", `./imagenes2/${arrayProductos[i]}.jpg`);
        elemento.setAttribute("alt", `${arrayProductos[i]}`);
        card.appendChild(elemento);

        //agrego el nombre del producto
        elemento = document.createElement("h2");
        elemento.classList.add("cardTitulo");
        let texto = document.createTextNode(`${arrayProductos[i]}`);
        elemento.appendChild(texto);
        card.appendChild(elemento);

        //agrego el precio
        console.log(arrayOfertas, i)
        if (arrayOfertas[i] !== 0) {
            //agrego la imagen de oferta
            elemento = document.createElement("img");
            elemento.classList.add("superpuesta");
            elemento.setAttribute("src", `./imagenes/ofertaEspecial.png`);
            elemento.setAttribute("alt", `super oferta`);
            card.appendChild(elemento);
            //agrego precio tachado
            elemento = document.createElement("p");
            elemento.classList.add("cardPrecioTachado");
            texto = document.createTextNode(`precio anterior $ ${arrayPrecios[i]}`);
            elemento.appendChild(texto);
            card.appendChild(elemento);

            //agrego precio oferta
            elemento = document.createElement("p");
            elemento.classList.add("cardPrecio");
            console.log("texto ver si es numero o string", texto);
            let precioConDesc = arrayPrecios[i] - (arrayPrecios[i] * arrayOfertas[i] / 100);
            precioConDesc.toString();
            texto = document.createTextNode(`precio Oferta: $ ${precioConDesc}`);
            elemento.appendChild(texto);
            card.appendChild(elemento);


        } else {
            //agrego el precio
            elemento = document.createElement("p");
            elemento.classList.add("cardPrecio");
            texto = document.createTextNode(`$ ${arrayPrecios[i]}`);
            elemento.appendChild(texto);
            card.appendChild(elemento);
        }
        //agrego el stock
        elemento = document.createElement("p");
        elemento.classList.add("cardStock");
        if (arrayStock[i] == 0) {
            elemento.classList.add("cardSinStock");
        }
        elemento.setAttribute("id", `stock${i}`)
        texto = document.createTextNode(`Stock : ${arrayStock[i]} unidades`);
        elemento.appendChild(texto);
        card.appendChild(elemento);

        //div contenedor del input y su label
        let elementoDiv = document.createElement("div");
        elementoDiv.classList.add("cardContador");

        //agrego el label 
        elemento = document.createElement("label");
        texto = document.createTextNode("tus unidades: ");
        elemento.appendChild(texto);
        elemento.classList.add("valorLabel");
        elementoDiv.appendChild(elemento);

        //creo el input
        elemento = document.createElement("input");
        elemento.classList.add("valorContador");
        elemento.setAttribute("type", "number");
        elemento.setAttribute("id", `num${i}`);
        elemento.setAttribute("min", 0);
        elemento.setAttribute("value", 0);
        elementoDiv.appendChild(elemento);

        card.appendChild(elementoDiv);

        //agrego boton comprar
        elemento = document.createElement("button");
        elemento.classList.add("btnComprar");
        texto = document.createTextNode(`Comprar`);
        elemento.appendChild(texto);
        card.appendChild(elemento);

        //agrego todo a la card
        cardContenedor.appendChild(card);
    }
}