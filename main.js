//# CLASES #

class Lista {
    constructor(id) {
        this.id = id;
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
let listaPresionada;

//# Listas #
const listaToDo = new Lista(1);
const listaDoing = new Lista(2);
const listaWaiting = new Lista(3);
const listaDone = new Lista(4);

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

//------ Tarea Abierta ----------------
tituloTareaActiva.onblur = function () {
    if (tituloTareaActiva.innerText !== '') {
        tareaPresionada.setTitulo(tituloTareaActiva.innerText);
    }
}

descripcionTareaActiva.onblur = function () {
    tareaPresionada.setDescripcion(descripcionTareaActiva.value);
}

descripcionTareaActiva.onblur = function () {
    tareaPresionada.setDescripcion(descripcionTareaActiva.value);
}

btnCerrar.onclick = function () {

}

document.onclick = function (e) {
    if ((e.target.id == 'listas') && (tareaAbierta.style.display === 'block')) {
        refrescarDatos(listaPresionada, tareaPresionada);
        tareaAbierta.style.display = 'none';
    }
};

//########## Funciones generales  ###################\\
function nuevaTarea(objLista, lista, newBtn) {
    //Creamos la tarea
    let tarea = new Tarea(lista.childElementCount - 1);

    //Creamos el articulo
    let article = crearArticle();
    article.id = 'tarea' + tarea.id + '_on' + objLista.id;

    let divTitulo = crearDiv();
    divTitulo.className = 'tituloTarea';

    let tituloTarea = crearH3();
    tituloTarea.setAttribute('contenteditable', true);

    //Controladores
    article.addEventListener('click', () => {
        if (tarea.getTitulo() !== '') {
            rellenarDatos(objLista.getTareas()[tarea.id]);
            tareaPresionada = objLista.getTareas()[tarea.id];
            listaPresionada = objLista;
            tareaAbierta.style.display = "block";
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
        if ((divDescripcion !== null) && (divAvisos !== null)) {
            divAvisos.removeChild(divDescripcion);
            if (divAvisos.childElementCount === 0) {
                article.removeChild(divAvisos);
            }
        }
    }
}

function rellenarDatos(tarea) {
    tituloTareaActiva.innerText = tarea.getTitulo();

    descripcionTareaActiva.value = tarea.getDescripcion();

}

function refrescarDatos(lista, tarea) {

    console.log(lista, tarea);
    let element = document.getElementById('tarea' + tarea.id + '_on' + lista.id);
    console.log(element);
    element.firstChild.firstChild.innerText = tarea.getTitulo();
    listaPresionada = null;
    tareaPresionada = null;
    crearElementos(element, tarea);
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