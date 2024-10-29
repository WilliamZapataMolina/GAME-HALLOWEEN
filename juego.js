// Inicialización de variables
let tarjetasDestapadas = 0;
let tarjeta1 = null;
let tarjeta2 = null;
let primerResultado = null;
let segundoResultado = null;
let movimientos = 0;
let aciertos = 0;
let temporizador = false;
let timer = 50;
let timerInicial = timer;

// Apuntando a documento HTML
let mostrarMovimientos = document.getElementById('movimientos');
let mostrarAciertos = document.getElementById('aciertos');
let mostrarTiempo = document.getElementById('t_restante');

// Generación de imágenes aleatorias
let imagenes = [
    "/IMAGES/img1.jpeg", "/IMAGES/img1.jpeg",
    "/IMAGES/img2.jpeg", "/IMAGES/img2.jpeg",
    "/IMAGES/img3.jpeg", "/IMAGES/img3.jpeg",
    "/IMAGES/img4.jpeg", "/IMAGES/img4.jpeg",
    "/IMAGES/img5.jpeg", "/IMAGES/img5.jpeg",
    "/IMAGES/img6.jpeg", "/IMAGES/img6.jpeg",
    "/IMAGES/img7.jpeg", "/IMAGES/img7.jpeg",
    "/IMAGES/img8.jpeg", "/IMAGES/img8.jpeg"
];
imagenes = imagenes.sort(() => Math.random() - 0.5);
console.log(imagenes);

// Funciones
function contarTiempo() {
    tiempoRegresivo = setInterval(() => {
        timer--;
        mostrarTiempo.innerHTML = `Tiempo ${timer} segundos`;
        if (timer == 0) {
            clearInterval(tiempoRegresivo);
            bloquearTarjetas();
        }
    }, 1000);
}

function bloquearTarjetas() {
    for (let i = 0; i <= 15; i++) {
        let tarjetaBloqueada = document.getElementById(i);
        tarjetaBloqueada.style.backgroundImage = `url(${imagenes[i]})`;
        tarjetaBloqueada.disabled = true;
    }
}

// Función principal
function destapar(id) {
    if (temporizador == false) {
        contarTiempo();
        temporizador = true;
    }

    tarjetasDestapadas++;
    console.log(tarjetasDestapadas);

    if (tarjetasDestapadas == 1) {
        // Mostrar primera imagen
        tarjeta1 = document.getElementById(id);
        primerResultado = imagenes[id];
        tarjeta1.style.backgroundImage = `url(${primerResultado})`;
        tarjeta1.disabled = true;
    } else if (tarjetasDestapadas == 2) {
        // Mostrar segunda imagen
        tarjeta2 = document.getElementById(id);
        segundoResultado = imagenes[id];
        tarjeta2.style.backgroundImage = `url(${segundoResultado})`;
        tarjeta2.disabled = true;

        // Incrementar movimientos
        movimientos++;
        mostrarMovimientos.innerHTML = `Movimientos: ${movimientos}`;

        if (primerResultado == segundoResultado) {
            // Encerrar contador tarjetas destapadas
            tarjetasDestapadas = 0;

            // Aumentar aciertos
            aciertos++;
            mostrarAciertos.innerHTML = `Aciertos: ${aciertos}`;

            if (aciertos == 8) {
                clearInterval(tiempoRegresivo);
                mostrarAciertos.innerHTML = `Aciertos: ${aciertos} 👍`;
                mostrarTiempo.innerHTML = `Increíble, solo tardaste ${timerInicial - timer}"`;
                mostrarMovimientos.innerHTML = `Movimientos: ${movimientos} 🎃`;
                //mostrarVideoFinal();
            }
        } else {
            // Mostrar momentáneamente valores y luego ocultar
            setTimeout(() => {
                tarjeta1.style.backgroundImage = `url("IMAGES/main.jpeg")`;
                tarjeta2.style.backgroundImage = `url("IMAGES/main.jpeg")`;
                tarjeta1.disabled = false;
                tarjeta2.disabled = false;
                tarjetasDestapadas = 0;
            }, 800);
        }
    }
}
function mostrarVideoFinal() {
    const modalVideo = document.getElementById("modal-video");
    modalVideo.style.display = "flex";

    const halloweenVideo = document.getElementById("halloweenVideo");
    halloweenVideo.play();
}