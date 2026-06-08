$(document).ready(function () {

    let saldo =
        Number(localStorage.getItem("saldo")) || 60000;

    localStorage.setItem("saldo", saldo);

    $("#currentBalance").text(
        "$" + saldo.toLocaleString("es-CL")
    );

    $("#depositForm").submit(function (event) {

        event.preventDefault();

        const monto =
            Number($("#depositAmount").val());

        if (monto <= 0) {

            $("#alert-container").html(`
                <div class="alert alert-danger">
                    Debe ingresar un monto válido.
                </div>
            `);

            return;
        }

        saldo += monto;

        localStorage.setItem(
            "saldo",
            saldo
        );

        let movimientos =
            JSON.parse(
                localStorage.getItem("movimientos")
            ) || [];

        movimientos.unshift({

            tipo: "Depósito",

            descripcion: "Depósito a cuenta",

            monto: monto,

            fecha: new Date().toLocaleString("es-CL")

        });

        localStorage.setItem(
            "movimientos",
            JSON.stringify(movimientos)
        );

        $("#currentBalance").text(
            "$" + saldo.toLocaleString("es-CL")
        );

        $("#depositInfo").text(
            "Monto depositado: $" +
            monto.toLocaleString("es-CL")
        );

        $("#alert-container").html(`
    <div class="alert alert-success alert-dismissible fade show" role="alert">

        <i class="bi bi-check-circle-fill"></i>
        Depósito realizado correctamente.
        Nuevo saldo: $${saldo.toLocaleString("es-CL")}

        <button
            type="button"
            class="btn-close"
            data-bs-dismiss="alert">
        </button>

    </div>
`);

        $("#depositForm")[0].reset();

        setTimeout(function () {

            window.location.href =
                "menu.html";

        }, 2000);

    });

});