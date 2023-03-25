import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import TableGenerator from "../tablaGenerator";




function BodyReport9() {
    /* Solo debes de llenar con los datos de la bd */
    const data = [
        {   
            'No.': 1,
            Nombre: 'ASHLEY MARTINEZ', 
            Codigo: 20222023046,
            'Fecha de cancelacion': '14/08/2022',
            Grado: 'Séptimo',
            Motivo: 'Retirado de la escuela'
        }
    ];
    
    return(
        <div className='w-100 h-50 overflow-auto p-2 d-flex rounded align-items-center justify-content-center'>
            <div className='col-12 mt-1 h-100 w-100'>
                <Container>
                    <Row>
                        <Col>
                            <TableGenerator data={data}/>
                        </Col>
                    </Row>  
                </Container>
            </div>
        </div>
    )
}

export default BodyReport9;