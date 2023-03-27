import React, {useState, useEffect} from "react";
import { Container, Row, Col } from "react-bootstrap";
import TableGenerator from "../tablaGenerator";




function BodyReport9() {
    /* Solo debes de llenar con los datos de la bd */
    const url = 'https://apimocha.com/foraneos-app/rep9'
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
        <div className='hsizing-control w-100 h-50 overflow-auto p-2 d-flex flex-wrap rounded align-items-center justify-content-center'>
            <div className='col-12 mt-1 h-100'>
                <TableGenerator data={data ?  data : [{'Estado': 'Cargando...'}]}/>
            </div>
        </div>
    )
}

export default BodyReport9;