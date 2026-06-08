$(document).ready(function () {

    function mostrarMovimientos(filtro = "Todos") {

        const movimientos =
        JSON.parse(
            localStorage.getItem("movimientos")
        ) || [];

        $("#transactionsBody").html("");

        let ingresos = 0;
        let egresos = 0;

        let listaFiltrada =
        movimientos;

        if (filtro !== "Todos") {

            listaFiltrada =
            movimientos.filter(function (mov) {

                return mov.tipo === filtro;

            });

        }

        if (listaFiltrada.length === 0) {

            $("#transactionsBody").html(`
                <tr>
                    <td colspan="4" class="text-center">
                        No existen movimientos.
                    </td>
                </tr>
            `);

        }

        listaFiltrada.forEach(function (movimiento) {

            let icono = "";
            let claseMonto = "";

            if (movimiento.tipo === "Depósito") {

                icono =
                '<i class="bi bi-cash-stack text-success"></i>';

                claseMonto = "text-success fw-bold";

                ingresos +=
                Number(movimiento.monto);

            } else {

                icono =
                '<i class="bi bi-send-fill text-danger"></i>';

                claseMonto = "text-danger fw-bold";

                egresos +=
                Number(movimiento.monto);

            }

            $("#transactionsBody").append(`

                <tr>

                    <td>
                        ${icono}
                        ${movimiento.tipo}
                    </td>

                    <td>
                        ${movimiento.descripcion}
                    </td>

                    <td>
                        ${movimiento.fecha}
                    </td>

                    <td class="${claseMonto}">
                        $${Number(
                            movimiento.monto
                        ).toLocaleString("es-CL")}
                    </td>

                </tr>

            `);

        });

        $("#totalIngresos").text(
            "$" +
            ingresos.toLocaleString("es-CL")
        );

        $("#totalEgresos").text(
            "$" +
            egresos.toLocaleString("es-CL")
        );

    }

    mostrarMovimientos();

    $("#filtroMovimientos").change(function () {

        mostrarMovimientos(
            $(this).val()
        );

    });

});