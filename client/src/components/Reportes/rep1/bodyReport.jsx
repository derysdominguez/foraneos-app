import React, { useState, useEffect } from 'react';
import { Table, Toast } from 'react-bootstrap';
import TableGenerator from "../tablaGenerator";
/* import TableRep1 from "./dataTable"; */


function BodyReport1() {

    /* Terminado */

    const url = 'https://apimocha.com/foraneos-app/rep1'
    const [data, setData] = useState()
    const [totalIngresos, setTotalIngresos] = useState()

    const [egresos, setEgresos] = useState()
    const [totalEgresos, setTotalEgresos] = useState()

    const api = async () => {
        try {
            const response = await fetch(url);
            const lbJSON = await response.json();

            //lado de ingresos 
            const ingresos = lbJSON.filter(item => item.entrada == "i")
            const datosSinEntradaIngresos = ingresos.map(({ entrada, ...resto }) => resto);
            const totalIngresos = ingresos.reduce((acum, ingresos) => parseFloat(acum) + parseFloat(ingresos.monto), 0)

            const egresos = lbJSON.filter(item => item.entrada == "e")
            const datosSinEntradaEngresos = egresos.map(({ entrada, ...resto }) => resto);
            const totalEgresos = egresos.reduce((acum, egresos)=>parseFloat(acum) + parseFloat(egresos.monto), 0)

            setData(datosSinEntradaIngresos)
            setTotalIngresos(totalIngresos) 

            setEgresos(datosSinEntradaEngresos)
            setTotalEgresos(totalEgresos)

        } catch (error) {
            console.error(error);
        }
    }
    
    useEffect(()=> {
        api()
    }, []) 

    return(
        <div className=' hsizing-control w-100 h-50 overflow-auto p-2 d-flex flex-wrap rounded align-items-center justify-content-center'>
            <div className=' col-12 mt-1 h-100'>
                {/* <TableRep1 nombre={'Ingresos'} />
                <TableRep1 nombre={'Egresos'}/> */}
                <h6 className='fs-6'>Ingresos</h6>
                <hr></hr>
                <TableGenerator data = {data ?  data : [{'Estado': 'Cargando...'}]}/>
                <Table striped bordered>
                    <tbody>
                        <tr className='bg-secondary'>
                            <th className='text-white'>{totalIngresos ? 'Total de Ingresos: ' : 'Cargando...' }</th>
                            <th className='text-end text-white'>L. {totalIngresos ? totalIngresos : 'Cargando...' }</th>
                        </tr>
                    </tbody>
                </Table>
                <h6 className='fs-6'>Egresos</h6>
                <hr></hr>
                <TableGenerator data = {egresos ?  egresos : [{'Estado': 'Cargando...'}]}/>
                <Table striped bordered>
                    <tbody>
                        <tr className='bg-secondary'>
                            <th className='text-white'>{totalEgresos ? 'Total de egresos: ' : 'Cargando...' }</th>
                            <th className=' text-white text-end'>L. {totalEgresos ? totalEgresos : 'Cargando...' }</th>
                        </tr>
                    </tbody>
                </Table>
            </div>
        </div>
    )
}

export default BodyReport1;