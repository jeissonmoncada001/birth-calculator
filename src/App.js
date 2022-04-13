import React, {useState} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal, ModalBody, ModalHeader, ModalFooter} from 'reactstrap';


function App() {
  const DatosDelUsuario = [
    { id: 1, Nombre: "Iris",
    DiadeOvulacion: new Date(),
    Diasdeinsemiacion: [{id:0,date:new Date()}],
    PartosProbables: [{id:0,date:new Date()}],
    DiaDeParto:new Date() },
  ];

  const dataSelected = {
    id: '',
    Nombre: '',
    DiadeOvulacion: '',
    Diasdeinsemiacion:[{id:0,date:new Date()}],
    PartosProbables: [{id:0,date:new Date()}],
    DiaDeParto:''
  }

  const boton=false;

  const [data, setData] = useState(DatosDelUsuario);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [modalInsertar, setModalInsertar] = useState(false);
  const [botonAgregarFechas, setBotonAgregarFechas] = useState(boton);

  const [userSeleccionado, setUserSeleccionado] = useState(dataSelected);


  const seleccionarUser = (elemento, caso)=>{
    //get info dataSelected
    var tempElement={
      id: elemento.id,
      Nombre: elemento.Nombre,
      DiadeOvulacion: new Date(elemento.DiadeOvulacion).toISOString().substring(0,10),
      Diasdeinsemiacion:elemento.Diasdeinsemiacion,
    };
    //set info dataSelected
    setUserSeleccionado(tempElement);
    //cual modal mostrar
    (caso==='Editar')?setModalEditar(true):setModalEliminar(true)

  }

  //manejador de cambios
  const handleChange = e => {
    const {name, value} = e.target;
    setUserSeleccionado((prevState)=>({
      ...prevState,
      [name]: value
    }));
  }


  const handleChangeDiasInseminacion = e => {
    const {name, value} = e.target;
    var temp= userSeleccionado.Diasdeinsemiacion;
    temp[name].date=value;

    setUserSeleccionado((prevState)=>({
      ...prevState,
      Diasdeinsemiacion: temp
    }));
  }

  const editar=()=>{
    //get all data
    var dataNueva=data;
    //editar por id
    var tempPartosProbables= userSeleccionado.Diasdeinsemiacion.length==1?[{id:0,date:addDays(userSeleccionado.Diasdeinsemiacion[0].date,61)}]:[{id:0,date:addDays(userSeleccionado.Diasdeinsemiacion[0].date,61)},{id:1,date:addDays(userSeleccionado.Diasdeinsemiacion[userSeleccionado.Diasdeinsemiacion.length-1].date,61)}];
    dataNueva.map(user=>{
      if(user.id===userSeleccionado.id){
        user.Nombre= userSeleccionado.Nombre;
        user.DiadeOvulacion= new Date(userSeleccionado.DiadeOvulacion);
        user.Diasdeinsemiacion= userSeleccionado.Diasdeinsemiacion;
        user.PartosProbables=tempPartosProbables;
        user.DiaDeParto=addDays(userSeleccionado.DiadeOvulacion,63);
      }
    });
    //set nueva data
    setData(dataNueva);
    //ocultar modal
    setModalEditar(false);
  }

  const eliminar =()=>{
    //filtra todos menos el id  indicado y luego set todo la data
    setData(data.filter(user => user.id !== userSeleccionado.id ));
    //ocultar modal
    setModalEliminar(false);
  }

  const abrirModalInsertar=()=>{
    //crea un nuevo dato y le asigna un nuevo id
    var newUser={
      id: data[data.length-1].id+1,
      Diasdeinsemiacion:[{id:0,date:new Date()}]
    };
    //setea el nuevo dato
    setUserSeleccionado(newUser);
    //muestra el modal
    setModalInsertar(true);
  }

  //funcion para sumar dias
  function addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  const insertar =()=>{
    //crea un nuevo dato con los datos indicados por el usuario y calcula los ultimos dos
    var tempPartosProbables= userSeleccionado.Diasdeinsemiacion.length==1?[{id:0,date:addDays(userSeleccionado.Diasdeinsemiacion[0].date,61)}]:[{id:0,date:addDays(userSeleccionado.Diasdeinsemiacion[0].date,61)},{id:1,date:addDays(userSeleccionado.Diasdeinsemiacion[userSeleccionado.Diasdeinsemiacion.length-1].date,61)}];
    var valorInsertar={
      id: userSeleccionado.id,
      Nombre: userSeleccionado.Nombre,
      DiadeOvulacion: new Date(userSeleccionado.DiadeOvulacion),
      Diasdeinsemiacion: userSeleccionado.Diasdeinsemiacion,
      PartosProbables:tempPartosProbables ,
      DiaDeParto:addDays(userSeleccionado.DiadeOvulacion,63)
    };
    //copia toda la data en una nueva variable
    var dataNueva = data;
    //agrega el nuevo dato a la nueva variable
    dataNueva.push(valorInsertar);
    //setea la nueva variable como la data
    setData(dataNueva);
    //oculta el modal
    setModalInsertar(false);

  }

  function retornarFechasJuntas(elemento){

    let temp = elemento.map(item =>{return new Date(item.date).toISOString().substring(0,10)}).join(' , ');
    return temp;
  }


  function agregarfechaInseminacion(){
        if(userSeleccionado.Diasdeinsemiacion.length<6){
          var newInput = userSeleccionado.Diasdeinsemiacion.length;
          setUserSeleccionado((prevState) => ({
            id: prevState.id,
            Nombre: prevState.Nombre,
            DiadeOvulacion: prevState.DiadeOvulacion,
            Diasdeinsemiacion: prevState.Diasdeinsemiacion.concat({id:newInput,date:new Date()}) }));
        }else{
          setBotonAgregarFechas(true);
        }
  }

  return (

    <div className="App">
      <h2>Birth Calculator</h2>
      <br />
    <button className="btn btn-success" onClick={()=>abrirModalInsertar()}>Insertar</button>
    <br /><br />
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre del Perro</th>
            <th>Dia de Ovulacion</th>
            <th>Dias de Inseminacion </th>
            <th>Partos probables</th>
            <th>Dia de parto probable</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody> {
          data.map(elemento=>(
            <tr>
              <td>{elemento.id}</td>
              <td>{elemento.Nombre}</td>
              <td>{elemento.DiadeOvulacion.toLocaleDateString()}</td>
              <td>{retornarFechasJuntas(elemento.Diasdeinsemiacion)} </td>
              <td>{retornarFechasJuntas(elemento.PartosProbables)} </td>
              <td>{elemento.DiaDeParto.toLocaleDateString()}</td>
              <td><button className="btn btn-primary" onClick={()=>seleccionarUser(elemento, 'Editar')}>Editar</button> {"   "} 
              <button className="btn btn-danger" onClick={()=>seleccionarUser(elemento, 'Eliminar')}>Eliminar</button></td>
            </tr>
          ))
          }
        </tbody>
      </table>

      <Modal isOpen={modalEditar}>
        <ModalHeader>
          <div>
            <h3>Editar Usuario</h3>
          </div>
        </ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>ID</label>
            <input
              className="form-control"
              readOnly
              type="text"
              name="id"
              value={userSeleccionado && userSeleccionado.id}
            />
            <br />

            <label>Usuario</label>
            <input
              className="form-control"
              type="text"
              name="Nombre"
              value={userSeleccionado && userSeleccionado.Nombre}
              onChange={handleChange}
            />
            <br />

            <label>Dia de Ovulación</label>
            <input
              className="form-control"
              type="date"
              name="DiadeOvulacion"
              dateFormat="dd/MM/yyyy"
              value={userSeleccionado && userSeleccionado.DiadeOvulacion}
              onChange={handleChange}
            />
            <br />

            <label>Dias de insemiacion</label>
            {userSeleccionado.Diasdeinsemiacion.map(input => <input
                className="form-control"
                type="date"
                name={input.id}
                value={input.date}
                onChange={handleChangeDiasInseminacion}
              />
              )}
            <br />
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-primary" onClick={()=>editar()}>
            Actualizar
          </button>
          <button
            className="btn btn-danger"
            onClick={()=>setModalEditar(false)}
          >
            Cancelar
          </button>
        </ModalFooter>
      </Modal>


      <Modal isOpen={modalEliminar}>
        <ModalBody>
          Estás Seguro que deseas eliminar el Usuario {userSeleccionado && userSeleccionado.Nombre}
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-danger" onClick={()=>eliminar()}>
            Sí
          </button>
          <button
            className="btn btn-secondary"
            onClick={()=>setModalEliminar(false)}
          >
            No
          </button>
        </ModalFooter>
      </Modal>


        <Modal isOpen={modalInsertar}>
        <ModalHeader>
          <div>
            <h3>Insertar</h3>
          </div>
        </ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>ID</label>
            <input
              className="form-control"
              readOnly
              type="text"
              name="id"
              value={userSeleccionado.id}
              onChange={handleChange}
            />
            <br />

            <label>Usuario</label>
            <input
              className="form-control"
              type="text"
              name="Nombre"
              value={userSeleccionado ? userSeleccionado.Nombre: ''}
              onChange={handleChange}
            />
            <br />

            <label>Dia de Ovulación</label>
            <input
              className="form-control"
              type="date"
              name="DiadeOvulacion"
              value={userSeleccionado ? userSeleccionado.DiadeOvulacion: ''}
              onChange={handleChange}
            />
            <br />

            <div id="diasInseminacionInputs">
            <label>Dias de insemiacion</label>
            {userSeleccionado.Diasdeinsemiacion.map(input => <input
                className="form-control"
                type="date"
                name={input.id}
                value={input.date}
                onChange={handleChangeDiasInseminacion}
              />
              )}
            <br />
            </div>
            <button disabled={botonAgregarFechas} className="btn btn-success" onClick={()=>agregarfechaInseminacion()}>Añadir fecha</button>
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-primary"
          onClick={()=>insertar()}>
            Insertar
          </button>
          <button
            className="btn btn-danger"
            onClick={()=>setModalInsertar(false)}
          >
            Cancelar
          </button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default App;