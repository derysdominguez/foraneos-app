import React, { useEffect, useState } from 'react'
import TableBtn from '../tablas'
import GradoSelect from '../../components/GradoSelect'

const URL = 'http://localhost:4000/alumnos'
const urlMensualidad = 'http://localhost:4000/mensualidades/'
const Body = () => {
  const url = 'https://apimocha.com/foraneos-app/rep4'
  const url2 = 'http://localhost:4001/mensualidad'

  const [data, setData] = useState()
  const [meses, setMeses] = useState([])
  const [datosGrado, setDatosGrado] = useState()
  const [alumnos, setAlumnos] = useState([])

  useEffect(() => {
    fetch(URL)
      .then((res) => res.json())
      .then((res) => {
        const alumnos = res.map((item) => {
          fetch(urlMensualidad + item.id)
            .then((res) => res.json())
            .then((res) => {
              const meses = res.map((item2) => {
                if(item.id === item2.alumnoid){
                    return item2
                }
              });
                return meses;
            });
        });
      });
  }, []);

console.log(alumnos)
  const api = async () => {
    try {
      const response = await fetch(url)
      const lbJSON = await response.json()

      lbJSON.sort((a, b) => {
        if (a.codigo < b.codigo) return -1
        if (a.codigo > b.codigo) return 1
        return 0
      })

      setData(lbJSON)
      console.log(lbJSON)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    api()
  }, [])

  const handleGradoChange = (selectedGrado) => {
    const filtrado = data.filter((item) => item.grado === selectedGrado)
    const datosSinCampoGrado = filtrado.map(({ grado, ...resto }) => resto)
    if (datosSinCampoGrado.length > 0) {
      setDatosGrado(datosSinCampoGrado)
    } else {
      setDatosGrado([{ Estado: 'Sin datos' }])
    }
  }

  return (
    <div className='bodyText bg-white w-100 p-4 rounded d-flex align-items-start d-flex gap-2 flex-wrap justify-content-evenly'>
      <div className='bg-color-brand w-100 p-3 rounded text-white d-flex justify-content-between align-items-center'>
        <span className='col-8'>Pago de mensualidades</span>
        <GradoSelect onGradoChange={handleGradoChange} />
      </div>
      <div className='w-100 overflow-auto p-0 d-flex rounded align-items-center justify-content-center'>
        <div className='col-12 mt-1 w-100 h-libroContable'>
          <TableBtn
            valor={
              datosGrado ?? [
                {
                  grado: 'Cargando...',
                  nombre: 'Cargando...',
                  codigo: 'Cargando...',
                  mensualidad: 'Cargando...',
                  sept: '',
                  oct: '',
                  nov: '',
                  dic: '',
                  ene: '',
                  feb: '',
                  mar: '',
                  abr: '',
                  may: '',
                  jun: ''
                }
              ]
            }
          />
        </div>
      </div>
    </div>
  )
}

export default Body
