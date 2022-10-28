let carrito = JSON.parse(localStorage.getItem("Carrito")) || [];

let sumarIcono = document.getElementById("cantidad");
sumarIcono.innerHTML = (carrito.length);