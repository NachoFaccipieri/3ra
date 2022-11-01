
let prods = document.getElementById("prods");
let carrito = JSON.parse(localStorage.getItem("Carrito")) || [];
let mostrar  = false;


//Utilizo el vector vecLibros que se encuentra en el js "productos" y muestro los productos en pantalla
function mostrarProductos(){
    for(const libro of vecLibros){
        prods.innerHTML += `
        <div id="${libro.id}" class="card col-md-2 m-1 p-1">
            <div class="img-wrapper">
                <img src="${libro.foto}" class="card-img-bottom" alt="...">
            </div>
            <div class="card-body">
                <h5 class="card-text">${libro.nombre} (${libro.id})</h5>
                <p class="card-text">$ ${libro.precio}</p>
                <a href="#" id="btn${libro.id}" class="btn btn-primary">Comprar</a>
                <div>
            </div>
        </div>
        `;
    }


    //Evento: Cuando aprieto en el boton "comprar" se agrega al carrito

    vecLibros.forEach((libro) => {
        //Escucho el evento de apretar click. Creo una funcion anonima para poder llamar a la funcion "agregar al carrito" dado que no se pueden pasar parametros desde "add event listener"
        document.getElementById(`btn${libro.id}`).addEventListener("click",function(){
            let sumarIcono = document.getElementById("cantidad");
            sumarIcono.innerHTML = (carrito.length+1);
            agregarAlCarrito(libro);
        });
    })
}

//Funcion que agrega el libro que queremos comprar al carrito
function agregarAlCarrito(libro){
        carrito.push(libro);
        console.table(carrito);
        //let precioTotal = carrito.reduce((acumulador, lib) => acumulador+lib.precio,0)
        localStorage.setItem("Carrito",JSON.stringify(carrito));

}




mostrarProductos();
let sumarIcono = document.getElementById("cantidad");
sumarIcono.innerHTML = (carrito.length);
