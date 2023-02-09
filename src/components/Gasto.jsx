import React from 'react'
import {
  LeadingActions,
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions,
} from 'react-swipeable-list';
import 'react-swipeable-list/dist/styles.css';

import IconoAhorro from '../img/icono_ahorro.svg'
import IconoCasa from '../img/icono_casa.svg'
import IconoGastos from '../img/icono_gastos.svg'
import IconoComida from '../img/icono_comida.svg'
import IconoOcio from '../img/icono_ocio.svg'
import IconoSalud from '../img/icono_salud.svg'

  const iconos = {
      ahorro : IconoAhorro,
      comida : IconoComida,
      casa : IconoCasa,
      gastos : IconoGastos,
      ocio : IconoOcio,
      salud : IconoSalud
           
  }

  const Gasto = ( {gasto, setEditar, eliminarGasto} ) => {

        const { categoria, nombre, cantidad, id } = gasto;

        const date = new Date();
        const formatearFecha = date.toLocaleDateString("es-ES", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        });

  const leadingActions = () => (
    <LeadingActions>
      <SwipeAction onClick={ () => setEditar(gasto)}>
          Editar
      </SwipeAction>
    </LeadingActions>
  );

  const trailingActions = () => (
    <TrailingActions>
      <SwipeAction 
            destructive={true}
            onClick={ () => eliminarGasto(id)}>
          Eliminar
      </SwipeAction>
    </TrailingActions>
  );

  return (
    <SwipeableList>
      <SwipeableListItem
       leadingActions={leadingActions()}
       trailingActions={trailingActions()}>

      <div className='gasto sombra'>
          <div className='contenido-gasto'> 
              <img 
              src={iconos[categoria]}
              alt='Icono Gasto' />
              <div className='descripcion-gasto'>
                  <p className='categoria'> {categoria} </p>
                  <p className='nombre-gasto'> {nombre} </p>  
                  <p className='fecha-gasto'>
                    Agregado el: {formatearFecha}
                  </p>              
              </div>
          </div>
          <p className='cantidad-gasto'> {cantidad} €</p>
      </div>
      </SwipeableListItem>
    </SwipeableList>
  )
}

export default Gasto