import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import TableRep5 from "./dataTable";
import LineChart from "./graficoLinea";

function BodyReport5() {
    /* Solo debes de llenar con los datos de la bd */
    const data = [
        { Month: 'Enero', Ingresos: 20, Egresos: 10 },
        { Month: 'Febrero', Ingresos: 15, Egresos: 7.5 },
        { Month: 'Marzo', Ingresos: 25, Egresos: 12.5 },
        { Month: 'April', Ingresos: 30, Egresos: 15 },
        { Month: 'Mayo', Ingresos: 35, Egresos: 17.5 },
        { Month: 'Junio', Ingresos: 40, Egresos: 20 },
        { Month: 'Julio', Ingresos: 45, Egresos: 22.5 },
        { Month: 'Agosto', Ingresos: 50, Egresos: 25 },
        { Month: 'Septiembre', Ingresos: 45, Egresos: 22.5 },
        { Month: 'Octubre', Ingresos: 40, Egresos: 20 },
        { Month: 'Nombre', Ingresos: 35, Egresos: 17.5 },
        { Month: 'December', Ingresos: 30, Egresos: 15 }
    ];
    const data2 = [
        { Month: 'Enero', Ganacias: 20},
        { Month: 'Febrero', Ganacias: 15},
        { Month: 'Marzo', Ganacias: 25},
        { Month: 'April', Ganacias: 30},
        { Month: 'Mayo', Ganacias: 35},
        { Month: 'Junio', Ganacias: 40},
        { Month: 'Julio', Ganacias: 45},
        { Month: 'Agosto', Ganacias: 50},
        { Month: 'Septiembre', Ganacias: 45},
        { Month: 'Octubre', Ganacias: 40},
        { Month: 'Nombre', Ganacias: 35},
        { Month: 'December', Ganacias: 30}
    ];
    return(
        <div className='w-100 h-50 overflow-auto p-2 d-flex rounded align-items-center justify-content-center'>
            <div className='col-12 mt-1 h-100 w-100'>
                <Container>
                    <Row>
                        <TableRep5/>
                    </Row>  
                    <Row>
                        <Col>
                            <h6 className="mt-4">Ingresos y egresos:</h6>
                            <hr/>
                            <LineChart data={data} />
                        </Col>
                        <Col>
                            <h6 className="mt-4">Ganancias: </h6>
                            <hr/>
                            <LineChart data={data2} />
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    )
}

export default BodyReport5;