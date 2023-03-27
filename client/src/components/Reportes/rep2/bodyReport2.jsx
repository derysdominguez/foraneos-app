import React, {useEffect, useState} from "react";
import TableGenerator from "../tablaGenerator";


function BodyReport2() {
    /* Es ejemplo, mandas el arreglo de objetos   */
    const url = 'https://apimocha.com/foraneos-app/rep2'
    const [data, setData] = useState()

    const api = async () => {
        try {
            const response = await fetch(url);
            const lbJSON = await response.json();
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
            <div className='col-12 mt-1 h-100'>
                {/* <TableRep2></TableRep2> */}
                <TableGenerator data = {data ? data : [{'Estado': 'Cargando...'}]}/>
            </div>
        </div>
    )
}

export default BodyReport2