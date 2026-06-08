$(document).ready(function () {

    let saldo = localStorage.getItem("saldo");

    if (saldo === null) {

        saldo = 60000;

        localStorage.setItem(
            "saldo",
            saldo
        );

    }

    $(".menu-card").hide().fadeIn(1000);

    $("#balance").text(
        "$" +
        Number(saldo).toLocaleString("es-CL")
    );

    function mostrarAlerta(mensaje) {

        $("#alertContainer").html(`
        <div class="alert alert-info alert-dismissible fade show text-center shadow" role="alert">
            ${mensaje}
            <button type="button"
                class="btn-close"
                data-bs-dismiss="alert">
            </button>
        </div>
    `);

    }

    $("#btnDepositar").click(function (e) {

        e.preventDefault();

        mostrarAlerta(
            "Redirigiendo a Depósitos..."
        );

        setTimeout(function () {

            window.location.href =
                "deposit.html";

        }, 1500);

    });

    $("#btnEnviar").click(function (e) {

        e.preventDefault();

        mostrarAlerta(
            "Redirigiendo a Enviar Dinero..."
        );

        setTimeout(function () {

            window.location.href =
                "sendmoney.html";

        }, 1500);

    });

    $("#btnMovimientos").click(function (e) {

        e.preventDefault();

        mostrarAlerta(
            "Redirigiendo a Últimos Movimientos..."
        );

        setTimeout(function () {

            window.location.href =
                "transactions.html";

        }, 1500);

    });

});