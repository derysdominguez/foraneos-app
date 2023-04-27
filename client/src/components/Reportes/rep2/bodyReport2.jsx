import React, {useEffect, useState} from "react";
import TableGenerator from "../tablaGenerator";

const convertDateFormat = dateString => {
    // Obtener los componentes de la fecha (día, mes, año) usando la función split()
    const dateComponents = dateString.split("/");
    const day = dateComponents[0];
    const month = dateComponents[1];
    const year = dateComponents[2];
  
    return new Date(year, month - 1, day);
}

function BodyReport2() {
    /* Es ejemplo, mandas el arreglo de objetos   */
    const url = 'https://apimocha.com/foraneos-app/rep1'
    const [data, setData] = useState()

    const api = async () => {
        try {
            const response = await fetch(url);
            const lbJSON = await response.json();

            lbJSON.sort((a,b) => {
                const fecha1 = convertDateFormat(a.fecha_finalizacion);
                const fecha2 = convertDateFormat(b.fecha_finalizacion);
                if (fecha1 < fecha2) return -1;
                if (fecha1 > fecha2) return 1;
                return 0;
            }) 

            setData(lbJSON)
        } catch (error) {
            console.error(error);
        }
    }
    
    useEffect(()=> {
        api()
    }, []) 
   

    return(
        <div className='w-100 h-50 overflow-auto p-2 d-flex rounded align-items-center justify-content-center'>
            
            <div  className='col-12 mt-1 h-100'>
                {/* <TableRep2></TableRep2> */}
                <TableGenerator data = {data ? data : [{'Estado': 'Cargando...'}]}/>
            </div>
        </div>
    )
}

export default BodyReport2