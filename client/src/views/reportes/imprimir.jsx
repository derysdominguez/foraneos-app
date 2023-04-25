import React from 'react'
import { BsPrinter, BsArrowLeftCircle } from 'react-icons/bs'
import { Link } from 'react-router-dom'

function BtnInferiores({ children}) {
  return (
    <>
      <div
        className=' hsizing-control w-100 d-flex align-items-center justify-content-end'
        >
        <Link to={'/reportes'}>
          <button className='btn btn-primary px-3 d-flex align-items-center me-1'>
            <BsArrowLeftCircle className='me-2' />
            <span>Regresar</span>
          </button>
        </Link>
        
        {children}
      </div>
      
    </>
  )
}

export default BtnInferiores
