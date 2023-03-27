import React, {useState, useEffect} from "react";
import TableRep4 from "./dataTableReport";


function BodyReport4() {
    const url = 'https://apimocha.com/foraneos-app/rep4'
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
                <TableRep4 data={data ?  data : [{'Estado': 'Cargando...'}]} />
            </div>
        </div>
    )
}

export default BodyReport4