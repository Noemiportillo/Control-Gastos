import React, { useState } from 'react'
import Mensaje from './Mensaje';

const NuevoPresupuesto = ( {presupuesto, setPresupuesto, setValidPresupuesto} ) => {

    const [mensaje, setMensaje] = useState('');

    const handlePresupuesto = e => {
        e.preventDefault();

        if(!presupuesto || presupuesto <0 ){
            setMensaje('No es un presupuesto válido')   
            return  // así no se ejecutan las siguientes líneas y se rompe el ciclo de esta funcion    
        }
       setMensaje('')
       setValidPresupuesto(true)
    }

  return (
    <div className='contenedor-presupuesto contenedor sombra'>
        <form onSubmit={handlePresupuesto} className='formulario'>
            <div className='campo'>
                <label>Definir presupuesto</label>
                <input
                    className='nuevo-presupuesto'
                    type="text"
                    placeholder='Añade tu presupuesto' 
                    value= {presupuesto} 
                    onChange={ (e) => setPresupuesto(Number(e.target.value))}
                    />
            </div>

            <input type="submit" value="Añadir"/>

            {mensaje && <Mensaje tipo='error'>{mensaje}</Mensaje>}
        </form>
    </div>
  )
}

export default NuevoPresupuesto