
//Esta debe ser la parte del código que más me costó. El tema de validar los formularios
//La idea de este JS fue que, a partir de presionar el boton "log in" que está definido en el index principal, aparezcan 2 ventanas en pantalla: Una de register y una de log in.
//Primero que nada me traigo del localStorage los usuarios y contraseñas que ya tengo guardados y en caso de no tener nada guardado, creo vectores vacíos.
//Una vez hecho eso, ya habiéndose presionado el botón "log in" y con las ventanas en pantalla tenemos dos opciones: Registrarnos o loguearnos
//En el caso de registrarnos, primero me traigo el usuario y contraseña ingresados en los inputs, a dos variables usr y passw respectivamente. Generé dos expresiones regulares (su valor lo saqué de internet. Está explicado más abajo) y valido que tanto el email y contraseña ingresados respeten con esas expresiones regulares según corresponda. Si respetan, busco en mi vector "usuarios" creado al principio, que no exista en el localStroge el email que acaban de ingresar. Si no existe, se registra y se sube al storage, caso contrario sale una alerta.
//En el caso del log in, utilizo tanto el vector "usuarios" como "contraseñas" para buscar que el usuario ingresado coincida con la contraseña de ese email en el momento en el que se creó. Cuando se registra un email, se posiciona en el vector "usuarios" en la posición 0, a la vez que su contraseña se posiciona en el vector "contraseñas" en la posición 0. Por ende, la contraseña del usuario de la posición 0, sólo podrá ser la que se encuentra en el vector "constraseñas" en la posición 0. Más abajo se ve la utilidad.
//Por último, la variable "mostrar" sirve para crear y ocultar las ventanas de logueo a la hora de presionar el botón "log in"


//Me traigo los usuarios ya registrados desde el localStorage. En caso de no tener ninguno, creo un vector vacío
let usuarios = JSON.parse(localStorage.getItem("Usuario")) || [];
let contraseñas = JSON.parse(localStorage.getItem("Password")) || [];


function mostrarLog(){

    //En java.js tengo una variable mostrar = false. Si esa variable, es falsa, cuando se aprieta el botón de login in, entra en esta función y me genera dos ventanas de login (con el uso de DOM): Una para ingresar y otra para registrarse. La variable "mostrar" se convierte en true. Cuando se vuelve a apretar el botón log in, desaparecen las ventanas.
    if (!mostrar){

        //Primer div: Genera la ventana de Register, segundo Div, genera la ventana de login.
        document.getElementById("Log").innerHTML = `
        <div class="login-card">
            <h1>Register</h1><br>
            <form>
                <input id="user" type="text" name="email" placeholder="Email">
                <input id="passw" type="password" name="pass" placeholder="Password">
                <input onclick="validar(event)" id="botonReg" type="submit" class="login login-submit" value="Register">
            </form>
        </div> 
        

        <div class="login-card">
            <h1>Log-in</h1><br>
            <form>
                <input id="usuario" type="text" name="user" placeholder="Username">
                <input id="pass" type="password" name="pass" placeholder="Password">
                <input onclick="validarLogin(event)" type="submit" name="login" class="login login-submit" value="login">
            </form>
        </div> 
        `;

        mostrar = true;
    } else {
        document.getElementById("Log").innerHTML = `<div></div> `;
        mostrar = false;
    }
}



//Creo una función para validar que se haya ingresado un email válido.
//Utilizo la propiedad "preventDefault" para que, a la hora de hacer click en "registrar" no me quiera enviar los datos del formulario a algún lado ni se me actualice la página. Sin el "preventDefault" ocurre que al hacer click en "register" o "login", se actualiza la página
function validar(ev){
    ev.preventDefault();

    //Me quedo con el valor de lo que se ingresó en el campo "user" y "passw" del formulario para realizar la validación mediante expresiones regulares
    let usr = document.getElementById("user").value;
    let passw = document.getElementById("passw").value;


    //Las siguientes expresiones regulares no son propias de mi, las saqué de la página: https://regexr.com/ la cual es una página con diferentes patrones de expresiones regulares para hacer una correcta validación de diferentes campos como por ejemplo para validar emails o contraseñas. Dado que si ponía "let expresionRegular = /@/" sólo estoy preguntando si se pone al menos 1 arroba. No valida caracteres especiales ni espacios, etc. De esta manera, con estas expresiones regulares se valida que la dirección de email ingresada y la contraseña sea correcta y respete los estándares.
    let emailExpresionRegular = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;
    let passExpresionRegular = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;



    //La siguiente línea de código devuelve un booleano "true" en caso de que el parámetro que se le pasa tanto a "test"(usr) como a "test"(passw) respete la expresión regular declarada en las variables de arriba "emailExpresionRegular" y "passExpresionRegular" respectivamente guardándose así, los datos en el localStorage. En caso de que no se respete, devuelve un false, tira un alert y no se guardan los datos.
    //De esta manera realizo la validación del formulario del campo "user" y del campo "passw".
    if (emailExpresionRegular.test(usr) && passExpresionRegular.test(passw)) {
        
        //En caso de respetar las expresiones regulares pedidas, realicé un filtro para conocer si el usuario que se intenta registrar ya está en el local storage. Si ya está ingresado, salta un error, en caso contrario se registra y se guarda tanto la contraseña como el usuario en el localStorage
            if (usuarios.find(user => user === usr)) {
                Swal.fire({
                    icon: 'error',
                    title: 'Email ya registrado!',
                  })
            } else {
                usuarios.push(usr);
                contraseñas.push(passw);
                localStorage.setItem('Usuario', JSON.stringify(usuarios));
                localStorage.setItem('Password', JSON.stringify(contraseñas));
                usr = document.getElementById("user");
                usr.value = "";
                passw = document.getElementById("passw");
                passw.value = "";

                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Registrado con éxito',
                    showConfirmButton: false,
                    timer: 1200
                })
            }
        } else {
        Swal.fire({
            icon: 'error',
            title: 'Email o contraseña incorrectos!',
            text: 'La contraseña debe contener: al menos 8 caracteres, una mayuscula, una minúscula y un numero'
          })
    }
}





//Funcion que valida los datos del "log in". La propiedad "preventDefault" está explicada más arriba
function validarLogin(ev){
    ev.preventDefault();


    //Me traigo los valores ingresados en los campos "usuario" y "contraseña" de log in
    let usr = document.getElementById("usuario").value;
    let passw = document.getElementById("pass").value;

    //Busco que el email ingresado exista en el Storage, si existe busco su index y me lo guardo en la variable pos. Hecho eso, ingreso a esa misma posición pero en el vector "constraseñas" para comparar la contraseña en esa posición (debido a que cada registro de un email, va con su respectiva contraseña y se guardan a la par pero en diferentes vectores. Cada email matchea con una unica contraseña y están posicionados en el mismo índice, pero en distintos vectores) con la contraseña ingresada. Si coinciden, se loggea, se borran los campos de los inputs y se cierran las ventanas de logueo. Caso contrario, ya sea que no exista el email o la contraseña no coincida, salta un error dependiendo del problema.
    if (usuarios.find(user => user === usr)){
        let pos = usuarios.findIndex(user => user === usr);
        console.log(contraseñas);
        if (contraseñas[pos] === passw){
            usr = document.getElementById("usuario");
            usr.value = "";
            passw = document.getElementById("pass");
            passw.value = "";
            document.getElementById("Log").innerHTML = `<div></div> `;
            mostrar = false;
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Logueado con éxito',
                showConfirmButton: false,
                timer: 1200
            })
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Contraseña incorrecta!',
              })
        }
    } else {
        Swal.fire({
            icon: 'error',
            title: 'El email no está registrado!',
          })
    }
}




//En el navbar de mi index principal, tengo un botón log in. Cuando se lo presiona, se llama a la función "mostrarLog"
document.getElementById(`btnLog`).addEventListener("click",mostrarLog);