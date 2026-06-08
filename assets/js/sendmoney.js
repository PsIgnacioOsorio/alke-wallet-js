$(document).ready(function () {

    let saldo =
    Number(localStorage.getItem("saldo")) || 60000;

    $("#saldoActual").text(
        "$" + saldo.toLocaleString("es-CL")
    );

    // Mostrar botón al seleccionar contacto

    $(document).on(
        "change",
        'input[name="contact"]',
        function () {

            $("#btnEnviarDinero")
            .removeClass("d-none");

            $(".list-group-item")
            .removeClass("active");

            $(this)
            .closest(".list-group-item")
            .addClass("active");

        }
    );

    // Buscar contactos

    $("#searchContact").on(
        "keyup",
        function () {

            const texto =
            $(this).val().toLowerCase();

            $("#contactList .list-group-item")
            .filter(function () {

                $(this).toggle(
                    $(this)
                    .text()
                    .toLowerCase()
                    .indexOf(texto) > -1
                );

            });

        }
    );

    // Guardar contacto

    $("#saveContact").click(function () {

        const nombre =
        $("#contactName").val().trim();

        const cbu =
        $("#contactCBU").val().trim();

        const alias =
        $("#contactAlias").val().trim();

        const banco =
        $("#contactBank").val().trim();
        

        if (
            nombre === "" ||
            cbu === "" ||
            alias === "" ||
            banco === ""
        ) {

            $("#alertContainer").html(`
                <div class="alert alert-danger">
                    Complete todos los campos.
                </div>
            `);

            return;
        }

        if (!/^\d{8,22}$/.test(cbu)) {

            $("#alertContainer").html(`
                <div class="alert alert-danger">
                    El CBU debe contener solo números.
                </div>
            `);

            return;
        }

        $("#contactList").append(`

            <div class="list-group-item">

                <input
                    class="form-check-input me-2"
                    type="radio"
                    name="contact"
                    value="${nombre}">

                ${nombre}

                <br>

                <small class="text-muted">

                    CBU: ${cbu} |
                    Alias: ${alias} |
                    Banco: ${banco}

                </small>

            </div>

        `);

        $("#contactos").append(`<option value="${nombre}">`);

        $("#contactForm")[0].reset();

        bootstrap.Modal
        .getInstance(
            document.getElementById("contactModal")
        )
        .hide();

        $("#alertContainer").html(`
            <div class="alert alert-success">
                Contacto agregado correctamente.
            </div>
        `);

    });

    // Transferencia

    $("#transferForm").submit(function (event) {

        event.preventDefault();

        const monto =
        Number($("#amount").val());

        const contacto =
        $('input[name="contact"]:checked')
        .val();

        if (!contacto) {

            $("#alertContainer").html(`
                <div class="alert alert-danger">
                    Seleccione un contacto.
                </div>
            `);

            return;
        }

        if (monto <= 0) {

            $("#alertContainer").html(`
                <div class="alert alert-danger">
                    Ingrese un monto válido.
                </div>
            `);

            return;
        }

        if (monto > saldo) {

            $("#alertContainer").html(`
                <div class="alert alert-danger">
                    Saldo insuficiente.
                </div>
            `);

            return;
        }

        saldo -= monto;

        localStorage.setItem(
            "saldo",
            saldo
        );

        let movimientos =
        JSON.parse(
            localStorage.getItem("movimientos")
        ) || [];

        movimientos.unshift({

            tipo: "Transferencia",

            descripcion:
            "Transferencia a " + contacto,

            monto: monto,

            fecha:
            new Date()
            .toLocaleString("es-CL")

        });

        localStorage.setItem(
            "movimientos",
            JSON.stringify(movimientos)
        );

        $("#saldoActual").text(
            "$" + saldo.toLocaleString("es-CL")
        );

        $("#transferMessage")
        .removeClass("d-none")
        .text(
            `Transferencia realizada a ${contacto} por $${monto.toLocaleString("es-CL")}`
        );

        $("#alertContainer").html(`
            <div class="alert alert-success">
                Transferencia realizada correctamente.
            </div>
        `);

        $("#transferForm")[0].reset();

        setTimeout(function () {

            window.location.href =
            "menu.html";

        }, 2000);

    });

});