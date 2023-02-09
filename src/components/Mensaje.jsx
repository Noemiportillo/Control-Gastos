import React from 'react'

const Mensaje = ( {children, tipo }) => {
  return (
    <div className={`alerta ${tipo}`}>{children}</div>
  )
}

export default Mensaje

// componente que se le pueden pasar diferentes tipos, error o correcto, con diferentes estilos y le pasamos childre con todo el mensje