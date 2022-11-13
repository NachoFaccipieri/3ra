let botonOrdenar = document.getElementById("botonOrdenar");

function orden(){
    botonOrdenar.innerHTML += `
    <div class="dropdown">
        <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">Ordenar por: </button>
        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
            <li><a onclick="ordenarAlf(libros)" type="button" class="dropdown-item">Alfabeticamente</a></li>
            <li><a onclick="precioMayor(libros)" type="button" class="dropdown-item">Precio de menor a mayor</a></li>
            <li><a onclick="precioMenor(libros)" type="button" class="dropdown-item">Precio de mayor a menor</a></li>
        </ul>
  </div>
    `;
}

//------------------------------------------------------------------------------------------------------------------------
//Este código funcionaba, tenía un botón para ordenar los libros
//por nombre y precio pero con los libros traídos desde una api
//no logré hacer que funcione
//------------------------------------------------------------------------------------------------------------------------


function ordenarAlf(libros){
    libros.sort((a, b) => a.nombre.localeCompare(b.nombre));
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