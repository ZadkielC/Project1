import React, { useEffect, useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap'

function App() {
  const baseURL="https://localhost:44331/api/Cliente";
  const [data, setData]=useState([]);
  const [modalInsertar, setModalInsertar]=useState(false);
  const [modalEliminar, setModalEliminar]=useState(false);
  const [modalEditar, setModalEditar]=useState(false);
  const [gestorSeleccionado, setGestorSeleccionado]=useState({
    codigo: '',
    nombre: '',
    telefono: '',
    email: '',
  })

  const handleChange=e=>{
    const {name, value}=e.target;
    setGestorSeleccionado({
      ...gestorSeleccionado,
      [name]: value
    })
    console.log(gestorSeleccionado);
  }

  const abrirCerrarModalInsertar=()=>{
    setModalInsertar(!modalInsertar);
  }

  const abrirCerrarModalEditar=()=>{
    setModalEditar(!modalEditar);
  }

  const abrirCerrarModalEliminar=()=>{
    setModalEliminar(!modalEliminar);
  }

  const peticionGet=async()=>{
    await axios.get(baseURL)
    .then(response=>{
      setData(response.data);
    }).catch(error=>{
      console.log(error);
    })
  }

  const peticionPost=async()=>{
    delete gestorSeleccionado.codigo;
    gestorSeleccionado.telefono=parseInt(gestorSeleccionado.telefono);
    await axios.post(baseURL, gestorSeleccionado)
    .then(response=>{
      setData(data.concat(response.data));
      abrirCerrarModalInsertar();
    }).catch(error=>{
      console.log(error);
    })
  }

  const peticionPut=async()=>{
    gestorSeleccionado.telefono=parseInt(gestorSeleccionado.telefono);
    await axios.put(baseURL+"/"+gestorSeleccionado.codigo, gestorSeleccionado)
    .then(response=>{
      var respuesta=response.data;
      var dataAuxiliar=data;
      dataAuxiliar.map(gestor=>{
        if(gestor.codigo===gestorSeleccionado.codigo){
          gestor.nombre=respuesta.nombre;
          gestor.telefono=respuesta.telefono;
          gestor.Email=respuesta.Email;
        }
      });
      abrirCerrarModalEditar();
    }).catch(error=>{
      console.log(error);
    })
  }

  const peticionDelete=async()=>{
    await axios.delete(baseURL+"/"+gestorSeleccionado.codigo)
    .then(response=>{
      setData(data.filter(gestor=>gestor.codigo!==response.data));
      abrirCerrarModalEliminar();
    }).catch(error=>{
      console.log(error);
    })
  }

  const seleccionarGestor=(gestor, caso)=>{
    setGestorSeleccionado(gestor);
    (caso==="Editar")?
    abrirCerrarModalEditar(): abrirCerrarModalEliminar();
  }

  useEffect(()=>{
    peticionGet();
  },[])

  return (
    <div className="App">
      <br /><br />
      <button onClick={()=>abrirCerrarModalInsertar()}>Insertar Nuevo Gestor</button>
      <br /><br />
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Codigo</th>
            <th>Nombre</th>
            <th>Telefono</th>
            <th>Email</th>
            <th>Accion</th>
          </tr>
        </thead>
        <tbody>
        {data.map(gestor=>(
          <tr key={gestor.codigo}>
            <td>{gestor.codigo}</td>
            <td>{gestor.nombre}</td>
            <td>{gestor.telefono}</td>
            <td>{gestor.email}</td>
            <td>
              <button className="btn btn-primary" onClick={()=>seleccionarGestor(gestor, "Editar")}>Editar</button> {" "}
              <button className="btn btn-secondary" onClick={()=>seleccionarGestor(gestor, "Eliminar")}>Eliminar</button>
            </td>
            </tr>
        ))}
        </tbody>

      </table>


      <Modal isOpen={modalInsertar}>
      <ModalHeader>Insertar Gestor Base de Datos</ModalHeader>
      <ModalBody>
        <div className="form-group">
          <label>Nombre: </label>
          <br />
          <input type="text" className="form-control" name="nombre" onChange={handleChange}/>
          <br />
          <label>Telefono: </label>
          <br />
          <input type="text" className="form-control" name="telefono" onChange={handleChange}/>
          <br />
          <label>Email: </label>
          <br />
          <input type="text" className="form-control" name="email" onChange={handleChange}/>
          <br />
        </div>
      </ModalBody>
      <ModalFooter>
        <button className="btn primary" onClick={()=>peticionPost()}>Agregar</button>{" "}
        <button className="btn secondary" onClick={()=>abrirCerrarModalInsertar()}>Cerrar</button>
      </ModalFooter>
      </Modal>
      
      
      <Modal isOpen={modalEditar}>
        <ModalHeader>Editar Gestor Base de Datos</ModalHeader>
        <ModalBody>
          <div className="form-group">
          <label>Codigo: </label>
            <br />
            <input type="text" className="form-control" readOnly value={gestorSeleccionado && gestorSeleccionado.codigo}/>
            <br />
            <label>Nombre: </label>
            <br />
            <input type="text" className="form-control" name="nombre" onChange={handleChange} value={gestorSeleccionado && gestorSeleccionado.nombre}/>
            <br />
            <label>Telefono: </label>
            <br />
            <input type="text" className="form-control" name="telefono" onChange={handleChange} value={gestorSeleccionado && gestorSeleccionado.telefono}/>
            <br />
            <label>Email: </label>
            <br />
            <input type="text" className="form-control" name="email" onChange={handleChange} value={gestorSeleccionado && gestorSeleccionado.email}/>
            <br />
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn primary" onClick={()=>peticionPut()}>Editar</button>{" "}
          <button className="btn secondary" onClick={()=>abrirCerrarModalEditar()}>Cerrar</button>
        </ModalFooter>
      </Modal>
      

      <Modal isOpen={modalEliminar}>
        <ModalBody>
          ¿Seguro que deseas eliminar la entidad {gestorSeleccionado && gestorSeleccionado.nombre}?
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-primary" onClick={()=>peticionDelete()}>
            Si
          </button>
          <button className="btn btn-secondary" onClick={()=>abrirCerrarModalEliminar()}>
            No
          </button>
        </ModalFooter>
      </Modal>
          
    </div>
  );
}

export default App;
