
document.addEventListener('DOMContentLoaded', init, false);

function init() {
    var request = new XMLHttpRequest()
    request.open("GET", "https://cc.agucova.me/consejo/generacional/")


    request.onload = function () {
        var data = JSON.parse(this.response)
        if (request.status >= 200 && request.status < 400) {
            window.datos = data;
            var selectTipo = document.getElementById("tipo");
            var selectRol = document.getElementById("rol");

            actualizarRol();

        } else {
            console.log('No se pudo contactar la API de Consejos Transparentes.')
        }
    }

    request.send()
}


function remove_duplicates(arr) {
    var obj = {};
    var ret_arr = [];
    for (var i = 0; i < arr.length; i++) {
        obj[arr[i]] = true;
    }
    for (var key in obj) {
        ret_arr.push(key);
    }
    return ret_arr;
}

function actualizarPlantilla(origenId, salidaId, datos) {
    const origen = document.getElementById(origenId).innerHTML;
    var salida = document.getElementById(salidaId);

    // Optimize, compilation should only occur once
    var plantilla = Handlebars.compile(origen);

    salida.innerHTML = twemoji.parse(plantilla(datos));

}

function actualizarRol() {
    const tipoRepresentante = document.getElementById("tipo").value;
    const representantesConTipo = datos.filter(representante => representante.tipo == tipoRepresentante);
    var tipo = null;
    var roles = null;

    if (tipoRepresentante == "DG") {
        tipo = "año";
        // Usar Set deduplica los años
        roles = [...new Set(representantesConTipo.map(representante => representante.representa))];
    }
    else if (tipoRepresentante == "CT") {
        tipo: null;
        roles: null
    }

    datosPlantilla = {
        tipo: tipo,
        roles: roles
    }

    actualizarPlantilla('plantilla-rol', 'especificarRol', datosPlantilla);
    mostrarAsistencia();
}

function mostrarAsistencia() {
    console.log(datos);
    const tipoRepresentante = document.getElementById("tipo").value;
    try {
        const rolRepresentante = document.getElementById("rol").value

    } catch (TypeError) {
        const rolRepresentante = "Ingeniería"
    }

    if (tipoRepresentante == "DG") {
        var representantesF = datos.filter(representante => representante.representa == rolRepresentante);
    }
    else {
        var representantesF = datos.filter(representante => representante.tipo == tipoRepresentante);
    }

    console.log(representantesF);

    // Fechas de las sesiones en la que figura el primero, asume que todos en la lista filtrada fueron a los mismos consejos
    const fechas = representantesF[0].asistencias.map(sesion => sesion.fecha)

    console.log(representantesF);

    representantesP = []
    for (var representante of representantesF) {
        // La lista de "presente", "ausente", "con permiso", etc
        var asistios = representante.asistencias.map(sesion => sesion.asistio.replace("P", "✅").replace("A", "❌").replace("O", "📃").replace("J", "⚖"))
        // Juntar el nombre con la lista y meter en representantesP
        representantesP.push([representante.nombre].concat(asistios))
    }

    const datosPlantilla = {
        fechas: fechas,
        asistencias: representantesP
    }

    actualizarPlantilla("plantilla-asistencia", "asistencia", datosPlantilla);
}