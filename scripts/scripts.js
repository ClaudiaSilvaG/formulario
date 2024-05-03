// Creamo un array para guardar el carrito
let carrito = [];

//Escuchamos el evento de carga de la pagina 'DOMContentLoaded'
document.addEventListener('DOMContentLoaded', () => {

    //Obtenemos todos los botones de comprar
    document.querySelectorAll(".btn-comprar").forEach((btn) => {

        //Escuchamos el evento click de cada boton
        btn.addEventListener('click', (e) => {
            //Prevenimos el comportamiento por defecto
            e.preventDefault();

            console.log("click en comprar");

            //Obtenemos los datos del producto
            let sku = btn.dataset.sku;
            let titulo = btn.dataset.titulo;
            let precio = Number.parseInt(btn.dataset.precio) ;
            let descripcion = btn.parentElement.parentElement.parentElement.querySelector(".descripcion").innerHTML.trim();
            let cantidad = Number.parseInt(btn.parentElement.parentElement.querySelector(".input-cantidad").value);
            btn.parentElement.parentElement.querySelector(".input-cantidad").value=1;

            //Verificamos si el producto ya esta en el carrito
            let productoExistente = carrito.find((producto) => {
                return producto.sku == sku;
            });
        
            //Si el producto ya esta en el carrito, actualizamos la cantidad
            if (productoExistente) {
               productoExistente.cantidad=cantidad;
               ActualizarCarrito();
               return;
            }

            //creamos un elemento producto
            let producto={
                sku:sku,
                titulo:titulo,
                precio:precio,
                descripcion:descripcion,
                cantidad:cantidad
            };
            //Agregamos el producto al carrito
            carrito.push(producto);
            //Actualizamos la tabla del carrito
            ActualizarCarrito();
        });
    });
});

//Metodo para actualizar la tabla del carrito
function ActualizarCarrito(){
    //Buscamos tabla
    let tabla = document.querySelector(".tabla-carrito tbody");
    //Limpiamos la tabla
    tabla.innerHTML="";
    //Recorremos el carrito
    carrito.forEach((producto)=>{
        //Creamos fila
        let fila = document.createElement("tr");
        //Formateamos los precios
        let precio=new Intl.NumberFormat('es-CL').format(producto.precio);
        let subtotal=new Intl.NumberFormat('es-CL').format(producto.cantidad*producto.precio);
        
        //Agregamos los datos a la fila
        fila.innerHTML=`
        <td>${producto.cantidad}</td>
        <td>${producto.sku}</td>
        <td>${producto.titulo}</td>
        <td>$ ${precio}</td>
        <td>$ ${subtotal}</td>
        `;
        //Agregamos la fila a la tabla
        tabla.appendChild(fila);
    });

    //Actualizamos el total
    let total=0;
    //Recorremos el carrito y sumamos los subtotales
    carrito.forEach((producto)=>{
        total= total + (producto.precio*producto.cantidad);
    });
    //Formateamos el total
    total=new Intl.NumberFormat('es-CL').format(total);
    //Buscamos el elemento total
    let totalElement=document.querySelector(".total");
    //Actualizamos el total
    totalElement.innerHTML=`$ ${total}`;
}