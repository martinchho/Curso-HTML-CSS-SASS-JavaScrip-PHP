const { src, dest, watch, parallel } = require("gulp"); //Require nos permite extraer a la dependencia "Gulp"

//CSS
const sass = require("gulp-sass")(require("sass")); //Importamos SASS y Gulp-SASS
const plumber = require("GULP-plumber"); //Importamos plumber, para no tener problemas con sintaxis CSS
const autoprefixer = require("autoprefixer"); //Importamos el paquete de autoprefixer, ayuda con compatibilidad de navegadores
const cssnano = require("cssnano"); //Importamos el paquete de cssnano, comprime el css
const postcss = require("gulp-postcss"); //Importamos el paquete de postcss, hace algunos arreglos al css
const sourcemaps = require("gulp-sourcemaps"); //Importamos el paquete de sourcemaps, para poder leer correctamente el codigo css


//src: sirve para identificar donde esta un archivo
//dest: sirve para guardar el archivo


//Imagenes
const cache = require('gulp-cache');
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const avif = require('gulp-avif');


//pipe: una accion que se realiza despues de otra
function css(done) {
    src("src/scss/**/*.scss")    //Identificar el archivo SASS
        .pipe(sourcemaps.init()) //Inicializa el sourcemaps
        .pipe( plumber() ) //Gracias a esta funcion no detiene nuestro WorkFlow al cometer un error
        .pipe( sass() )  //Compilar SASS a CSS
        .pipe( postcss( [ autoprefixer(), cssnano() ] ) ) //corremos las librerias que importamos
        .pipe( sourcemaps.write('.') ) //ubicacion en donde se va a guardar //el punto indica la misma ubicacion de la hoja de estilos de CSS


    done(); //Callback que avisa a gulp cuando llegamos al final

}

function imagenes ( done ) {
    const opciones = {
        optimizationLevel: 3
    }

    src('src/img/**/*.{png, jpg}')
        .pipe(cache (imagemin (opciones) ) )
        .pipe( dest ('build/img') )
    done();
}

function versionWebp( done ) {
    const opciones = {
        quality: 50
    };

    src('src/img/**/*.{png, jpg}')
        .pipe(webp(opciones))
        .pipe(dest("build/img"))

    done();
}

function versionAvif( done ) {
    const opciones = {
        quality: 50
    };

    src('src/img/**/*.{png, jpg}')
        .pipe(avif(opciones))
        .pipe(dest("build/img"))

    done();
}

function javascript( done ) {
    src('src/js/**/*.js') //ubicar todos los archivos de javascript en esa carpeta señalada
        .pipe(dest('build/js'));

    done();
}


function dev(done){
    watch("src/scss/**/*.scss", css); //sirve para auto compilar //a su vez, los * indican que se van a compilar al guardar 
                                     //cada uno de los archivos, mientras se encuentren almacenados en la direccion indicada por el watch 
    watch("src/js/**/*.js", javascript); //cuando mandemos a escuchar dev, tambien se aplique al javascript
    done();
}


exports.css = css; //manda a llamar a la funcion css()
exports.js = javascript;
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;
exports.dev = parallel( imagenes, versionWebp, versionAvif, javascript, dev); //parallel: ejecuta ambas en paralelo, es decir al mismo tiempo
