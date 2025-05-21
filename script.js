const partes = [
    {
        texto: "En lo más profundo del bosque vivía Leo, un león muy curioso...",
        imagen: "leon.png",
        sonido: "bosque.mp3",
        loop: true
    },
    {
        texto: "Una noche, una estrella brillante cayó del cielo...",
        imagen: "estrella.gif",
        sonido: "estrella.mp3",
        loop: false
    },
    {
        texto: "Leo intentó tocarla, pero la estrella flotó hacia arriba...",
        imagen: "estrella.gif",
        sonido: "estrella.mp3",
        loop: false
    },
    {
        texto: "Leo llamó a sus amigos: Tina, Martín y Lía...",
        imagen: "leon.png",
        sonido: "bosque.mp3",
        loop: true
    },
    {
        texto: "Lanzaron la estrella desde una colina...",
        imagen: "estrella.gif",
        sonido: "aplausos.mp3",
        loop: false
    },
    {
        texto: "Esa noche, la estrella apareció otra vez en el cielo...",
        imagen: "fondo.png",
        sonido: "final_bien.mp3",
        loop: false
    }
];

let actual = 0;
let totalPuntos = 0;

const audioControl = document.getElementById("audioControl");

function iniciarCuento() {
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

    const esBuenResultado = totalPuntos >= 12;

    document.getElementById("mensajeFinal").textContent = esBuenResultado
        ? "¡Excelente lectura! ¡Sigue así!"
        : "¡Buen intento! ¡Puedes mejorar la próxima vez!";

    document.getElementById("gifFinal").src = esBuenResultado
        ? "felicitaciones.gif"
        : "animo.gif";

    audioControl.pause();
    audioControl.src = esBuenResultado ? "final_bien.mp3" : "aplausos.mp3";
    audioControl.loop = false;
    audioControl.currentTime = 0;
    audioControl.play();
}

function reiniciarCuento() {
    actual = 0;
    totalPuntos = 0;
    document.getElementById("final").style.display = "none";
    document.getElementById("contenedor-cuento").style.display = "block";

    audioControl.pause();
    audioControl.currentTime = 0;

    mostrarParte();
}
