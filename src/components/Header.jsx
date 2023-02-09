import React from 'react'
import ControlPresupuesto from './ControlPresupuesto'
import NuevoPresupuesto from './NuevoPresupuesto'

const Header = ( { gastos, setGastos, presupuesto, setPresupuesto, isValidPresupuesto, setValidPresupuesto} ) => {
  return (
    <header>
        <h1>Planificador de Gastos</h1>

        {isValidPresupuesto ? (
            <ControlPresupuesto 
            gastos={gastos}
            setGastos={setGastos}
            presupuesto={presupuesto}
            setPresupuesto={setPresupuesto} 
            setValidPresupuesto={setValidPresupuesto}       
            />
        ) : (
            <NuevoPresupuesto 
            presupuesto={presupuesto}
            setPresupuesto={setPresupuesto} 
            setValidPresupuesto={setValidPresupuesto}
        />
        )}
      
    </header>
  )
}

export default Header