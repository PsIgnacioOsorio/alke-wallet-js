$("#loginForm").submit(function(event){

    event.preventDefault();

    const email = $("#email").val();
    const password = $("#password").val();

    const usuarioCorrecto = "admin@alkewallet.com";
    const passwordCorrecta = "admin";

    $("#alert-container").empty();

    if(
        email === usuarioCorrecto &&
        password === passwordCorrecta
    ){

        $("#alert-container").html(`
            <div class="alert alert-success">
                <i class="bi bi-check-circle-fill"></i>
                Inicio de sesión exitoso. Redirigiendo...
            </div>
        `);

        setTimeout(function(){

            window.location.href = "menu.html";

        }, 2000);

    } else {

        $("#alert-container").html(`
            <div class="alert alert-danger">
                <i class="bi bi-exclamation-triangle-fill"></i>
                Correo o contraseña incorrectos.
            </div>
        `);

    }

});