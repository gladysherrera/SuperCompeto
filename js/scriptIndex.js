"use strict";

console.log(localStorage.length);
// cargo en el local toda la información
//Cada vez que pasa por el index, carga los productos, strock, etc de 0

const arrayPrecios = [4450, 2856, 2370, 960, 7000, 1190, 1250, 1700, 2200, 2784, 899, 3620, 9100, 2332, 1200, 2400, 3600, 1385, 2015, 1539, 1370, 1370, 1875, 900, 1788, 1309, 2215, 9389, 5797, 1650];
const arrayProductos = ["aceite maiz arcor botella 900 ml", "acelga congelada granja del sol 500g", "acelga congelada lucchetti 450g", "agua mineral sin gas villa del sur 2 25", "aromatizante de ambiente liquido campos de lavanda glade 21ml", "arroz con leche clasico tregar 180 grm", "arroz con leche con canela tregar 180 grm", "arroz preparado sabor cheddar lucchetti 240 grm", "arroz preparado sabor tomatado lucchetti 240 grm", "arvejas congeladas granja del sol 300g", "arvejas secas arcor 300 grm", "bizcochuelo vainilla arcor paq 500 grm", "bocadito de pollo lucchetti paq 800 grm", "bombon surtidosselec arcor cja 2286 grm", "brahma cerveza 1 litro", "brocoli congelado granja del sol 400g", "brownies sabor chocolate arcor 425 grm", "budin marmolado arcor fwp 215 grm", "cabellos de angel lucchetti     paquete 500 gr", "capelettis rellenos con pollo y verdura mendia 500g", "caramelos duros menta con chocolate arcor 140g", "caramelos rellenos miel arcor paq 140 grm", "choclos  granja del bsa 300 grm", "chocolate arcor con leche tab 25 grm", "chocolate con leche y mani arcor fwp 95 grm", "crema de leche la paulina 200cc", "crema leche doble ilolay 350 grm", "cremoso fraccionado tregar xkg 1 kgm", "dulce leche clasico sancor pot 400 grm", "fideos spaghetti rina 500g"];
let arrayOfertas = [0,0,10,20,0,0,0,0,30,15,0,0,0,0,0,25,10,0,0,10,0,15,20,0,0,0,15,10,0,0];
let arrayStock = [5, 8, 2, 10, 3, 5, 3, 3, 2, 5, 7, 2, 1, 4, 6, 4, 3, 5, 5, 6, 4, 5, 4, 3, 5, 2, 3, 4, 5, 5];
let compras = [];
let cantCompras = [];

localStorage.setItem('productos', JSON.stringify(arrayProductos)); //strinngify: convierte el arreglo a una cadena JSON
localStorage.setItem('precios', JSON.stringify(arrayPrecios));
localStorage.setItem('compras', JSON.stringify(compras));
localStorage.setItem('cantCompras', JSON.stringify(cantCompras));
localStorage.setItem('arrayStock', JSON.stringify(arrayStock));
localStorage.setItem('ofertas', JSON.stringify(arrayOfertas));


/* ------ comienzo banner ------*/
let bandera = 0;

let novedades = document.getElementById("pNovedades");

//la funcion va sin parentesis (así se pasa por referencia, o sea, se pasa el nombre de la fe para que se ejecute cuando sea necesario)
//pero si pongo setInterval(cambiarTexto(),3000); la estoy invocando, y se ejecuta en el momento
setInterval(cambiarTexto, 3000);

function cambiarTexto() {
    let texto = "";
    if (bandera == 0) {
        texto = "¡Mirá nuestras OFERTAS!";
        bandera = 1;
    } else {
        texto = "Ahora podés hacer tu compra online";
        bandera = 0;
    }
    novedades.textContent = ""; //sino hago eso me agrega la nueva frase al anterior
    novedades.textContent = texto;
}
