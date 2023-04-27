import React, {useState, useEffect} from "react";
import { Container, Row, Col, Table } from "react-bootstrap";
import BarChart from "./graficoBarraDoble";
import TableGenerator from '../tablaGenerator'


function BodyReport6() {
    /* Solo debes de llenar con los datos de la bd */
    const url = 'http://localhost:4000/alumnos/reporte/totalbecas'
    const [data, setData] = useState()
    const [becaCompleta, setBecaCompleta] = useState()
    const [mediaBeca, setMediaBeca] = useState()
    const [totalBeca, setTotalBeca] = useState()
    const [totalMed, setotalMed] = useState()
    const [totalSin, setotalSin] = useState()
    let sum=0;

    const api = async () => {
        try {
            const response = await fetch(url);
            const lbJSON = await response.json();

            const beca = lbJSON.map(item => {
                const {completa, ...resto} = item
                return completa
            })

            beca.forEach(element => {
                sum += element
            });

            setTotalBeca(sum)
            
            const medbeca = lbJSON.map(item => {
                const {media_beca, ...resto} = item
                return media_beca
            })
            sum = 0
            medbeca.forEach(element => {
                sum += element
            });
            setotalMed(sum)

            const sinbeca = lbJSON.map(item => {
                const {sin_beca, ...resto} = item
                return sin_beca
            })
            sum = 0
            sinbeca.forEach(element => {
                sum += element
            });
            setotalSin(sum)
            
            

            setMediaBeca(medbeca)
            setBecaCompleta(beca)
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
                        <Col>
                            <TableGenerator data={data ? data: [{'Estado':'Cargando...'}]} />
                            <Table striped bordered hover className="mb-5">
                                <tbody>
                                    <tr className="bg-secondary">
                                        <td className="text-center text-white">Total Completos: {totalBeca?totalBeca:'Cargando...'}</td>
                                        <td className="text-center text-white">Total Media Beca: {totalMed?totalMed:'Cargando...'}</td>
                                        <td className="text-center text-white">Total Sin beca: {totalSin?totalSin:'Cargando...'}</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Col>
                    </Row>  
                    <Row>
                        <Col className="d-flex justify-content-center flex-column align-items-center">
                            <h6 className="mt-1">Comparacion alumnos becados por grado</h6>
                            <div className="w-50 d-flex align-items-center justify-content-center">
                                <BarChart becados={becaCompleta ? becaCompleta : [0]} mediaBeca = {mediaBeca ? mediaBeca : [0]} />
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    )
}

export default BodyReport6;