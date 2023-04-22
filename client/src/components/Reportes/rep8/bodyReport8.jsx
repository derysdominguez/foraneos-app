import React, {useEffect, useState} from "react";
import { Container, Row, Col } from "react-bootstrap";
import TableGenerator from "../tablaGenerator";
import GradoSelect from "../../GradoSelect";
import BecaSelect from "../../BecaSelect";




function BodyReport8() {
    /* Solo debes de llenar con los datos de la bd */
    const url = 'https://apimocha.com/foraneos-app/rep8';
    const [data, setData] = useState();
    const [datosFiltrados, setDatosFiltrados] = useState();
    const [grado, setGrado] = useState("todos");
    const [beca, setBeca] = useState("todos");

    const api = async () => {
        try {
            const response = await fetch(url);
            const lbJSON = await response.json();

            lbJSON.sort((a,b) => {
                const grados = ['Kinder', 'Preparatoria', 'Primero', 'Segundo', 'Tercero', 'Cuarto', 'Quinto',
                                'Sexto', 'Septimo', 'Octavo', 'Noveno', 'Decimo', 'Undecimo'];
                if(grados.indexOf(a.grado) < grados.indexOf(b.grado)) return -1;
                if(grados.indexOf(a.grado) > grados.indexOf(b.grado)) return 1;
                if(a.codigo < b.codigo) return -1;
                if(a.codigo > b.codigo) return 1;
                return 0;
            });
            setData(lbJSON);
            setDatosFiltrados(lbJSON);
        } catch (error) {
            console.error(error);
        }
    }
    
    useEffect(()=> {
        api()
    }, []) 


    const handleGradoChange = (selectedGrado) => {
        let filtrado;
        if(beca === "todos"){
            filtrado = selectedGrado === "todos"? data: data.filter(item => item.grado.toLowerCase() === selectedGrado);
        } else {
            filtrado = selectedGrado === "todos"? data.filter(item =>  item.tipo_beca === beca):
             data.filter(item => item.grado.toLowerCase() === selectedGrado && item.tipo_beca === beca);
        }
        
        setGrado(selectedGrado);
        if(filtrado.length > 0){
            setDatosFiltrados(filtrado);
        } else {
            setDatosFiltrados([{'Estado': 'Sin datos'}]);
        }
    };

    const handleBecaChange = (selectedBeca) => {
        let filtrado;
        if(grado === "todos"){
            filtrado = selectedBeca === "todos"? data: data.filter(item => item.tipo_beca === selectedBeca);
        } else {
            filtrado = selectedBeca === "todos"? data.filter(item => item.grado.toLowerCase() === grado):
             data.filter(item => item.grado.toLowerCase() === grado && item.tipo_beca === selectedBeca);
        }
        setBeca(selectedBeca);
        if(filtrado.length > 0){
            setDatosFiltrados(filtrado);
        } else {
            setDatosFiltrados([{'Estado': 'Sin datos'}]);
        }
    }

    return(
        <div className='w-100 h-50 overflow-auto p-2 d-flex rounded align-items-center justify-content-center'>
            <div className='col-12 mt-1 h-100 w-100'>
                <GradoSelect onGradoChange={handleGradoChange} opcionTodos={true} />
                <BecaSelect onBecaChange={handleBecaChange} opcionTodos={true}/>
                <TableGenerator data={datosFiltrados ?  datosFiltrados : [{'Estado': 'Cargando...'}]}/>
            </div>
        </div>
    )
}

export default BodyReport8;