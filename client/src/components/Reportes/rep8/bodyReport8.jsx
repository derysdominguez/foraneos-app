import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import TableGenerator from "../tablaGenerator";




function BodyReport8() {
    /* Solo debes de llenar con los datos de la bd */
    const data = [
        {
            No: 1,
            'Nombre': 'ASHLEY IZAGUIRRE', 
            Código: 20222023046,
            Grado: 'Primero',
            'Tipo de beca': 'Sin beca'
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

export default BodyReport8;