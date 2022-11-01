let aPagar = document.getElementById("aPagar");
let carritoCompras = document.getElementById("carritoCompras");
let carrito = JSON.parse(localStorage.getItem("Carrito")) || [];

let sumarIcono = document.getElementById("cantidad");
sumarIcono.innerHTML = (carrito.length);

//Según vayamos agregando elementos al carrito, con esta función generamos la visualización de los mismos en un segundo HTML
let generarItem = () => {
    

    if(carrito.length !== 0){
        return (carritoCompras.innerHTML = carrito.map((x) => {
            let {id, nombre, precio} = x;
            //let search = vecLibros.find((y) => y.id === id) || [];

            return `
            <div class="item">
                <img width="100" src="${x.foto}" alt="...">
                
                <div class="Titulo">
                    <h4 class="TituloYP">
                        <p class="title">${x.nombre}</p>
                        <p class="itemPrecio">$${x.precio}</p>
                    </h4>
                    <i onclick="remover(${id})" class="bi bi-bookmark-x" type="button"></i>
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

//Función que permite eliminar todos los objetos del carrito con 1 solo botón
let remover= (id) => {
    let idseleccionado = id;
    carrito = carrito.filter((x) => x.id !== idseleccionado);
    generarItem();
    localStorage.setItem("Carrito", JSON.stringify(carrito));
    
    let precioTotal = carrito.reduce((acumulador, lib) => acumulador+lib.precio,0)
    document.getElementById("total").innerHTML = `
        <h2>Total a pagar: $${precioTotal}</h2>
        <button class="comprar">Comprar</button>
        <button onclick="removerTodo()" class="removerTodo">Remover todo</button>
    `; 
}

function removerTodo(){
    carrito = [];
    generarItem();
    localStorage.setItem("Carrito", JSON.stringify(carrito));
}



generarItem();
remover();
