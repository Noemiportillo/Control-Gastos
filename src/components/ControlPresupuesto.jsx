/* eslint-disable no-restricted-globals */
import  { useState, useEffect } from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const ControlPresupuesto = ( {gastos, setGastos, presupuesto, setPresupuesto, setValidPresupuesto} ) => {

    const [disponible, setDisponible] = useState(0);
    const [gastado, setGastado] = useState(0);
    const [porcentaje, setPorcentaje] = useState(0);

   useEffect( () => {
        const totalGastado = gastos.reduce( (total, gasto) => gasto.cantidad + total, 0);

        const totalDisponible = presupuesto - totalGastado;

        const nuevoPorcentaje = (((presupuesto - totalDisponible) / presupuesto) * 100).toFixed(2);
        
        setDisponible(totalDisponible)
        setGastado(totalGastado)
        setTimeout(() => {
            setPorcentaje(nuevoPorcentaje)
        }, 1500);        
     }, [gastos])

    const formatearCantidad = (cantidad) => {
        return cantidad.toLocaleString('es-ES', {
          style: 'currency',
          currency: 'EUR'
        });
      };
      

    const handleResetApp = () => {
        
        const resultado = confirm('Deseas reiniciar presupuesto y gastos');

        if(resultado) {
            setGastos([]);
            setPresupuesto(0)
            setValidPresupuesto(false)      
        }
      }

  return (
    <div className='contenedor-presupuesto contenedor sombra dos-columnas'>
        <div> 
            <p>
                <CircularProgressbar 
                    value= {porcentaje}
                    styles={buildStyles({
                        pathColor: porcentaje > 100 ? '#b71c1c' : '#8d6e63' ,
                        trailColor: '#f5f5f5',
                        textColor:'#4e342e'
                    })}
                    text={`${porcentaje}%`}
                    />
            </p>
        </div>
        <div className='contenido-presupuesto'>

            <button className='reset-app'
                    type='button'
                    onClick={handleResetApp}>
                Resetear App
            </button>
            <p>
                <span>Presupuesto:</span> {formatearCantidad(presupuesto)}
            </p>
            <p className={`${disponible < 0 ? 'negativo' : ''}`}>
                <span>Disponible:</span> {formatearCantidad(disponible)}
            </p>
            <p>
                <span>Gastado:</span> {formatearCantidad(gastado)}
            </p>
        </div>
    </div>
  )
} 

export default ControlPresupuesto