function mostrarLog(){

    if (!mostrar){
        document.getElementById("Log").innerHTML = `
        <div class="login-card">
            <h1>Register</h1><br>
            <form>
                <input id="user" type="text" name="email" placeholder="Email">
                <input id="pass" type="password" name="pass" placeholder="Password">
                <input id="botonReg" type="submit" name="login" class="login login-submit" value="Register">
            </form>
        </div> 
        

        <div class="login-card">
            <h1>Log-in</h1><br>
            <form>
                <input type="text" name="user" placeholder="Username">
                <input type="password" name="pass" placeholder="Password">
                <input type="submit" name="login" class="login login-submit" value="login">
            </form>
            <div class="login-help">
                <a href="#">Forgot Password</a>
            </div>
        </div> 
        `;
        document.getElementById(`botonReg`).addEventListener("click",obtenerValor);
        mostrar = true;
    } else {
        document.getElementById("Log").innerHTML = `<div></div> `;
        mostrar = false;
    }
}

function obtenerValor(){
    let usr = document.getElementById("user").value;
    localStorage.setItem('Usuario',usr);
    let pass = document.getElementById("pass").value;
    localStorage.setItem('Password',pass);
}

document.getElementById(`btnLog`).addEventListener("click",mostrarLog);