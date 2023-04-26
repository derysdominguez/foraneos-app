import { useEffect, useState } from 'react'
import GradoSelect from '../../components/GradoSelect'
import { TablaAlumnos } from './TablaAlumnos'

const URL = 'http://localhost:4001/alumnos'
export function Body() {
  const [data, setData] = useState([])
  const [filteredData, setFilteredData] = useState([data])
  const grados = {
    1: 'Kinder',
    2: 'Preparatoria',
    3: 'Primero',
    4: 'Segundo',
    5: 'Tercero',
    6: 'Cuarto',
    7: 'Quinto',
    8: 'Sexto',
    9: 'Séptimo',
    10: 'Octavo',
    11: 'Noveno',
    12: 'Décimo',
    13: 'Undécimo'
  }
  useEffect(() => {
    fetch(URL)
      .then((res) => res.json())
      .then((res) => {
        const alumnos = res.map((item) => {
          return {
            nombre: item.nombre,
            codigo: item.codigo,
            grado: grados[item.grado],
            estado: item.activo ? 'Activo' : 'Inactivo'
          }
        })
        setData(alumnos)
        setFilteredData(alumnos)
      })
  }, [])

  const handleGradoChange = (selectedGrado) => {
    const filter = data.filter((item) => {
      if (selectedGrado === 'todos') {
        return item
      } else {
        console.log(item.grado.toLowerCase() === selectedGrado)
        return item.grado.toLowerCase() === selectedGrado
      }
    })
    setFilteredData(filter)
  }
  return (
    <>
      <div className='bodyText bg-white w-100 p-4 rounded d-flex align-items-start d-flex gap-2 flex-wrap justify-content-evenly'>
        <div className='bg-color-brand w-100 p-3 rounded text-white d-flex justify-content-between align-items-center'>
          <span className='col-8'>Alumnos </span>
          <GradoSelect onGradoChange={handleGradoChange} />
        </div>
        <div className='w-100 overflow-auto p-0 d-flex rounded align-items-center justify-content-center'>
          <div className='col-12 mt-1 w-100 h-libroContable'>
            <TablaAlumnos data={filteredData} />
          </div>
        </div>
      </div>
    </>
  )
}
