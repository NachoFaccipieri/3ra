let botonOrdenar = document.getElementById("botonOrdenar");
let ordenados = document.getElementById("ordenados");

function orden(){
    botonOrdenar.innerHTML += `
    <div class="dropdown">
        <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">Ordenar por: </button>
        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
            <li><a onclick="ordenarAlf(vecLibros)" type="button" class="dropdown-item">Alfabeticamente</a></li>
            <li><a onclick="precioMayor(vecLibros)" type="button" class="dropdown-item">Precio de menor a mayor</a></li>
            <li><a onclick="precioMenor(vecLibros)" type="button" class="dropdown-item">Precio de mayor a menor</a></li>
        </ul>
  </div>
    `;
}

function ordenarAlf(veclibros){
    veclibros.sort((a, b) => a.nombre.localeCompare(b.nombre));
    prods.innerHTML = ` `;
    mostrarProductos(prods);
}

function precioMayor(libros){

        libros.sort((a, b) => a.precio - b.precio);
        prods.innerHTML = ` `;
        mostrarProductos(prods);
}

function precioMenor(libros){
        libros.sort((a, b) => b.precio - a.precio);
        prods.innerHTML = ` `;
        mostrarProductos(prods);
}
orden();