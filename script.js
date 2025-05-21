let partes = [];
let actual = 0;
let totalPuntos = 0;
let audioControl = null;

const libros = {
    leo: {
        titulo: "Leo y la estrella perdida",
        partes: [
            { texto: "En lo más profundo del bosque vivía Leo, un león muy curioso...", imagen: "leon.png", sonido: "bosque.mp3", loop: true },
            { texto: "Una noche, una estrella brillante cayó del cielo...", imagen: "estrella.gif", sonido: "estrella.mp3", loop: false },
            { texto: "Leo intentó tocarla, pero la estrella flotó hacia arriba...", imagen: "estrella.gif", sonido: "estrella.mp3", loop: false },
            { texto: "Leo llamó a sus amigos: Tina, Martín y Lía...", imagen: "leon.png", sonido: "bosque.mp3", loop: true },
            { texto: "Lanzaron la estrella desde una colina...", imagen: "estrella.gif", sonido: "aplausos.mp3", loop: false },
            { texto: "Esa noche, la estrella apareció otra vez en el cielo...", imagen: "fondo.png", sonido: "final_bien.mp3", loop: false }
        ]
    },
    luna: {
        titulo: "Luna y el secreto del bosque",
        partes: [
            { texto: "Luna, la conejita, encontró un mapa misterioso bajo una hoja...", imagen: "conejo.gif", sonido: "bosque.mp3", loop: true },
            { texto: "Siguió las huellas hasta una cueva escondida...", imagen: "cueva.png", sonido: "cueva.mp3", loop: true },
            { texto: "Allí encontró cristales mágicos que brillaban...", imagen: "cristales.png", sonido: "estrella.mp3", loop: false },
            { texto: "La cueva se iluminó mostrando un camino secreto...", imagen: "camino.png", sonido: "estrella.mp3", loop: false },
            { texto: "Al salir, Luna se sintió más valiente que nunca...", imagen: "conejo.gif", sonido: "final_bien.mp3", loop: false }
        ]
    },
    marina: {
        titulo: "Marina y el delfín brillante",
        partes: [
            { texto: "Marina jugaba en la orilla cuando vio algo brillar en el mar...", imagen: "nina_playa.png", sonido: "cueva.mp3", loop: true },
            { texto: "Un delfín saltó del agua, dejando un rastro de luz...", imagen: "delfin.png", sonido: "cueva.mp3", loop: false },
            { texto: "El delfín la invitó a nadar con él por arrecifes mágicos...", imagen: "arrefice.png", sonido: "estrella.mp3", loop: true },
            { texto: "Juntos encontraron un tesoro escondido en una cueva submarina...", imagen: "tesoro.png", sonido: "estrella.mp3", loop: false },
            { texto: "Desde entonces, Marina sueña con aventuras en el mar...", imagen: "nina_playa.png", sonido: "final_bien.mp3", loop: false }
        ]
    }
};

function cargarLibro(clave) {
    partes = libros[clave].partes;
    document.getElementById("titulo-libro").textContent = libros[clave].titulo;
    document.getElementById("seleccion-libro").style.display = "none";
    document.getElementById("contenedor-cuento").style.display = "block";
    audioControl = document.getElementById("audioControl");
    actual = 0;
    totalPuntos = 0;
    mostrarParte();
}

function mostrarParte() {
    const parte = partes[actual];
    document.getElementById("texto").textContent = parte.texto;
    document.getElementById("imagen").src = parte.imagen;

    audioControl.pause();
    audioControl.src = parte.sonido;
    audioControl.loop = !!parte.loop;
    audioControl.currentTime = 0;
    audioControl.play();

    const btn = document.getElementById("siguiente");
    btn.disabled = true;
    setTimeout(() => {
        btn.disabled = false;
    }, 3000);
}

function siguienteParte() {
    actual++;
    if (actual < partes.length) {
        mostrarParte();
    } else {
        terminarCuento();
    }
}

function anotarPuntos(puntos) {
    totalPuntos += puntos;
    alert(`Has dado ${puntos} estrellas`);
}

function terminarCuento() {
    document.getElementById("contenedor-cuento").style.display = "none";
    document.getElementById("final").style.display = "block";
    document.getElementById("puntajeFinal").textContent = `Puntaje total: ${totalPuntos} estrellas`;

    const esBuenResultado = totalPuntos >= 10;
    document.getElementById("mensajeFinal").textContent = esBuenResultado
        ? "¡Excelente lectura! ¡Sigue así!"
        : "¡Buen intento! ¡Puedes mejorar la próxima vez!";

    document.getElementById("gifFinal").src = esBuenResultado ? "felicitaciones.gif" : "animo.gif";

    audioControl.pause();
    audioControl.src = esBuenResultado ? "final_bien.mp3" : "aplausos.mp3";
    audioControl.loop = false;
    audioControl.currentTime = 0;
    audioControl.play();
}

function reiniciarCuento() {
    document.getElementById("final").style.display = "none";
    document.getElementById("seleccion-libro").style.display = "block";
    document.getElementById("contenedor-cuento").style.display = "none";
    audioControl.pause();
    audioControl.currentTime = 0;
}
