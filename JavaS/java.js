
//Creo un vector vacío en el cual voy a almacenar datos traídos desde la pi
let datosLibros = [];

//Guardo en "prods" el elemento con id "prods" del index principal para hacer uso del DOM más adelante
let prods = document.getElementById("prods");

//Me guardo en "carrito" los libros que tengo almacenados en el localStorage, en caso de no tener nada, creo un vector vacío
let carrito = JSON.parse(localStorage.getItem("Carrito")) || [];

//Booleano que se utiliza para la ventana de logueo
let mostrar  = false;


//Función que crea cards de libros traídos desde una API
function mostrarProductos(){ 

    const URLGET="https://api.itbook.store/1.0/new";

    //Hago la utilización del fetch, promesa y asincronía
    fetch(URLGET)
    .then(totalLibros => totalLibros.json()) //me traigo toda la info de la api y la convierto a objeto
    .then(datosLibros => {  //Promise -> "totalLibros" pasa a ser "datosLibros" ya convertido a objeto
        
        //Me guardo en "libros" sólo con lo que me interesa de los objetos traídos desde la api. En "books" tenemos información como título, precio, imágen, entre otras cosas de 20 libros
        const libros = datosLibros.books; 
        
        //Por cada libro, creo una card con su respectivo ID (que no es visible), su imagen, título y precio.
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
            //En la barra de navegación tengo un ícono de un carrito con un número al lado. En estas dos líneas de código, obtengo el id de ese número y le agrego +1 a su valor actual. Y así voy actualizándolo a medida que se van a agregando cosas al carrito
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
