const txtName = document.getElementById ("Name");//nombre
const txtNumber = document.getElementById("Number");// agregar variables de productos y cantidad
const btnAgregar = document.getElementById("btnAgregar");
const alertValidacionesTexto = document.getElementById("alertValidacionesTexto");
const tablaListaCompras = document.getElementById("tablaListaCompras");
const cuerpoTabla = tablaListaCompras.getElementsByTagName("tbody").item(0);

const contadorProductos =  document.getElementById("contadorProductos");
const productosTotal = document.getElementById("productosTotal");
const precioTotal= document.getElementById("precioTotal");

// Numeracion de la primera columna de la tabla
let cont = 0;
let costoTotal= 0;
let totalEnProductos = 0;

function validarCantidad(){
    if (txtNumber.value.trim().length<=0){
        return false;
    }//length<=0
//numero
if(isNaN(txtNumber.value)){
    return false;
}//isNaN

if (Number(txtNumber.value)<=0){
    return false;
}
//<=0 construct de number para que sea un num
    return true;
}
// validar cantidad 1. que no este vacio, 2, que lo valide como numero,3. que sea mayor o igual a cero

function getPrecio(){
    return Math.round((Math.random()*10000)) / 100;
} //getPrecio

btnAgregar.addEventListener("click", function(event){
    event.preventDefault();
    //Bandera al ser tru permite agregar los datos a la tabla
    let isValid = true;

    txtName.style.border="";
    alertValidacionesTexto.innerHTML="";
    alertValidaciones.style.display ="none"; //limpiar el campo
    txtNumber.style.border="";



    txtName.value = txtName.value.trim();
    txtNumber.value = txtNumber.value.trim();//value es el id, el valor

if (txtName.value.length <3 ){
    txtName.style.border="solid medium red";
    alertValidacionesTexto.innerHTML="<strong>El Nombre del producto no es correcto.</strong>";
    alertValidaciones.style.display ="block";
    isValid = false;

}//length>=3


if (! validarCantidad()){
    txtNumber.style.border="solid medium red";
    alertValidacionesTexto.innerHTML +="<br/><strong>La cantidad no es correcta.</strong>";
    alertValidaciones.style.display ="block";
isValid = false;
}//validar que no este vacio, no sea negativo

if(isValid){
    cont ++;
    let precio = getPrecio();
    let row = `<tr>
    <td>${cont}</td>
    <td>${txtName.value}</td>
    <td>${txtNumber.value}</td>
    <td>${precio}</td>
    </tr>`;

    cuerpoTabla.insertAdjacentHTML("beforeend", row);
    costoTotal += precio * Number(txtNumber.value);
    precioTotal.innerText ="$" + costoTotal.toFixed(2);
    totalEnProductos += Number(txtNumber.value);
    productosTotal.innerText = totalEnProductos;
    contadorProductos.innerText = cont;


contadorProductos.innerText = cont;


    txtName.value = "";
    txtNumber.value = "";
    txtName.focus();

}// if isValid



});//btnAgregar
