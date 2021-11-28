// ELEMENTOS DEL DOM
// AHORRADAS APARTADOS
const paginaPrincipal = document.getElementById("pagina-completa");
const botonAhorradas = document.getElementById("boton-ahorradas");
const botonNavAhorradas = document.getElementById("boton-nav-ahorradas");
// BALANCE                 
const botonBalanceNavbar = document.getElementById("boton-nav-balance");
const seccionBalance = document.getElementById("seccion-balance");
const seccionNuevaOperacion = document.getElementById("seccion-nueva-operacion");
const botonNuevaOperacion = document.getElementById("boton-operacion");
const botonCancelarOperacion = document.getElementById("boton-cancelar-operacion");
const botonAgregarOperacion = document.querySelector("#boton-agregar-operacion");
const formularioOperaciones = document.querySelector("#formulario-operaciones");
const inputDescripcionOperaciones = document.querySelector("#input-descripcion");
const inputMontoOperaciones = document.querySelector("#input-monto");
const selectTipoOperaciones = document.querySelector("#select-tipo-op");
const selectCategoriasOperaciones = document.querySelector("#select-categorias-op");
const inputFechaoperaciones = document.querySelector("#input-fecha");
const operacionesSinResultados = document.querySelector(".operaciones-sin-resultados");
const listadoOperaciones = document.getElementById("listado-nuevas-operaciones");
const seccionListadoOperaciones = document.querySelector(".listado-operaciones");
// CATEGORÍAS
const seccionCategorias = document.getElementById("seccion-categorias");
const listadoDeCategorias = document.getElementById("listado-categorias");
const seccionEditarCategorias = document.getElementById("seccion-editar-categorias");
const botonCategoriasNavbar = document.getElementById("boton-nav-categorias");
const inputEditarCategoria = document.querySelector("#input-edit-categorias");
const botonDeleteCategoria = document.querySelectorAll(".eliminar-categorias");
const inputSeccionCategoria = document.querySelector("#input-categoria");
const botonInputSeccionCategoria = document.querySelector("#boton-agregar-categoria");
const selectCategoriasDeFiltros = document.querySelector("#select-categorias");
const botonAgregarCategoria = document.getElementById("boton-agregar-categoria");
const botonCancelarEditarCategoria = document.getElementById("boton-cancelar-editar-categoria");
const botonConfirmarEditarCategoria = document.getElementById("boton-confirmar-editar-categoria");
const botonesEliminanCategorias = document.querySelectorAll(".eliminar-categorias");

//SECCION REPORTES 
const botonReportesNavbar = document.querySelector("#boton-nav-reportes");
const sinReportes = document.querySelector("#sin-reportes");
const seccionReportesInsuficientes = document.getElementById("seccion-reportes-insuficientes");
const categoriaMayorGanancia = document.getElementById("categoria-mayor-ganancia");
const categoriaMayorGananciaMonto = document.getElementById("categoria-mayor-ganancia-monto");
const categoriaMayorGasto = document.getElementById("categoria-mayor-gasto");
const categoriaMayorGastoMonto = document.getElementById("categoria-mayor-gasto-monto");
const categoriaMayorBalance = document.getElementById("categoria-mayor-balance");
const categoriaMayorBalanceMonto = document.getElementById("categoria-mayor-balance-monto");
const categoriaMesMayorGanancia= document.getElementById("mes-mayor-ganancia");
const categoriaMesMayorGananciaMonto= document.getElementById("mes-mayor-ganancia-monto");
const categoriaMesMayorGasto = document.getElementById("mes-mayor-gasto");
const categoriaMesMayorGastoMonto = document.getElementById("mes-mayor-gasto-monto");

// FILTROS
const formularioFiltros = document.getElementById("formulario-filtros");
const inputDateFiltro = document.querySelector("#input-date");
const botonOcultarFiltros = document.getElementById("boton-cambiar-filtros");
const contenedorFiltros = document.getElementById("cambiar-filtros");
const filtrosTipo = document.getElementById("filtros-tipo");
const selectOrdenarPor = document.querySelector("#ordenar-por");

// Botón AhorrADAs

botonNavAhorradas.onclick = () => {
  seccionBalance.classList.remove("is-hidden");
  seccionCategorias.classList.add("is-hidden");
  seccionReportesInsuficientes.classList.add("is-hidden");
}

// Botones balance

botonBalanceNavbar.onclick = () => {
  seccionBalance.classList.remove("is-hidden");
  seccionCategorias.classList.add("is-hidden");
  seccionReportesInsuficientes.classList.add("is-hidden");
}

// Botones reportes

botonReportesNavbar.onclick = () => {
  seccionReportesInsuficientes.classList.remove("is-hidden");
  seccionBalance.classList.add("is-hidden");
  seccionCategorias.classList.add("is-hidden")
  seccionEditarCategorias.classList.add("is-hidden");
}

// FUNCIONES GENÉRICAS REUTILIZABLES

const modificarClasesBotones = (boton, clase1, clase2) => {
  boton.onclick = () => {
    clase1.classList.add("is-hidden");
    clase2.classList.remove("is-hidden");
  }
}

const aJSONYSubirAlLStorage = (array, clave) => {
  const aJSON = JSON.stringify(array)
  localStorage.setItem(clave, aJSON)
}

const guardarDeLStorage = (array, clave) => {
  const nuevoArray = [localStorage.getItem(clave) || "[]"]
  const parseArray = JSON.parse(nuevoArray)
  const nuevosObjetos = parseArray.map((arr) => {
    return array.push(arr)
  })
  return nuevosObjetos
}

const blanquearFormularios = (form) => {
  form.reset()
}

//  VARIABLES GLOBALES

let categorias = ["Comida", "Servicios", "Salidas", "Educación", "Transporte", "Trabajo"]
let operaciones = []

// NAVEGACIÓN CON BOTONES

botonCategoriasNavbar.onclick = () => {
  seccionCategorias.classList.remove("is-hidden");
  seccionEditarCategorias.classList.add("is-hidden");
  seccionBalance.classList.add("is-hidden");
  seccionNuevaOperacion.classList.add("is-hidden");
  seccionReportesInsuficientes.classList.add("is-hidden");
}

modificarClasesBotones(botonNuevaOperacion, seccionBalance, seccionNuevaOperacion);
modificarClasesBotones(botonCancelarOperacion, seccionNuevaOperacion, seccionBalance);

// CATEGORÍAS 

const subirCategoriasAlLs = (array, clave) => localStorage.getItem(clave) === null && aJSONYSubirAlLStorage(array, clave)

subirCategoriasAlLs(categorias, "categorias")

const pushCategoria = (arr) => {
  arr.push(inputSeccionCategoria.value)
}

botonInputSeccionCategoria.onclick = () => {
  pushCategoria(categorias)
  aJSONYSubirAlLStorage(categorias, "categorias")
  agregarCategoriasAHTML()
}

let nuevasCategorias = []
guardarDeLStorage(nuevasCategorias, "categorias")
categorias = nuevasCategorias

// CATEGORIAS A HTML

const arrayReduc = categorias.reduce((acc, arr) => {
  return acc += `<option value="${arr}">${arr}</option>`
}, "")

selectCategoriasDeFiltros.innerHTML = ` <option value="todas" id="categoria-filtro-todas">Todas</option> ${arrayReduc}`

const agregarCategoriasAHTML = () => {
  const categoriasHTML = categorias.reduce((acc, elemento, index) => {
    return acc + `<div class="columns">
  <div class="column">
  <div class="tag is-primary is-light">${elemento}</div>
  </div>
  <button type="button" id="editar-categorias-${index}" class="button is-ghost is-small mr-2 mt-2 editar-categorias">Editar</button> 
  <button type="button" id="eliminar-categorias-${index}" class="button is-ghost is-small mr-1 mt-2 eliminar-categorias">Eliminar</button>
  </div>`
  }, "")

  listadoDeCategorias.innerHTML = categoriasHTML
}

agregarCategoriasAHTML()

// BOTONES EDITAR-ELIMINAR CATEGORÍAS

const bttnEliminarCategorias = document.querySelectorAll(".eliminar-categorias")

const eliminarCategoriasBoton = () => {
  const bttnEliminarCategorias = document.querySelectorAll(".eliminar-categorias")

  for (let i = 0; i < bttnEliminarCategorias.length; i++) {

    bttnEliminarCategorias[i].onclick = () => {
      const idRecortado = bttnEliminarCategorias[i].id.slice(20)
      idNumerico = Number(idRecortado)
      const filtradoCategorias = categorias.filter((elemento, index) => {
        return index != idNumerico
      })
      categorias = filtradoCategorias
      aJSONYSubirAlLStorage(categorias, "categorias")
      agregarCategoriasAHTML(categorias)
      editarCategoriasBoton()
      eliminarCategoriasBoton()
    }
  }
}


const editarCategoriaConInput = (id) => {
  seccionEditarCategorias.classList.remove("is-hidden");
  seccionCategorias.classList.add("is-hidden");
  seccionBalance.classList.add("is-hidden")
  seccionNuevaOperacion.classList.add("is-hidden");

  botonConfirmarEditarCategoria.onclick = () => {    

    const editarCatEnOp = operaciones.map((elemento, index) => {
      let clonOperaciones = {...operaciones[index]}
      const categoriaDeOp = inputEditarCategoria.value
      clonOperaciones.categoria = categoriaDeOp  
      return clonOperaciones
    })
    
    operaciones = editarCatEnOp
    aJSONYSubirAlLStorage(operaciones, "operaciones")
    categorias[id] = inputEditarCategoria.value
    aJSONYSubirAlLStorage(categorias, "categorias")
    agregarCategoriasAHTML(categorias)
    editarCategoriasBoton()
    eliminarCategoriasBoton()
    listadoOperaciones.innerHTML = aHTML(ordenarMasRecientes(operaciones))
    
  }
}

const editarCategoriasBoton = () => {
  const btnEditarCategoria = document.querySelectorAll(".editar-categorias")
  for (let i = 0; i < btnEditarCategoria.length; i++) {
    btnEditarCategoria[i].onclick = () => {
      const idRecortado = btnEditarCategoria[i].id.slice(18)
      idNumerico = Number(idRecortado)
      inputEditarCategoria.value = categorias[idNumerico]

      

      editarCategoriaConInput(idNumerico)
      eliminarCategoriasBoton()

      
      
    }
  }
}

editarCategoriasBoton()

botonCancelarEditarCategoria.onclick = () => {
  seccionEditarCategorias.classList.add("is-hidden");
  seccionCategorias.classList.remove("is-hidden");
  seccionReportesInsuficientes.classList.add("is-hidden");
}




eliminarCategoriasBoton()

// OPERACIONES

selectCategoriasOperaciones.innerHTML = arrayReduc

const subirObjetoAArray = (array) => {
  const nuevoObjeto = {
    descripcion: inputDescripcionOperaciones.value,
    monto: inputMontoOperaciones.value,
    tipo: selectTipoOperaciones.value,
    categoria: selectCategoriasOperaciones.value,
    fecha: inputFechaoperaciones.value,
  }
  array.push(nuevoObjeto)
}

botonAgregarOperacion.onclick = () => {
  subirObjetoAArray(operaciones)
  blanquearFormularios(formularioOperaciones)
  aJSONYSubirAlLStorage(operaciones, "operaciones")
  listadoOperaciones.innerHTML = aHTML(ordenarMasRecientes(operaciones))
  seccionNuevaOperacion.classList.add("is-hidden");
  seccionBalance.classList.remove("is-hidden");
}

const estadoDeContenedorDeOperaciones = (id) => localStorage.getItem(id) !== null && (seccionListadoOperaciones.classList.remove("is-hidden"),
  operacionesSinResultados.classList.add("is-hidden"))
estadoDeContenedorDeOperaciones("operaciones")

let nuevasOperaciones = []
guardarDeLStorage(nuevasOperaciones, "operaciones")
operaciones = nuevasOperaciones

const aHTML = (array) => {
  const arrReduc = array.reduce((acc, elemento, index) => {
    const montoSigno = (elemento) => elemento.tipo === "ganancia" ? `+$` : `-$`
    const montoClase = (elemento) => elemento.tipo === "ganancia" ? "has-text-success" : "has-text-danger"
    const fechas = new Date(elemento.fecha)
    return acc += `<div class="columns">
    <div class="column is-3 has-text-weight-bold has-text-left">${elemento.descripcion}</div>
    <div class="column is-1 tag is-primary is-light has-text-left mt-3">${elemento.categoria}</div>
    <div class="column is-4 has-text-grey has-text-right">${fechas.toLocaleDateString()}</div>
    <div class="column is-2 has-text-weight-bold ${montoClase(elemento)} has-text-right">${montoSigno(elemento)}${elemento.monto}</div>
    <div class="column is-2">
    <div class="columns">  
    <button type="button" id="editar-op-${index}" class="button is-ghost is-small mr-2 mt-2 edit-op">Editar</button> 
    <button type="button" id="eliminar-op-${index}" class="button is-ghost is-small mr-1 mt-2 delete-op">Eliminar</button>
    </div>
    </div>
    </div>`
  }, "")
  return arrReduc
}



// FILTROS

botonOcultarFiltros.onclick = () => {
  contenedorFiltros.classList.toggle("is-hidden");
  if (contenedorFiltros.classList.contains("is-hidden")) {
    botonOcultarFiltros.textContent = "Mostrar filtros";
  } else {
    botonOcultarFiltros.textContent = "Ocultar filtros";
  }
}

// FILTRO POR TIPO Y CATEGORÍA 

let arrayFiltrado = [...operaciones]

const filtrosPorTipoYCategoria = () => {
  const filtroTipo = filtrosTipo.value
  const filtracionPorTipo = operaciones.filter((operacion) => {
    if (filtroTipo === "todos") {
      return operacion
    }
    return operacion.tipo === filtroTipo
  })
  const filtracionPorCategoria = selectCategoriasDeFiltros.value
  const filtrado = filtracionPorTipo.filter((operacion) => {
    if (filtracionPorCategoria === "todas") {
      return operacion
    }
    return operacion.categoria === filtracionPorCategoria
  })
  return filtrado
}

filtrosTipo.onchange = () => {
  const arrayFiltradoTipo = filtrosPorTipoYCategoria()
  listadoOperaciones.innerHTML = aHTML(arrayFiltradoTipo)
}

selectCategoriasDeFiltros.onchange = () => {
  const arrayFiltradoCategoria = filtrosPorTipoYCategoria()
  listadoOperaciones.innerHTML = aHTML(arrayFiltradoCategoria)
}

// FILTRO POR FECHA

//inputDateFiltro.value =  new Date().toLocaleDateString()

const filtradoPorFecha = (array) => {
  inputDateFiltro.oninput = () => {
    const arrayFiltrado = array.filter((elemento) => {
      return new Date(elemento.fecha) > new Date(inputDateFiltro.value)
    })
    listadoOperaciones.innerHTML = aHTML(arrayFiltrado)
  }
}
filtradoPorFecha(operaciones)

// ORDENAR POR

// MÁS Y MENOS RECIENTE

const ordenarMasRecientes = (array) => {
  const fechasOrdenadas = array.sort((a, b) => {
    return new Date(b.fecha) - new Date(a.fecha)
  })
  return fechasOrdenadas
}

const ordenarMenosRecientes = (array) => {
  const fechasOrdenadas = array.sort((a, b) => {
    return new Date(a.fecha) - new Date(b.fecha)
  })
  return fechasOrdenadas
}

listadoOperaciones.innerHTML = aHTML(ordenarMasRecientes(operaciones))

const masYMenosRecientes = () => {
  if (selectOrdenarPor.value === "mas-reciente") {
    listadoOperaciones.innerHTML = aHTML(ordenarMasRecientes(operaciones))
  }
  else if (selectOrdenarPor.value === "menos-reciente") {
    listadoOperaciones.innerHTML = aHTML(ordenarMenosRecientes(operaciones))
  }
}

// MENOR MONTO

const arrayOrdenadoMenorMonto = [...operaciones].sort((a, b) => {
  return a.monto - b.monto
})

// MAYOR MONTO

const arrayOrdenadoMayorMonto = [...operaciones].sort((a, b) => {
  return b.monto - a.monto
})

const mayorMenorMonto = () => {
  if (selectOrdenarPor.value === "mayor-monto") {
    listadoOperaciones.innerHTML = aHTML(arrayOrdenadoMayorMonto)
  }
  else if (selectOrdenarPor.value === "menor-monto") {
    listadoOperaciones.innerHTML = aHTML(arrayOrdenadoMenorMonto)
  }
}

// ORDENAR A/Z Y Z/A

const arrayOrdenadoA = [...operaciones].sort((a, b) => {
  if (a.descripcion.toLowerCase() < b.descripcion.toLowerCase()) {
    return -1
  }
})

const arrayOrdenadoZ = [...operaciones].sort((a, b) => {
  if (a.descripcion.toLowerCase() > b.descripcion.toLowerCase()) {
    return -1
  }
})

const ordenarAlfabeticamente = () => {
  if (selectOrdenarPor.value === "a-z") {
    listadoOperaciones.innerHTML = aHTML(arrayOrdenadoA)
  }
  else if (selectOrdenarPor.value === "z-a") {
    listadoOperaciones.innerHTML = aHTML(arrayOrdenadoZ)
  }
}

const selectOrdenarPorAHTML = () => {
  selectOrdenarPor.oninput = () => {
    masYMenosRecientes()
    mayorMenorMonto()
    ordenarAlfabeticamente()
  }
}

selectOrdenarPorAHTML()

// REPORTES

sinReportes.style.display = "none"


// EDITAR Y ELIMINAR OPERACIONES 

listadoOperaciones.innerHTML = aHTML(ordenarMasRecientes(operaciones))

const bttnsEditOp = document.querySelectorAll(".edit-op")
const botonesOperacionesEliminar = document.querySelectorAll(".delete-op")
const seccionEditarOperaciones = document.getElementById("seccion-editar-operacion");

const editarOperacionesBoton = () => {

  for (let i = 0; i < bttnsEditOp.length; i++) {

    bttnsEditOp[i].onclick = () => {
      const idCortado = bttnsEditOp[i].id.slice(10)
      const idNumerico = Number(idCortado)
      selectEditCategoria.innerHTML = arrayReduc
      valorFormEditarOperaciones(idNumerico)
      formOperacionesEditadas()
    }
    //editarOperacionesBoton()
  }
}

editarOperacionesBoton()

const botonEditarOp = document.querySelector("#boton-edit-op")
const botonCancelOp = document.querySelector("#boton-cancel-op")
const inputEditDescripcion = document.querySelector("#edit-descripcion")
const inputEditMonto = document.querySelector("#edit-monto")
const inputEditTipo = document.querySelector("#edit-tipo-op")
const selectEditCategoria = document.querySelector("#editar-categorias-op")
const inputEditFecha = document.querySelector("#edit-fecha")

const valorFormEditarOperaciones = (id) => {
  inputEditDescripcion.value = operaciones[id].descripcion
  inputEditMonto.value = operaciones[id].monto
  inputEditTipo.value = operaciones[id].tipo
  selectEditCategoria.value = operaciones[id].categoria
  inputEditFecha.value = operaciones[id].fecha
}

const formOperacionesEditadas = (id) => {
  seccionEditarOperaciones.classList.remove("is-hidden");
  seccionBalance.classList.add("is-hidden");

  botonAgregarOperacion.onclick = () => {
    console.log(botonAgregarOperacion)

  }

}

/**
const editarCategoriaConInput = (id) => {
  seccionEditarCategorias.classList.remove("is-hidden");
  seccionCategorias.classList.add("is-hidden");
  seccionBalance.classList.add("is-hidden")
  seccionNuevaOperacion.classList.add("is-hidden");

  botonConfirmarEditarCategoria.onclick = () => {
    categorias[id] = inputEditarCategoria.value
    aJSONYSubirAlLStorage(categorias, "categorias")
  }
}
**/