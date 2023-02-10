import { useState, useEffect } from 'react';
import Header from './components/Header';
import Modal from './components/Modal';
import ListadoGastos from './components/ListadoGastos';
import Filtro from './components/Filtro';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { v4 as uuidv4 } from 'uuid';


function App() {

  const [presupuesto, setPresupuesto] = useState(Number(localStorage.getItem('presupuesto')) ?? 0 );
  const [isValidPresupuesto, setValidPresupuesto] = useState(false);
  const [modal, setModal] = useState(false);
  const [animarModal, setAnimarModal] = useState(false);
  const [gastos, setGastos] = useState(localStorage.getItem('gastos') ? JSON.parse(localStorage.getItem('gastos')) : []);
  const [editar, setEditar] = useState({});
  const [filtro, setFiltro] = useState('');
  const [gastosFiltrados, setGastosFiltrados] = useState([]);
  

  useEffect( () => {
    if( Object.keys(editar).length > 0 ) {
      setModal(true)
            
      setTimeout( () => {
        setAnimarModal(true)
      }, 500);
    }
  }, [editar]);


  useEffect( () => {
      localStorage.setItem('presupuesto', presupuesto ?? 0)
  }, [presupuesto]);

  useEffect( () => {
    localStorage.setItem('gastos',JSON.stringify(gastos) ?? [])
  }, [gastos]);

  useEffect(() => {
    if(filtro) {
      const gastosFiltrados = gastos.filter( gasto => gasto.categoria === filtro)

        console.log(gastosFiltrados)

          setGastosFiltrados(gastosFiltrados)
    }
    }, [filtro, gastos]);

  useEffect(() => {
    const presupuestoLS = Number(localStorage.getItem('presupuesto')) ?? 0

    if(presupuestoLS > 0) {
        setValidPresupuesto(true)
    }
  }, []);


  const handleGasto = () => {
    setModal(true)
    setEditar({})
    
    setTimeout( () => {
      setAnimarModal(true)
    }, 500);
  }

  const guardarGasto = (gasto) => {
    if(gasto.id) { //actualizar
      const gastosActualizados = gastos.map (gastoState => gastoState.id === gasto.id ? gasto : gastoState)
      setGastos(gastosActualizados)
      setEditar({})

    } else { //nuevo gasto
      const nuevoGasto = { ...gasto, id: uuidv4(), fecha: Date.now() }; //id
      setGastos([...gastos, nuevoGasto]);  //convertir en array,crear un copia de gastos y le agregamos el nuevo gasto
    }
      
      setAnimarModal(false)
      setTimeout( () => {
       setModal(false)
     }, 800);
   };
  
   const eliminarGasto = id => {
    const gastosActualizados = gastos.filter( gasto => gasto.id !== id)

    setGastos(gastosActualizados)
   }

  return (
    <div className={modal ? 'fijar' : ''}>
      <Header
        gastos={gastos}
        setGastos={setGastos}
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}  
        isValidPresupuesto={isValidPresupuesto}
        setValidPresupuesto={setValidPresupuesto}    
      />   
      {isValidPresupuesto && (
        <>
        <main>
          <Filtro
              filtro={filtro}
              setFiltro={setFiltro}
              />
          <ListadoGastos
              gastos={gastos}
              setEditar={setEditar}
              eliminarGasto={eliminarGasto}
              filtro={filtro}
              gastosFiltrados={gastosFiltrados} />
        </main>
        <div 
            className='nuevo-gasto'
            onClick={handleGasto}>
           <AiOutlinePlusCircle style={{ width: '50px', height: '50px' }} /> 
        </div>
        </>
      )}   
      
      {modal &&  <Modal 
        setModal={setModal} 
        animarModal={animarModal} 
        setAnimarModal={setAnimarModal}
        guardarGasto={guardarGasto}     
        editar={editar}  
        setEditar={setEditar} 
        /> 
        }

    </div>
  );
}

export default App;

