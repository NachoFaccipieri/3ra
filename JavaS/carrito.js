let aPagar = document.getElementById("aPagar");
let carritoCompras = document.getElementById("carritoCompras");

//Operador avanzado --> Si el carrito no está vacío, "me lo traigo" desde el storage, caso contrario ( || ) genero un carrito (vector/lista) vacío.
let carrito = JSON.parse(localStorage.getItem("Carrito")) || [];

//Le asigno el número de elementos del carrito al número que está al lado del carrito.
let sumarIcono = document.getElementById("cantidad");
sumarIcono.innerHTML = (carrito.length);

//Según vayamos agregando elementos al carrito, con esta función generamos la visualización de los mismos en un segundo HTML llamado "carrito"
let generarItem = () => {
    
    //Utilización de operador avanzado: Operador ternario para saber si el carrito está vacío o no
    let bool = (carrito.length !== 0) ? true : false;

    if( bool ){

        //Utilizo una desestructuración: utilizo sólo el isbn13 que paso a llamarlo "id", el título, precio e imagen que paso a llamarla "img", de todo el objeto
        return (carritoCompras.innerHTML = carrito.map((x) => {
            let {isbn13:id, title, price, image:img} = x;

                //Creo la visualización de cada objeto que se agregó al carrito. Además de generar el título, imagen, botón de eliminar y precios de forma visibles, creo otro elemento que no se ve: ID que lo utilizo más adelante para poder eliminar del carrito un elemento específico
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


//Función que cree para que se visualice el total a pagar y dos botones funcionales: Comprar y RemoverTodo. Cada cual llama a su respectiva función. Tanto para comprar como para remover se pide una confirmación 
function precioTotalYBotones(){

    //Tuve que hacer este "Regex" ya que cuando me traigo el precio desde la API viene con un "$" incluido (ejemplo: "$50.50") y el reduce no anda porque en vez de hacer: "50.50 + 50.50" quiere hacer "$50.50 + $50.50". Encontré por internet este método (*precio*.match(regex)) donde regex=/(\d.+)/g para quedarme sólo con los números y también realizo un parseFloat dentro del reduce ya que si no lo toma como string y sólo concatena los precios dando como resultado "Total a pagar: $50.5050.50,0" en vez de "$101"
    //Por otro lado, no se "rompe" pero a veces en "Total a pagar" quedan números con muchas comas (por ejemplo utilizando el libro "Learning Go" y "Introduction to Autonomous Robots, 3rd Edition", el tercer y cuarto libro.) y el toFixed(x) no me funciona

    if (carrito.length !== 0){
        let regex = /(\d.+)/g;
        let TOTAL = carrito.reduce((acumulador, lib) => acumulador+(parseFloat((lib.price).match(regex))),0)
        document.getElementById("total").innerHTML = `
            <h2>Total a pagar: $${TOTAL}</h2>
            <button onclick="comprar()" class="comprar">Comprar</button>
            <button onclick="removerTodo()" class="removerTodo">Remover todo</button>
        `; 
    }
}

//Funcion que permite remover items del carrito, recibe por parámetro el evento
let remover= (ev) => {

    //Obtengo el padre del item desde el que se generó el evento (en este caso es el botón remover). Luego me quedo con el hijo del hijo que fue donde guardé el ID del libro. Busco la posición del libro que coincida con ese ID y lo elimino utilizando "splice" desde el índice obtenido con el "findIndex", eliminando un único elemento. Vuelvo a llamar a la función generarItem, que muestra el carrito actualizado, sin el libro que se acaba de eliminar y modifico el LocalStorage
    let fila = ev.target.parentElement;
    let id = fila.children[0].children[0].id;
    let indice = carrito.findIndex(libro => libro.isbn13 == id)
    carrito.splice(indice,1);
    generarItem();
    localStorage.setItem("Carrito", JSON.stringify(carrito));
    
    
    //Si aun tengo cosas en el carrito, vuelvo a llamar a la función que me genera los botones de "comprar" y "removerTodo". Si no hago el if, salta un error debido a que intenta hacer uso del reduce de algo vacío
    if (carrito.length > 0){
        precioTotalYBotones();
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

//Función que vacía el vector carrito, luego llama a la función generarItem (ya con el vector vacío) y limpio el localStorage. Utilizo esta función tanto a la hora de remover todo el carrito como a la hora de confirmar la compra
function limpiarCarro(){
    carrito = [],
    generarItem(),
    localStorage.setItem("Carrito", JSON.stringify(carrito))
}


//Función que da funcionalidad (valga la redundancia) al botón "comprar". Cuando tenemos algún libro en el carrito, podemos presionar el botón "comprar" que pide una confirmación. Dada la confirmación, salta un mensaje avisando que se ha confirmado la compra y luego se limpia el vector carrito, se limpia la pantalla y el localStorage. Caso que se presione el otro botón, no ocurre nada y queda todo como está
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
precioTotalYBotones();
