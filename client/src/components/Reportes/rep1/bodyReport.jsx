
import React, { useState, useEffect } from 'react';
import { Table, Toast } from 'react-bootstrap';
import TableGenerator from "../tablaGenerator";
import MesSelect from '../../MesSelect';
/* import TableRep1 from "./dataTable"; */


function BodyReport1() {

    /* Terminado */

    const url = 'https://apimocha.com/foraneos-app/rep1'
    const [ingresosMes, setIngresosMes] = useState()
    const [totalIngresos, setTotalIngresos] = useState()

    const [egresosMes, setEgresosMes] = useState()
    const [totalEgresos, setTotalEgresos] = useState()
    const [ingresos, setIngresos] = useState();
    const [egresos, setEgresos] = useState();
    // const [mesSelect, setMesSelect] = useState('');

    

    const api = async () => {
        try {
            const response = await fetch(url);
            const lbJSON = await response.json();
            lbJSON.sort((a,b) => {
                if(a.fecha < b.fecha) return -1;
                if(a.fecha > b.fecha) return 1;
                return 0;
            });
            //lado de ingresos 
            
            const datosSinEntradaIngresos = lbJSON.filter(item => item.entrada == "i")
            const ing = datosSinEntradaIngresos.map(({ entrada, ...resto }) => resto);
            setIngresos(ing);

            const datosSinEntradaEngresos  = lbJSON.filter(item => item.entrada == "e")
            const egr = datosSinEntradaEngresos.map(({ entrada, ...resto }) => resto);
            setEgresos(egr);


        } catch (error) {
            console.error(error);
        }
    }
    
    useEffect(()=> {
        api()
    }, []) 

    const handleMesChange = (selectedMes) => {
        const regex = new RegExp('^2023-' + selectedMes + '-(0?[1-9]|[1-2][0-9]|3[0-1])$');
        const ingMes = ingresos.filter(item => regex.test(item.fecha));
        const egrMes = egresos.filter(item => regex.test(item.fecha));
        if (ingMes.length > 0 && egrMes.length > 0) {
            setIngresosMes(ingMes);
            setEgresosMes(egrMes);
            const totalIng = ingMes.reduce((acum, ingreso) => parseFloat(acum) + parseFloat(ingreso.monto), 0);
            const totalEgr = egrMes.reduce((acum, egreso) => parseFloat(acum) + parseFloat(egreso.monto), 0);

            setTotalIngresos(totalIng);
            setTotalEgresos(totalEgr);
        }else {
            setIngresosMes([{'Estado': 'Sin datos'}]);
            setEgresosMes([{'Estado': 'Sin datos'}]);
            setTotalIngresos('Sin datos');
            setTotalEgresos('Sin datos');
        };
        

        
      }

    return(
        <div className=' hsizing-control w-100 h-50 overflow-auto p-2 d-flex flex-wrap rounded align-items-center justify-content-center'>
            <div className=' col-12 mt-1 h-100'>
                {/* <TableRep1 nombre={'Ingresos'} />
                <TableRep1 nombre={'Egresos'}/> */}
                <MesSelect onMesChange={handleMesChange} />
                <h6 className='fs-6'>Ingresos</h6>
                
                <hr></hr>
                <TableGenerator data = {ingresosMes ?  ingresosMes : [{'Estado': 'Cargando...'}]}/>
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
                <TableGenerator data = {egresosMes ?  egresosMes : [{'Estado': 'Cargando...'}]}/>
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

export default BodyReport1
