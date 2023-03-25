import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import TableRep6 from "./dataTable";
import BarChart from "./graficoBarraDoble";


function BodyReport6() {
    /* Solo debes de llenar con los datos de la bd */
    const value1 = [1,2,1,2,3,4,5,6,7,8,9,10,11,12];
    const value2 = [3,4,1,7,3,8,5,6,7,8,5,4,3,1];

    return(
        <div className='w-100 h-50 overflow-auto p-2 d-flex rounded align-items-center justify-content-center'>
            <div className='col-12 mt-1 h-100 w-100'>
                <Container>
                    <Row>
                        <Col>
                            <TableRep6/>
                        </Col>
                    </Row>  
                    <Row>
                        <Col className="d-flex justify-content-center flex-column align-items-center">
                            <h6 className="mt-1">Comparacion alumnos becados por grado</h6>
                            <div className="w-50 d-flex align-items-center justify-content-center">
                                <BarChart becados={value1} mediaBeca = {value2} />
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    )
}

export default BodyReport6;