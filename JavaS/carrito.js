let aPagar = document.getElementById("aPagar");
let carritoCompras = document.getElementById("carritoCompras");
let carrito = JSON.parse(localStorage.getItem("Carrito")) || [];

let sumarIcono = document.getElementById("cantidad");
sumarIcono.innerHTML = (carrito.length);

//Según vayamos agregando elementos al carrito, con esta función generamos la visualización de los mismos en un segundo HTML
let generarItem = () => {
    
    //Utilización de operador avanzado: Operador ternario
    let bool = (carrito.length !== 0) ? true : false;

    if( bool ){
        return (carritoCompras.innerHTML = carrito.map((x) => {
            let {isbn13:id, title, price, image:img} = x;

            return `
            <div class="item">
                <img width="100" src="${img}" alt="...">
                
                <div class="Titulo">
                    <h4 class="TituloYP">
                        <p id=${id}></p>
                        <p class="title">${title}</p>
                        <p class="itemPrecio">${price}</p>
                    </h4>
                    <i onclick="remover(event)" class="bi bi-bookmark-x" type="button"></i>
                </div>
            </div>
            `;
        })
        .join(""));

        //Si el carrito está vacío genero un cartel avisandolo y un botón para volver a la página principal
    }else{
        carritoCompras.innerHTML = ``;
        aPagar.innerHTML = `
        <h2>El carrito está vacío ):</h2>
        <a href="./index.html">
            <button class="HomeBtn"> -> Vuelva a comprar! <- </button>
        </a>
        `;        
    }

};

function totalYbotones(){

    if (carrito.length !== 0){
        let regex = /(\d.+)/g;
        let TOTAL = carrito.reduce((acumulador, lib) => acumulador+(parseFloat((lib.price).match(regex))),0)
        document.getElementById("total").innerHTML = `
            <h2>Total a pagar: ${TOTAL}</h2>
            <button onclick="comprar()" class="comprar">Comprar</button>
            <button onclick="removerTodo()" class="removerTodo">Remover todo</button>
        `; 
    }
}

//Funcion que permite remover items del carrito
let remover= (ev) => {

    let fila = ev.target.parentElement;
    let id = fila.children[0].children[0].id;
    let indice = carrito.findIndex(producto => producto.isbn13 == id)
    carrito.splice(indice,1);
    generarItem();
    localStorage.setItem("Carrito", JSON.stringify(carrito));
    
    
    //Si aun tengo cosas en el carrito, vuelvo a generar la lista de libros que me quedan en él
    if (carrito.length > 0){

        //Tuve que hacer este "Regex" ya que cuando me traigo el precio desde la API, viene con un "$" incluido (ejemplo: "$50.50"), entonces el reduce no anda porque en vez de hacer: "50.50 + 50.50" quiere hacer "$50.50 + $50.50". Encontré por internet este método (*precio*.match(regex)) para quedarme sólo con los números y también realizo un parseFloat dentro del reduce ya que si no lo toma como string y sólo concatena los precios dando como resultado "Total a pagar: 50.5050.50"
        //Por otro lado, no se "rompe" pero a veces quedan números con muchas comas y el toFixed no me funciona
        
        let regex = /(\d.+)/g;
        let TOTAL = carrito.reduce((acumulador, lib) => acumulador+(parseFloat((lib.price).match(regex))),0)
        document.getElementById("total").innerHTML = `
            <h2>Total a pagar: ${TOTAL}</h2>
            <button onclick="comprar()" class="comprar">Comprar</button>
            <button onclick="removerTodo()" class="removerTodo">Remover todo</button>
        `;
    }
}

//Función que permite eliminar todos los objetos del carrito con 1 solo botón
function removerTodo(){
    //Utilización de librería: Sweet Alert
    Swal.fire({
        title: 'Está por vaciar el carrito',
        text: "Se eliminarán todos los productos",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, vaciar!'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            'El carrito está vacío!',
            'Comprame algo ):',
            limpiarCarro()
          )
        }
      })
}

function limpiarCarro(){
    carrito = [],
    generarItem(),
    localStorage.setItem("Carrito", JSON.stringify(carrito))
}

function comprar(){
    Swal.fire({
        title: 'Desea confirmar la compra?',
        icon: 'info',
        showCancelButton: true,
        confirmButtonColor: '#00AD00',
        cancelButtonColor: '#563BFF',
        confirmButtonText: 'Comprar!',
        cancelButtonText: 'Seguir comprando'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            'Gracias por elegirnos!',
            limpiarCarro()
          )
        }
      })
      
}



generarItem();
totalYbotones();
//remover();
