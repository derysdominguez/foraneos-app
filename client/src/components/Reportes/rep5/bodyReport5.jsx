import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import TableGenerator from "../tablaGenerator";

import LineChart from "./graficoLinea";

function BodyReport5() {
    /* Te muestro ejemplo de como llenarala Derys */
    const url = 'https://apimocha.com/foraneos-app/rep5'
    const [data, setData] = useState()
    const [ganancias, setGanancias] = useState()
    const [sincombinate, setSinCombinate] = useState()

    const api = async () => {
        try {
            const response = await fetch(url);
            const lbJSON = await response.json();
            
            const sinColumnaGanancia = lbJSON.map(item => {
                const {ganancias,...resto} = item
                return resto
            })

            const soloGanancias = lbJSON.map(item => {
                const {ingresos, egresos, ...resto} = item
                return resto
            })

            setGanancias(soloGanancias)
            setSinCombinate(sinColumnaGanancia)
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
                <Container>
                    <Row>
                        {/* <TableRep5/> archivo obsoleto pero por si lo ocupas lo dejare*/}
                        <TableGenerator data={data ? data : [{'Estado': 'Cargando...'}]}/>
                    </Row>  
                    <Row>
                        <Col>
                            <h6 className="mt-4">Ingresos y egresos:</h6>
                            <hr/>
                            <LineChart data={sincombinate ? sincombinate : [{'Estado': 0}]} />
                        </Col>
                        <Col>
                            <h6 className="mt-4">Ganancias: </h6>
                            <hr/>
                            <LineChart data={ganancias ? ganancias : [{'Estado': 0}]} />
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    )
}

export default BodyReport5;