import React, {useEffect, useState} from "react";
import { Container, Row, Col } from "react-bootstrap";
import TableGenerator from "../tablaGenerator";




function BodyReport8() {
    /* Solo debes de llenar con los datos de la bd */
    const url = 'https://apimocha.com/foraneos-app/rep8'
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
            <div className='col-12 mt-1 h-100 w-100'>
                <TableGenerator data={data ?  data : [{'Estado': 'Cargando...'}]}/>
            </div>
        </div>
    )
}

export default BodyReport8;