import React, { useEffect, useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { BiBookAdd } from "react-icons/bi";
import TableBtn from '../tablas';

const Body = () => {
    const [showModal, setShowModal] = useState(false);
    const [valor, setValor] = useState('');

    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);
    

    const url = 'https://apimocha.com/testforaneosapp/cuentas'
    const url2 = 'https://apimocha.com/foraneos-app/rep1'

    const [data, setData] = useState()
    const [data2, setData2] = useState()

    const api = async () => {
    try {
        const [response, response2] = await Promise.all([fetch(url), fetch(url2)])
        const [lbJSON, lbJSON2] = await Promise.all([response.json(), response2.json()])
        setData(lbJSON)
        setData2(lbJSON2)
    } catch (error) {
        console.error(error)
    }
    }
    

    useEffect(()=> {
        api()
    }, [])

    const handleSeleccion = (event) => {
        setValor(event.target.value);
    };
    
    const filtrar = data ? data.filter((element) =>
        element.nombre.toLowerCase().includes(valor.toLowerCase()) 
    ) : [];

    return (
        <div className='bodyText bg-white w-100 p-4 rounded d-flex align-items-start d-flex gap-2 flex-wrap justify-content-evenly'>
            <div className='bg-color-brand w-100 p-3 rounded text-white d-flex justify-content-between align-items-center'>
                <span>Libro Diario Contable</span>
                <Button className='d-flex align-items-center fw-bold' variant="light" onClick={handleShow}>
                    <BiBookAdd className='me-2'/>
                    <span>
                        Nuevo movimiento
                    </span>
                </Button>
            </div>
            <div className='w-100 overflow-auto p-0 d-flex rounded align-items-center justify-content-center'>
                <div className='col-12 mt-1 w-100 h-libroContable'>
                    
                </div>
            </div>
            <Modal show={showModal} onHide={handleClose} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton>
                    <Modal.Title>Nuevo asiento contable</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className='mb-3'>
                            <Form.Label>Titulo</Form.Label>
                            <Form.Control type='text' placeholder="Ingrese el numero de asiento" min={2500} max={75000}></Form.Control>
                        </Form.Group>
                        <Form.Group className='mb-3'>
                            <Form.Label>Descripcion</Form.Label>
                            <Form.Control as="textarea" rows={2} placeholder="Ingrese una descripcion completa del asiento"></Form.Control>
                        </Form.Group>
                        <Form.Group className='mb-3'>
                            <Form.Label>Cuenta</Form.Label>
                            <div className='d-flex p-0'>
                                <Form.Control value={valor} onChange={handleSeleccion} type='text' placeholder='Buscar...'></Form.Control>
                                <Form.Select value={valor} onChange={handleSeleccion}>
                                    {filtrar ? filtrar.map((element) => (
                                        <option key={element.cuenta} value={element.nombre}>{element.nombre}</option>
                                    )) : <option disabled>Cargando...</option>}
                                </Form.Select>
                            </div>
                        </Form.Group> 
                        <Form.Group className='mb-3'>
                            <Form.Label>Fecha</Form.Label>
                            <Form.Control type='date' placeholder="2500 < Monto < 7500" min={2500} max={75000}></Form.Control>
                        </Form.Group>
                        <Form.Group className='mb-3'>
                            <Form.Label>Movimiento</Form.Label>
                            <Form.Select>
                                <option>Deudor</option>
                                <option>Acreedor</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className='mb-3'>
                            <Form.Label>Monto</Form.Label>
                            <Form.Control type='text' placeholder="2500 < Monto < 7500" min={2500} max={75000}></Form.Control>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancelar
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Ingresar
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default Body;
