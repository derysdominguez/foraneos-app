import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import BarraLateral from '../../components/barraLateral'
import HeaderTitle from '../../components/Reportes/header'
import HeaderReport from '../../components/Reportes/headerReport'
import BodyReport6 from '../../components/Reportes/rep6/bodyReport'
import BtnInferiores from './imprimir'
import Pdf from 'react-to-pdf'
const ref = React.createRef()
function Rep6() {
  const Title = 'Informe de porcentaje de alumnos'
  const Subtitle = 'Becados por grado'
  const fechaEmision = new Date();
  const options = {
    orientation: 'landscape',
    unit: 'in',
    format: [13, 11]
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
              <div className='bodyText bg-white w-100  p-4 rounded d-flex align-items-center d-flex gap-2 flex-wrap justify-content-evenly'>
                {/* Hacer a componente body report */}
                <div className='w-100' ref={ref}>
                <HeaderReport
                  title={Title}
                  subtitle={Subtitle}
                  dateReport={fechaEmision.toLocaleDateString()}
                />
                {/* Cuerpo del report */}
                <BodyReport6 />
                </div>
                {/* Botones inferiores */}
                <BtnInferiores>
                  <Pdf
                    targetRef={ref}
                    filename='reporte_becas.pdf'
                    options={options}
                    x={0.5}
                    y={0.5}
                    scale={0.8}>
                    {({ toPdf }) => (
                      <button
                        onClick={toPdf}
                        className='btn btn-primary px-3 d-flex align-items-center me-1'>
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

export default Rep6
