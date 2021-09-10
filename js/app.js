//================ Variables ================
const carrito = document.querySelector('#carrito');
const listaCursos = document.querySelector('#lista-cursos');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito'); 
let articulosCarrito = [];

cargarEventListener();
function cargarEventListener(){
    listaCursos.addEventListener('click', agregarCurso);

    //Elimina los articulos del carrito
    carrito.addEventListener('click', eliminaCurso);

    //vaciar el carrito
    vaciarCarritoBtn.addEventListener('click',() =>{
        articulosCarrito = []; //Reseteamos el arreglo
        limpiarHTML(); //eliminamos todo el html
    });
}

//============ AGREGAR ELEMENTOS AL CARRITO ============
function agregarCurso(e){
    e.preventDefault(); //Prevenimos la accion por default de los enlaces
    if(e.target.classList.contains('agregar-carrito')){
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);
    }
}
//LEE EL CONTENIDO DEL HTML AL QUE LE DIMOS CLICK Y EXTRA LA INFORMACION DEL CURSO
function leerDatosCurso(curso){
    //Crear un objecto con el contenido del curso actual
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('H4').textContent,
        precio: curso.querySelector('.precio SPAN').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1,
    }
    //Revisa si un elemento del carrito ya existe
    const existe = articulosCarrito.some( curso => curso.id === infoCurso.id);
    if(existe){
        //actualizamos la cantidad
        const cursos = articulosCarrito.map(curso =>{
            if(curso.id === infoCurso.id){
                curso.cantidad++;
                return curso; //retorna el objecto actualizado
            }else{
                return curso; //retorna los objetos que no son los duplicados
            }
        });
        articulosCarrito = [...cursos];

    }else{
        //agregamos al carrito
    
        articulosCarrito = [...articulosCarrito, infoCurso]; //Agrega elementos al arreglo de carrito
    }
    carritoHTML();
}
//MUESTRA EL CARRITO DE COMPRAS EN EL HTML
function carritoHTML(){
    //Limpiar el html
    limpiarHTML();
    //Recorre el carrito y genera el html
    articulosCarrito.forEach( curso =>{
        const {imagen, titulo, precio, cantidad, id} = curso; //destructuring
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><img src="${imagen}" width="100"></td>
            <td> ${titulo}</td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td>
                <a href="#" class="borrar-curso" data-id="${id}"> X </a>
            </td>
        `;
    //AGREGA EL HTML DEL CARRITO AL TBODY
    contenedorCarrito.appendChild(row);
    });
}

//Limpia el HTML
function limpiarHTML(){
    //contenedorCarrito.innerHTML = ''; //De esta forma se limpia el html de forma lenta
    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}

//ELIMINA DATOS DEL CURSO
function eliminaCurso(e){
    console.log(e.target.classList);
    if(e.target.classList.contains("borrar-curso")){
        const cursoId = e.target.getAttribute("data-id");
        //elimina del arreglo de articulosCarrito por el data-id
        articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);
        carritoHTML(); //Volvemos a iterar sobre el carrito y mostrar su HTML
    }
}
