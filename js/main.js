var request = new XMLHttpRequest()

request.open("GET", "http://127.0.0.1:8000/consejo/generacional/")
request.onload = function () {
    var data = JSON.parse(this.response)

    if (request.status >= 200 && request.status < 400) {
        window.datos = data
        var selectTipo = document.getElementById("tipo")
        var selectRol = document.getElementById("rol")
        selectTipo.addEventListener('change', actualizarRol)
        selectRol.addEventListener('change', mostrarAsistencia)
        mostrarAsistencia();
    } else {
        console.log('No se pudo contactar la API de Consejos Transparentes.')
    }
}
request.send()


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

function actualizarPlantilla(idElemento, datos) {
    const elemento = document.getElementById(idElemento);
    const plantilla = Handlebars.compile(elemento.innerHTML);
    elemento.innerHTML = plantilla(datos);
}

function actualizarRol() {
    console.log("actualizarRol");
    const tipoRepresentante = document.getElementById("tipo").value;
    const representantesConTipo = datos.filter(representante => representante.tipo == tipoRepresentante);
    var tipo = null;
    var roles = null;

    if (tipoRepresentante == "DG") {
        tipo = "año";
        // Usar Set deduplica los años
        roles = [...new Set(representantesConTipo.map(representante => representante.representa))];
    }

    datosPlantilla = {
        tipo: tipo,
        roles: roles
    }

    actualizarPlantilla('especificarRol', datosPlantilla);
    mostrarAsistencia();
}

function mostrarAsistencia() {
    console.log("mostrarAsistencia");
    const tipoRepresentante = document.getElementById("tipo").value;
    const rolRepresentante = document.getElementById("rol").value;
    console.log(rolRepresentante);
    const representantesF = datos.filter(representante => representante.representa == rolRepresentante);
    console.log(representantesF);
    representantesF.forEach(representante => function () {
        console.log(representante.nombre);
        console.log(representante.asistencias);
    })
}