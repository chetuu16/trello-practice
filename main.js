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

    getChecklists() {
        return this.checklist;
    }

    addChecklist(checklist) {
        this.checklist.push();
    }

    getComentario(index) {
        return this.comentarios[index];
    }

    setComentario(comentario) {
        this.comentarios.push(comentario);
    }
}

class Checklist {
    constructor(id) {
        this.id = id;
        this.title = '';
        this.items = [];
    }

    setTitulo(title) {
        this.title = title;
    }

    getTitulo() {
        return this.title;
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
let checklistActual;

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
const btnChecklist = document.getElementById('btnChecklist');
const btnFecha = document.getElementById('btnFecha');
const btnEliminar = document.getElementById('btnEliminar');

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

//Functiones tarea abierta
descripcionTareaActiva.onblur = function () {
    tareaPresionada.setDescripcion(descripcionTareaActiva.value);
}

descripcionTareaActiva.onblur = function () {
    tareaPresionada.setDescripcion(descripcionTareaActiva.value);
}

//Botones tarea abierta
btnChecklist.onclick = function () {
    let checklist = new Checklist(new Date().getTime());
    checklistActual = checklist;

    let divChecklist = document.getElementById('divChecklist');
    console.log(divChecklist);
    let titleListadoChecklist;
    if (divChecklist.childElementCount <= 0) {
        titleListadoChecklist = crearP();
        titleListadoChecklist.innerText = "Checklist";
        divChecklist.appendChild(titleListadoChecklist);
    }

    let listadoChecklist = crearDiv();
    listadoChecklist.id = 'listadoChecklist';

    let checklistItem = crearDiv();
    checklistItem.id = 'checklist' + divChecklist.childElementCount;
    checklistItem.className = 'focus';

    let cabeceraChecklist = crearDiv();
    cabeceraChecklist.className = 'cabeceraChecklist';

    let tituloChecklist = crearInput();
    tituloChecklist.setAttribute('placeholder', 'Escribe título…');
    tituloChecklist.addEventListener('keyup', event => {
        if (event.keyCode === 13) {
            comprobarTitulo(tituloChecklist);
        }
    })
    tituloChecklist.addEventListener('blur', () => {
        comprobarTitulo(tituloChecklist);
    });

    let btnBasura = document.createElement('i');
    btnBasura.classList.add('fas', 'fa-trash');
    btnBasura.addEventListener('click', () => {
        borrarChecklist();
    });

    cabeceraChecklist.appendChild(tituloChecklist);
    cabeceraChecklist.appendChild(btnBasura);

    let addNewItem = crearDiv();
    addNewItem.id = 'addNewItem';

    let newItemIcon = document.createElement('i');
    newItemIcon.classList.add('fas', 'fa-plus');

    let newItemText = crearInput();
    newItemText.setAttribute('type', 'text');
    newItemText.setAttribute('placeholder', 'Escribe algo...');

    addNewItem.appendChild(newItemIcon);
    addNewItem.appendChild(newItemText);

    checklistItem.appendChild(cabeceraChecklist);
    checklistItem.appendChild(addNewItem);

    listadoChecklist.appendChild(checklistItem);

    divChecklist.appendChild(listadoChecklist);
    tituloChecklist.focus();

    function comprobarTitulo(tituloChecklist) {
        if ((tituloChecklist.value === '') || (tituloChecklist.value === 'Escribe título…')) {
            if (checklistActual.getTitulo() === '') {
                borrarChecklist();
            } else {
                console.log(checklistActual.getTitulo() + " titulo");
                tituloChecklist.value = checklistActual.getTitulo();
            }
        } else {
            checklistActual.setTitulo(tituloChecklist.value);
        }
        console.log(checklistActual);
    }

    function borrarChecklist() {
        listadoChecklist.removeChild(checklistItem);
        divChecklist.removeChild(listadoChecklist);

        if (divChecklist.childElementCount <= 1) {
            if (titleListadoChecklist !== null) {
                divChecklist.removeChild(titleListadoChecklist);
            }
        }
    }
}

btnCerrar.onclick = function () {
    refrescarDatos(listaPresionada, tareaPresionada);
    tareaAbierta.style.display = 'none';
}

document.onclick = function (e) {
    if ((e.target.id === 'listas') && (tareaAbierta.style.display === 'block')) {
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

function crearElementos(article, lista, tarea) {
    //Creamos el icono de la descripcion
    crearElementoDescripcion(article, lista, tarea);
}

function crearElementoDescripcion(article, lista, tarea) {

    let divDescripcion = crearDiv();
    divDescripcion.id = 'description';

    let imageDescripcion = document.createElement('i');
    imageDescripcion.classList.add('fas');
    imageDescripcion.classList.add('fa-bars');

    let divAvisos = crearDiv();
    divAvisos.className = 'avisosTareas';

    if (tarea.getDescripcion() !== '') {
        //Tiene descripción
        if (article.querySelector('.avisosTareas') === null) {
            //No tiene el elemento creado

            article.appendChild(divAvisos);
        }

        if (article.querySelector('description') === null) {
            //No tiene el elemento de descripción creado
            divDescripcion.appendChild(imageDescripcion);
            divAvisos.appendChild(divDescripcion);
        }
    } else {
        eliminarDivElementos(article);
    }
}

function eliminarDivElementos(article) {
    console.log(article);
    if (article.childNodes[1] !== null) {
        //Existe el div de elementos
        let avisosDiv = article.childNodes[1];
        console.log(avisosDiv, article.childNodes[1]);
        if (avisosDiv !== undefined) {
            //Controlamos si tenemos el bloque de descripción
            let bloqueDescripcion = avisosDiv.childNodes[0];
            if (bloqueDescripcion !== null) {
                avisosDiv.removeChild(bloqueDescripcion);
            }

            //Controlamos si tenemos el bloque de checklist

            //Controlamos si tenemos el bloque de fecha

            //Controlamos si tenemos el bloque de comentarios
            if (avisosDiv.childElementCount <= 0) {
                article.removeChild(avisosDiv);
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
    crearElementos(element, lista, tarea);
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

function crearP() {
    return document.createElement('p');
}

function crearInput() {
    return document.createElement('input');
}