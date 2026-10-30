function showPage(id) {
    let pages = document.querySelectorAll(".screen");

    for (let i = 0; i < pages.length; i++) {
        pages[i].classList.add("hidden");
    }

    document.getElementById(id).classList.remove("hidden");
}

// Function to add animation to the elements of the second page

let boton = document.getElementById("button-page1");

boton.addEventListener('click', () => {

    let title = document.querySelector(".page2 h1");
    let paragraph = document.querySelectorAll(".page2 p");
    let list = document.querySelector(".page2 ol");
    let button = document.querySelector(".page2 .button-page2");

    title.classList.add('animation');
    paragraph.forEach((p) => p.classList.add('animation'));
    list.classList.add('animation');
    button.classList.add('animationButton');
});

// Function to add animation to the elements of the third page

let boton2 = document.getElementById("button-pag2");

boton2.addEventListener('click', () => {

    //List of elements of third page
    
    let image = document.getElementById("app-image");
    let cargar = document.querySelector(".loader-container");
    let body = document.body;
    let title = document.getElementById("page3-title");
    let images = document.querySelector(".addImages");
    let button_camera = document.querySelector(".button-camera")
    
    cargar.classList.remove('hidden');
    image.classList.add("hidden");
    images.classList.add('hidden');
    title.classList.add('animation-disappearing');
    button_camera.classList.add('hidden');
    
    //Function to animate loader page

    setInterval(() => {
        if (title.classList.contains('animation-disappearing')) {

            title.classList.remove('animation-disappearing');
            title.classList.add('animation-appearing');
        }
        else{

            title.classList.add('animation-disappearing');
        }
    }, 1000);

    //Function to dissapear loader page and appear third page

    setTimeout(() => {
        
        cargar.classList.add("hidden");
        image.classList.remove("hidden");
        body.classList.add('body-page3-transition');
        images.classList.remove('hidden');
        button_camera.classList.remove('hidden');

    }, 6000);
});

let streamCamara = null;
let bloqueDestino = null; // Almacenará la caja gris (.plus) que capturará la foto

const btnCamara = document.getElementById('btn-camera');
const btnPistas = document.getElementById('btn-pistas');
const btnPuzzle = document.getElementById('btn-puzzle');

// Configuration to force front of camera in phone
const opcionesCamara = { video: { facingMode: "user" }, audio: false };

// 1. Permissions of camera
btnCamara.addEventListener('click', async () => {
    try {
        // Alert to camera permissions in android
        const streamTemporal = await navigator.mediaDevices.getUserMedia(opcionesCamara);
        
        // Accept permissions: Apagamos el hardware inmediatamente
        streamTemporal.getTracks().forEach(track => track.stop());

        // Activamos únicamente el botón de pistas (removiendo el estado inactivo)
        btnPistas.classList.remove('inactive-button');
        
        btnCamara.textContent = "✓ Permiso concedido";

    } catch (error) {
        alert("Debes aceptar los permisos para poder usar la cámara.");
    }
});

// 2. Function to switch on frontal camera inside the .plus block
async function encenderCamaraEnBloque(evento) {
    // Localizamos el contenedor gris .plus en el que se hizo click (Añadir pistas)
    bloqueDestino = evento.target.closest('.plus');

    try {
        streamCamara = await navigator.mediaDevices.getUserMedia(opcionesCamara);
        
        // Limpiamos por completo el signo '+' y el botón interno para meter el video en vivo
        bloqueDestino.innerHTML = `
            <div class="camara-box">
                <video id="stream-vivo" autoplay playsinline></video>
                <div class="btn-disparo" id="disparador-foto">📸 Foto</div>
            </div>
        `;

        // Pasamos la señal del stream al reproductor de video recién creado
        const videoElement = document.getElementById('stream-vivo');
        videoElement.srcObject = streamCamara;

        // Asignamos la acción al nuevo botón flotante de disparo
        document.getElementById('disparador-foto').addEventListener('click', capturarFotograma);

    } catch (error) {
        alert("No se pudo conectar a la cámara frontal.");
    }
}

// 3. Function to freeze frame (take photo) and close camera
function capturarFotograma() {
    const videoElement = document.getElementById('stream-vivo');
    
    const canvasVirtual = document.createElement('canvas');
    canvasVirtual.width = videoElement.videoWidth;
    canvasVirtual.height = videoElement.videoHeight;
    
    const contexto = canvasVirtual.getContext('2d');
    
    contexto.translate(canvasVirtual.width, 0);
    contexto.scale(-1, 1);
    contexto.drawImage(videoElement, 0, 0, canvasVirtual.width, canvasVirtual.height);
    
    const fotoTemporalUrl = canvasVirtual.toDataURL('image/jpeg');

    if (streamCamara) {
        streamCamara.getTracks().forEach(track => track.stop());
    }
    bloqueDestino.innerHTML = `<img src="${fotoTemporalUrl}" class="foto-resultado" alt="Captura Murdoku">`;
}

// 4. Assign button action only to btnPistas
btnPistas.addEventListener('click', (e) => {
    if (!btnPistas.classList.contains('inactive-button')) {
        encenderCamaraEnBloque(e);
    }
});