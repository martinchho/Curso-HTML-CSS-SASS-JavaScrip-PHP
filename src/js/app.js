document.addEventListener('DOMContentLoaded', function(){
    iniciarApp();
    
})



function iniciarApp() {
    navegacionFija();
    crearGaleria();
    scrollNav();
}

function navegacionFija () {
    const barra = document.querySelector('.header'); //seleccionamos la clase de header
    const sobreFestival = document.querySelector ('.sobre-festival'); //seleccionamos la clase sobre-festival, que a partir de este elemento, se vera el header
    const body = document.querySelector('body'); //seleccionamos el body

    window.addEventListener('scroll', function() { //escuchamos por el scroll y una funcion callback
        if( sobreFestival.getBoundingClientRect().bottom < 0 ){ //la funcion sirve para saber si ya nos pasamos o no el elemento al que queremos apuntar
            barra.classList.add('fijo'); //si pasamos, añadimos el header
            body.classList.add('body-scroll');
        } else {
            barra.classList.remove('fijo'); //si no nos pasamos, lo quitamos
            body.classList.remove('body-scroll');
        }
    });
}

function crearGaleria() {
    const galeria = document.querySelector('.galeria-imagenes');

    for(let i = 1; i <= 12; i++) {
        const imagen = document.createElement ('picture');
        imagen.innerHTML = `
            <source srcset="build/img/thumb/${i}.avif" type="image/avif">
            <source srcset="build/img/thumb/${i}.webp" type="image/webp">
            <img loading="lazy" width="200" height="300" src="build/img/thumb/${i}.jpg" alt="imagen galeria">`;

        imagen.onclick = function() {
            mostrarImagen(i);
        }

        galeria.appendChild(imagen);
    }
}


function scrollNav() {      //selecciona todos a la vez           
    const enlaces = document.querySelectorAll('.navegacion-principal a'); //seleccionamos todos los enlaces para el smoothscroll
    enlaces.forEach( enlace => { //iteramos por cada enlace
        enlace.addEventListener( 'click', function( e ) {
            e.preventDefault(); //prevenimos el scroll por default que trae el #id

            const seccionScroll = e.target.attributes.href.value; //pasa el valor del href para posicionarnos en el mismo
            const seccion = document.querySelector(seccionScroll); //creamos la variable para el scroll
            seccion.scrollIntoView( { behavior: 'smooth' } ); //ponemos el scroll en modo smooth
        })
    })
}


function mostrarImagen(id) {
    const imagen = document.createElement ( 'picture');
    imagen.innerHTML = `
            <source srcset="build/img/grande/${id}.avif" type="image/avif">
            <source srcset="build/img/grande/${id}.webp" type="image/webp">
            <img loading="lazy" width="200" height="300" src="build/img/grande/${id}.jpg" alt="imagen galeria">`;

    //crear el Overlay con la imagen
    const overlay = document.createElement('DIV'); //creamos elemento HTML
    overlay.appendChild(imagen); //aplicamos la imagen a ese elemento
    overlay.classList.add('overlay'); //clase de css
    overlay.onclick = function() { //esta funcion sirve para apretar en cualquier parte de la pantalla para poder cerrar la imagen
        const body = document.querySelector('body'); //seleccionamos el body del HTML mediante querySelector
        body.classList.remove('fijar-body'); //removemos el unscroll, mientras este la imagen en modo normal
        overlay.remove(); //al dar click, quita la imagen de la pantalla
    }

    //Boton para cerral el Modal
    const cerrarModal = document.createElement('P');
    cerrarModal.textContent = 'X';
    cerrarModal.classList.add('btn-cerrar');
    cerrarModal.onclick = function() {
        const body = document.querySelector('body'); //seleccionamos el body del HTML mediante querySelector
        body.classList.remove('fijar-body'); //removemos el unscroll, mientras este la imagen en modo normal
        overlay.remove(); //al dar click, quita la imagen de la pantalla
    }
    overlay.appendChild(cerrarModal);

    //Añadirlo al HTML
    const body = document.querySelector('body'); //seleccionamos el body del HTML mediante querySelector
    body.appendChild(overlay);
    body.classList.add('fijar-body');
}