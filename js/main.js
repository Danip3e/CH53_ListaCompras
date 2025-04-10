const txtName = document.getElementById ("Name");//nombre
const txtNumber = document.getElementById("Number");// agregar variables de productos y cantidad
const btnAgregar = document.getElementById("btnAgregar");
const alertValidacionesTexto = document.getElementById("alertValidacionesTexto");
const alertValidaciones = document.getElementById("alertValidaciones");
const tablaListaCompras = document.getElementById("tablaListaCompras");
const cuerpoTabla = tablaListaCompras.getElementsByTagName("tbody").item(0);

const contadorProductos =  document.getElementById("contadorProductos");
const productosTotal = document.getElementById("productosTotal");
const precioTotal= document.getElementById("precioTotal");

const btnLimpiar = document.getElementById("btnClear");

// Numeracion de la primera columna de la tabla
let cont = 0;
let costoTotal= 0;
let totalEnProductos = 0;
let datos = new Array();// [] Almacena los elementos de la tabla

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
    let precio = getPrecio(); // ultima columna
    let row = `<tr>
    <td>${cont}</td>
    <td>${txtName.value}</td>
    <td>${txtNumber.value}</td>
    <td>${precio}</td>
    </tr>`;
    let elemento = { // (objeto)anotacion de json string", : valor
            "cont" : cont,
        "nombre" : txtName.value,
        "cantidad" : txtNumber.value,
        "precio" : precio
    };
datos.push(elemento);

localStorage.setItem("datos", JSON.stringify(datos));

    cuerpoTabla.insertAdjacentHTML("beforeend", row);
    costoTotal += precio * Number(txtNumber.value);
    precioTotal.innerText ="$" + costoTotal.toFixed(2);
productosTotal.innerText = totalEnProductos;
contadorProductos.innerText = cont;
 
    totalEnProductos += Number(txtNumber.value);
   
   

    let resumen = {

        "cont" : cont,
        "totalEnProductos": totalEnProductos,
        "costoTotal" : costoTotal
        
        };
        
        localStorage.setItem("resumen", JSON.stringify(resumen));



    txtName.value = "";
    txtNumber.value = "";
    txtName.focus();

}// if isValid

});//btnAgregar

window.addEventListener("load", function(event){
    event.preventDefault();
if(this.localStorage.getItem("datos")!=null){
    datos = JSON.parse(this.localStorage.getItem("datos"));

}//datos !=null

datos.forEach((d) => {
    let row = `<tr> 
               <td>${d.cont}</td>   
               <td>${d.nombre}</td>   
               <td>${d.cantidad}</td>   
               <td>${d.precio}</td>   
</tr> `;
cuerpoTabla.insertAdjacentHTML("beforeend", row);
});


if(this.localStorage.getItem("resumen")!=null){
    resumen = JSON.parse(this.localStorage.getItem("resumen"));
    costoTotal = resumen.costoTotal;
    totalEnProductos = resumen.totalEnProductos;
    cont = resumen.cont;
}// resumen !=null
precioTotal.innerText ="$" + costoTotal.toFixed(2);
productosTotal.innerText = totalEnProductos;
contadorProductos.innerText = cont;
}); //window.addEvenListener load

//Agregar la funcionalidad del botón Limpiar Todo
//Resumen
//Tabla
// Campos
// Alerta
//LocalStorage

     btnLimpiar.addEventListener("click", function () {
            
            contadorProductos.innerText = 0;
            productosTotal.innerText = 0;
            precioTotal.innerText = "$ 0.00";//Resumen
            cuerpoTabla.innerHTML = ""; //Tabla 
            alertValidacionesTexto.innerHTML = "";//Alertas
            alertValidaciones.style.display = "none";
            txtName.style.border = "";
            txtNumber.style.border = "";
            txtName.value = "";//Campos
            txtNumber.value = "";
            localStorage.removeItem("datos"); //localStorage
            localStorage.removeItem("resumen");
        
            cont = 0;//Reiniciar
            totalEnProductos = 0;
            costoTotal = 0;
            datos = [];
        });
        






