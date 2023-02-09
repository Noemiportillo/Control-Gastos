import { useState, useEffect } from 'react'
import CerrarModal from '../img/cerrar.svg'
import Mensaje from './Mensaje';

const Modal = ( {setModal, animarModal, setAnimarModal, guardarGasto, editar, setEditar} ) => {

    const [mensaje, setMensaje] = useState('');
    const [nombre, setNombre] = useState('');
    const [cantidad, setCantidad] = useState('');
    const [categoria, setCategoria] = useState('');
    const [id, setId] = useState('');


    useEffect( () => {
      if( Object.keys(editar).length >0 ) {
            setNombre(editar.nombre)
            setCantidad(editar.cantidad)
            setCategoria(editar.categoria)
            setId(editar.id)
      }
    }, []);

    const ocultarModal = () => {
       setAnimarModal(false)
       setEditar({})

       setTimeout( () => {
        setModal(false)
      }, 700);
    }

    // componente de validacion 
      const handleSubmit = e => {
        e.preventDefault();

        if([ nombre, cantidad, categoria ].includes('')) {
            setMensaje('Todos los campos son obligatorios')
            
            setTimeout( () => {
                setMensaje(false)
            }, 3000);
            return;
        }

            guardarGasto( {nombre, cantidad, categoria, id } )
      }
  return (
    <div className='modal'>
        <div className='cerrar-modal'>
            <img 
                src={CerrarModal}
                alt="Cerrar Modal" 
                onClick={ocultarModal}
             />
        </div>    
        <form 
            onSubmit={handleSubmit}
            className={`formulario ${animarModal ? "animar" : ' '}`}>
            <legend> {editar.nombre ? "Editar Gasto" : 'Nuevo Gasto'} </legend>

            {mensaje && <Mensaje tipo='error'>{mensaje}</Mensaje>}

            <div className='campo'>
              <label htmlFor="nombre">Nombre Gasto</label>
              <input 
                  id='nombre'
                  type="text" 
                  placeholder='Añadir el nombre del Gasto'
                  value={nombre}                
                  onChange={ (e) => setNombre(e.target.value)}
              />
            </div>

            <div className='campo'>
              <label htmlFor="cantidad">Cantidad</label>
              <input 
                  id='cantidad'
                  type="number" 
                  placeholder='Añadir la cantidad del Gasto'
                  value={cantidad}
                  onChange={(e) => setCantidad(Number(e.target.value))}
              />
            </div>

            <div className='campo'>
              <label htmlFor="categoria">Categoria</label>
              <select
                  id="categoria"
                  value={categoria}                
                  onChange={ (e) => setCategoria(e.target.value)}>

                <option value="">--- Todas las Categorías ---</option>
                <option value="ahorro">Ahorro</option>
                <option value="comida">Comida</option>
                <option value="casa">Casa</option>
                <option value="gastos">Gastos</option>
                <option value="ocio">Ocio</option>                
                <option value="salud">Salud</option>
              </select>
            </div>

            <input 
                type="submit"
                value={editar.nombre ? 'Guardar Cambios' : 'Añadir Gasto'} />
        </form> 
     </div>
  )
}

export default Modal