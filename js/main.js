// Maneja el tipo

var selectTipo = document.getElementById("tipo")
selectTipo.addEventListener('change', actualizarRol)

function actualizarPlantilla(idElemento, datos) {
    const elemento = document.getElementById(idElemento);
    const plantilla = Handlebars.compile(elemento.innerHTML);
    elemento.innerHTML = plantilla(datos);
}

function actualizarRol() {
    datos = {
        tipo: "año",
        roles: ["2020", "2019", "2018", "2017", "2016"]
    }

    actualizarPlantilla('especificarRol', datos);
}

actualizarRol();