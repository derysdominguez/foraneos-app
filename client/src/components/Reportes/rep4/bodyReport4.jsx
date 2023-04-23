import React, {useState, useEffect} from "react";
import TableRep4 from "./dataTableReport";
import GradoSelect from "../../GradoSelect";


function BodyReport4() {
    const url = 'https://apimocha.com/foraneos-app/rep4'

    const [data, setData] = useState();
    const [datosGrado, setDatosGrado] = useState();
    const api = async () => {
        try {
            const response = await fetch(url);
            const lbJSON = await response.json();

            lbJSON.sort((a,b) => {
                if(a.codigo < b.codigo) return -1;
                if(a.codigo > b.codigo) return 1;
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

    
    const handleGradoChange = (selectedGrado) => {
        const filtrado = data.filter(item => item.grado === selectedGrado);
        const datosSinCampoGrado = filtrado.map(({grado, ...resto}) => resto);
        if(datosSinCampoGrado.length > 0){
            setDatosGrado(datosSinCampoGrado);
        } else {
            setDatosGrado([{'Estado': 'Sin datos'}]);
        }
    };

    return(
        <div className='w-100 h-50 overflow-auto p-2 d-flex rounded align-items-center justify-content-center'>
            
            <div className='col-12 mt-1 h-100'>

            <GradoSelect onGradoChange={handleGradoChange}></GradoSelect>
                <TableRep4 data={datosGrado ?  datosGrado : [{'Estado': 'Cargando...'}]} />
            </div>
        </div>
    )
}

export default BodyReport4