let datosLibros = [];
let prods = document.getElementById("prods");
let carrito = JSON.parse(localStorage.getItem("Carrito")) || [];
let mostrar  = false;


//Utilizo el vector vecLibros que se encuentra en el js "productos" y muestro los productos en pantalla
function mostrarProductos(){ 

    const URLGET="https://api.itbook.store/1.0/new";

    fetch(URLGET)
    .then(totalLibros => totalLibros.json()) //me traigo toda la info de la api y la convierto a objeto
    .then(datosLibros => {  //Promise -> "totalLibros" pasa a ser "datosLibros" ya convertido a objeto
        
        const libros = datosLibros.books;
        //console.log(titulos);
        
        libros.forEach((LIBRO) => {

            prods.innerHTML += `
            <div id="${LIBRO.isbn13}" class="card col-md-2 m-1 p-1">
                <div class="img-wrapper">
                    <img src="${LIBRO.image}" class="card-img-bottom" alt="...">
                </div>
                <div class="card-body">
                    <h5 class="card-text">${LIBRO.title}</h5>
                    <p class="card-text">${LIBRO.price}</p>
                    <a id="btn${LIBRO.isbn13}" class="btn btn-primary">Comprar</a>
                    <div>
                </div>
            </div>
            `;
        })


    //Evento: Cuando aprieto en el boton "comprar" se agrega al carrito

    libros.forEach((libro) => {
        //Escucho el evento de apretar click. Creo una funcion anonima para poder llamar a la funcion "agregar al carrito" dado que no se pueden pasar parametros desde "add event listener"
        document.getElementById(`btn${libro.isbn13}`).addEventListener("click",function(){
            let sumarIcono = document.getElementById("cantidad");
            sumarIcono.innerHTML = (carrito.length+1);
            agregarAlCarrito(libro);
        });
    }) 
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
