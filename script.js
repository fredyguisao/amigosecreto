let participantes = [];
let resultadoSorteo = {};

function agregarParticipante() {
    let nombre = document.getElementById("nombre").value.trim();
    
    if (nombre === "" || participantes.includes(nombre)) {
        alert("Nombre inválido o ya agregado.");
        return;
    }
    
    participantes.push(nombre);
    document.getElementById("nombre").value = "";
    actualizarLista();
}

function actualizarLista() {
    let lista = document.getElementById("lista-participantes");
    lista.innerHTML = "";
    participantes.forEach(nombre => {
        let li = document.createElement("li");
        li.textContent = nombre;
        lista.appendChild(li);
    });
}

function sortearAmigoSecreto() {
    if (participantes.length < 2) {
        alert("Debe haber al menos 2 participantes.");
        return;
    }

    let copiaParticipantes = [...participantes];
    let asignaciones = {};

    participantes.forEach(persona => {
        let posibles = copiaParticipantes.filter(p => p !== persona);
        
        if (posibles.length === 0) {
            alert("Error en el sorteo. Intenta de nuevo.");
            return;
        }

        let elegido = posibles[Math.floor(Math.random() * posibles.length)];
        asignaciones[persona] = elegido;
        copiaParticipantes.splice(copiaParticipantes.indexOf(elegido), 1);
    });

    resultadoSorteo = asignaciones;
    alert("¡Sorteo completado! Ahora cada uno puede consultar a quién le tocó.");
}

function consultarAmigoSecreto() {
    let nombre = document.getElementById("consulta-nombre").value.trim();
    
    if (resultadoSorteo[nombre]) {
        document.getElementById("resultado").textContent = ` ${nombre}, tu amigo secreto es: ${resultadoSorteo[nombre]}`;
    } else {
        document.getElementById("resultado").textContent = "Nombre no encontrado o sorteo no realizado.";
    }
}
