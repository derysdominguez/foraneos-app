import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import BarraLateral from '../../components/barraLateral'
import HeaderTitle from '../../components/Reportes/header'
import HeaderReport from '../../components/Reportes/headerReport'
import BodyReport2 from '../../components/Reportes/rep2/bodyReport2'
import BtnInferiores from './imprimir'
import Pdf from 'react-to-pdf'
const ref = React.createRef()
function Rep2() {
  const Title = 'Informe de deudas'
  const Subtitle = 'Mes de marzo'
  const fechaEmision = new Date();
  const options = {
    orientation: 'landscape',
    unit: 'in',
    format: [13, 8],
  }
  return (
    <>
      <Container fluid>
        <Row>
          <Col
            className='bg-control min-vh-100 min-vh d-flex rounded-end-nav '
            xs
            md={3}
            lg={3}
            xl={2}>
            <BarraLateral></BarraLateral>
          </Col>
          <Col
            className='min-vh-100 min-vh d-flex px-5 py-4'
            xs
            md={9}
            lg={9}
            xl={10}>
            <div className='d-flex flex-column w-100 align-items-center gap-4'>
              <HeaderTitle></HeaderTitle>
              <div className='bodyText bg-white w-100 h-control p-4 rounded d-flex align-items-center d-flex gap-2 flex-wrap justify-content-evenly'>
                <div className='w-100' ref={ref}>
                  {/* Hacer a componente body report */}
                  <HeaderReport
                    title={Title}
                    // subtitle={Subtitle}
                    dateReport={fechaEmision.toLocaleDateString()}></HeaderReport>
                  {/* Cuerpo del report */}
                  <BodyReport2></BodyReport2>
                  {/* Botones inferiores */}
                </div>
                <BtnInferiores>
                  <Pdf
                    targetRef={ref}
                    filename='reporte_deudas.pdf'
                    options={options} x={.5} y={.5} scale={0.8}>
                    {({ toPdf }) => (
                      <button onClick={toPdf} className='btn btn-primary px-3 d-flex align-items-center me-1'>

                        <span>Imprimir</span>
                      </button>
                    )}
                  </Pdf>
                </BtnInferiores>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Rep2
