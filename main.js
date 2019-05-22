//# CLASES #

class Lista {
    constructor() {
        this.tareas = [];
    }
    getTareas() {
        return this.tareas;
    }
    setTarea(tarea) {
        this.tareas.push(tarea);
    }
}

class Tarea {
    constructor(id) {
        this.id = id;
        this.titulo = '';
        this.descripcion = '';
        this.fecha = '';
        this.checklist = [];
        this.comentarios = [];
    }
    getTitulo() {
        return this.titulo;
    }

    setTitulo(titulo) {
        this.titulo = titulo;
    }

    getDescripcion() {
        return this.descripcion;
    }

    setDescripcion(descripcion) {
        this.descripcion = descripcion;
    }

    getFecha() {
        return this.fecha;
    }

    setFecha(fecha) {
        this.fecha = fecha
    }

    getChecklist(index) {
        return this.checklist[index];
    }

    setChecklist(titulo) {
        this.checklist.push(new Checklist(titulo));
    }

    getComentario(index) {
        return this.comentarios[index];
    }

    setComentario(comentario) {
        this.comentarios.push(comentario);
    }
}

class Checklist {
    constructor(id, title) {
        this.id = id;
        this.title = title;
        this.items = [];
    }

    addItem(item) {
        this.item.push(item);
    }
}

class Comentario {
    constructor(comentario) {
        this.comentario = comentario;
        this.hora = today
    }

    getFecha() {
        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        let yyyy = today.getFullYear();

        today = mm + '/' + dd + '/' + yyyy;
        return today;
    }
}

//# Variables #
let tareaPresionada;

//# Listas #
const listaToDo = new Lista();
const listaDoing = new Lista();
const listaWaiting = new Lista();
const listaDone = new Lista();

//# Botones #
const todoList = document.getElementById('todoList');
const doingList = document.getElementById('doingList');
const waitingList = document.getElementById('waitingList');
const doneList = document.getElementById('doneList');

const newItemTodo = document.getElementById('newItemTodo');
const newItemdoing = document.getElementById('newItemDoing');
const newItemWaiting = document.getElementById('newItemWaiting');
const newItemDone = document.getElementById('newItemDone');

const tareaAbierta = document.getElementById('tareaAbierta');//Tarea abierta
const btnCerrar = document.getElementById('btnCerrar'); //Boton cerrar de la tarea

const tituloTareaActiva = document.getElementById('tituloTareaActiva');
const descripcionTareaActiva = document.getElementById('descripcion');

//# Funciones de botones #
newItemTodo.onclick = function () {
    nuevaTarea(listaToDo, todoList, newItemTodo);
}

newItemDoing.onclick = function () {
    nuevaTarea(listaDoing, doingList, newItemDoing);
}

newItemWaiting.onclick = function () {
    nuevaTarea(listaWaiting, waitingList, newItemWaiting);
}

newItemDone.onclick = function () {
    nuevaTarea(listaDone, doneList, newItemDone);
}

btnCerrar.onclick = function () {
    refrescarDatos();
    tareaAbierta.style.display = 'none';
}

document.onclick = function (e) {
    if (e.target.id == 'listas') {
        refrescarDatos();
        tareaAbierta.style.display = 'none';
    }
};

//########## Funciones generales  ###################\\
function nuevaTarea(objLista, lista, newBtn) {
    console.log(lista.childElementCount);
    //Creamos la tarea
    let tarea = new Tarea(lista.childElementCount - 1);
    console.log('Tarea creada: ' + tarea);

    //Creamos el articulo
    let article = crearArticle();
    article.id = 'tarea' + tarea.id;

    let divTitulo = crearDiv();
    divTitulo.className = 'tituloTarea';

    let tituloTarea = crearH3();
    tituloTarea.setAttribute('contenteditable', true);

    //Controladores
    article.addEventListener('click', () => {
        //Item que pulsamos: tarea.id
        //Lista en la que estamos: objLista
        console.log(objLista);
        if (tarea.getTitulo() !== '') {
            console.log(objLista.getTareas()[tarea.id]);
            rellenarDatos(objLista.getTareas()[tarea.id]);
            tareaAbierta.style.display = "block";
            tareaAbierta.focus();
        }
    });

    tituloTarea.addEventListener('keypress', event => {
        if (event.keyCode === 13) {
            tituloTarea.removeAttribute('contenteditable');
            tituloTarea.blur();
        }
    });
    tituloTarea.addEventListener('blur', () => {
        console.log(tituloTarea.innerText);
        if (tituloTarea.innerText === '') {
            lista.removeChild(article);
        } else {
            tarea.setTitulo(tituloTarea.innerText);
            tituloTarea.removeAttribute('contenteditable');
            objLista.setTarea(tarea);
        }
    });

    //Añadimos los elementos a la lista
    divTitulo.appendChild(tituloTarea);
    article.appendChild(divTitulo);
    lista.insertBefore(article, newBtn);

    tituloTarea.focus();
}

function crearElementos(article, tarea) {
    //Creamos el icono de la descripcion
    if (tarea.getDescripcion() !== '') {
        if (article.querySelector('.avisosTareas') === null) {

            if (article.querySelector('description') === null) {

                let divAvisos = crearDiv();
                divAvisos.className = 'avisosTareas';

                let divDescripcion = crearDiv();
                divDescripcion.id = 'description';

                let imageDescripcion = document.createElement('i');
                imageDescripcion.classList.add('fas');
                imageDescripcion.classList.add('fa-bars');

                divDescripcion.appendChild(imageDescripcion);
                divAvisos.appendChild(divDescripcion);
                article.appendChild(divAvisos);
            }
        }
    } else {
        let divAvisos = document.querySelector('.avisosTareas');
        let divDescripcion = document.querySelector('#description');
        console.log(divDescripcion === null);
        console.log(divDescripcion);
        console.log(divAvisos === null);
        console.log(divAvisos);
        if ((divDescripcion !== null) || (divAvisos !== null)) {
            divAvisos.removeChild(divDescripcion);
        }
    }

    if (true) {

    }
}

function rellenarDatos(tarea) {
    tituloTareaActiva.innerText = tarea.getTitulo();
    tituloTareaActiva.addEventListener('blur', () => {
        if (tituloTareaActiva.innerText !== '') {
            tarea.setTitulo(tituloTareaActiva.innerText);
        }
    });

    descripcionTareaActiva.innerText = tarea.getDescripcion();
    descripcionTareaActiva.addEventListener('blur', () => {
        tarea.setDescripcion(descripcionTareaActiva.value);
    });
}

function refrescarDatos() {
    for (let tarea of listaToDo.getTareas()) {
        let element = document.getElementById('tarea' + tarea.id);
        element.firstChild.firstChild.innerText = tarea.getTitulo();
        crearElementos(element, tarea);
    }
}

//#### Funciones de creaciones ####
function crearDiv() {
    return document.createElement('div');
}

function crearArticle() {
    return document.createElement('article');
}

function crearH3() {
    return document.createElement('h3');
}