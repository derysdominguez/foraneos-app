import React, { useState, useEffect } from 'react';
import { Button, Form, Modal } from 'react-bootstrap'
import { BiBookAdd } from 'react-icons/bi';
import Swal from 'sweetalert2'
import TableGenerator from './table';

const Body = () => {
    
    const [deudasModal, setDeudasModal] = useState(false);
    const [data, setData] = useState();

    /**
     * ? Modela del objeto
     */

    const [ deudas, setDeudas ] = useState({
        'acreedor' : '', 
        'cuota' : '',
        'monto_total' : '', 
        'fecha_adquirida' : new Date().toISOString().substring(0, 10), 
        'fecha_finalizacion' : new Date().toISOString().substring(0, 10),
        'tasa' : ''
    }) 

    const handleCloseDeudas = () => {
        Swal.fire({
            title: 'Seguro que desea cancelar la operación?',
            text: "Se descartaran los datos ingresados actualmente del formulario!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Abandonar', 
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                setDeudasModal(false)
                setDeudas(
                    {
                        'acreedor' : '', 
                        'cuota' : '',
                        'monto_total' : '', 
                        'fecha_adquirida' : new Date().toISOString().substring(0, 10), 
                        'fecha_finalizacion' : new Date().toISOString().substring(0, 10),
                        'tasa' : ''
                    }
                )
            }
        })
    }
    const handleShowDeudas = () => setDeudasModal(true)
    
    const handleChange = (event) => {
        const { name, value } = event.target;
        setDeudas((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (event) => {

        event.preventDefault();

        const { acreedor, cuota, monto_total, tasa, fecha_adquirida, fecha_finalizacion } = deudas
        let errorMsg = ''

        if (acreedor && cuota && monto_total && tasa && fecha_adquirida && fecha_finalizacion) {
            if (tasa>= 0 && tasa<=1){
                if ( new Date(fecha_adquirida) < new Date(fecha_finalizacion) ){
                    if(cuota < monto_total){
                        try {
                            const response = await fetch('http://localhost:4000/deudas/', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify(deudas),
                            });
                            const dataCenter = await response.json();
                        } catch (error) {
                            errorMsg = 'Dato ya existe';
                        }
                    }else{
                        errorMsg = 'La cuota debe ser menor a monto total'
                    }
                }else{
                    errorMsg = 'Fecha de aquisicion debe ser menor a la de finalizacion'
                }
            }else{
                errorMsg = 'La tasa tiene que estar entre 0 y 1'
            }
        }else{
            errorMsg = 'Ingrese los datos, antes de ingresar'
        }

        if (errorMsg) {
            return Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: errorMsg,
            });
        }

        Swal.fire({
            icon: 'success',
            title: 'Asiento Agregado',
            text: 'Revisa la tabla para mas detalles.',
        }).then(handleSuccess);   

    }

    const handleSuccess = () => {
        setDeudas({
            'acreedor' : '', 
            'cuota' : '',
            'monto_total' : '', 
            'fecha_adquirida' : new Date().toISOString().substring(0, 10), 
            'fecha_finalizacion' : new Date().toISOString().substring(0, 10),
            'tasa' : ''
        })
        setDeudasModal(false)
    }
    const getDeudas = async () => {
        try {
            const response = await fetch('http://localhost:4000/deudas');
            const data2 = await response.json();

            setData(data2)
        } catch (error) {
            console.error('Error al obtener las cuentas:', error);
        }
    }

    useEffect(()=> {
        getDeudas()
    }, [data])


    return (
        <div className='bodyText bg-white w-100 p-4 rounded d-flex align-items-start d-flex gap-2 flex-wrap justify-content-evenly'>
            <div className='bg-color-brand gap-2 w-100 p-3 rounded text-white d-flex justify-content-between align-items-center'>
                <span className='w-50 fw-bold fs-5  '>Deudas</span>
                <div className='w-25 d-flex justify-content-between align-items-center gap-2'>
                    <Button className='d-flex w-100 align-items-center fw-bold' variant="light" onClick={handleShowDeudas} >
                        <BiBookAdd className='me-2'/>
                        <span>
                            Nueva
                        </span>
                    </Button>
                </div>
            </div>
            <div className='w-100 overflow-auto p-0 d-flex rounded align-items-center justify-content-center'>
                <div className='col-12 mt-1 w-100 h-libroContable'>
                    <TableGenerator data={data ? data : [{'Estado': 'Sin datos'}]}></TableGenerator> 
                    <Modal show={deudasModal} onHide={handleCloseDeudas} aria-labelledby="contained-modal-title-vcenter" centered>
                        <Modal.Header closeButton>
                            <Modal.Title>Creacion de cuentas</Modal.Title>
                        </Modal.Header>
                        <Modal.Body className='d-flex gap-3'>
                            <div className='col py-2 px-4'>
                                <Form>
                                    <Form.Group className='mb-3'>
                                        <Form.Label>Acreedor</Form.Label>
                                        <Form.Control name='acreedor' value={deudas.acreedor} onChange={handleChange} type='text' placeholder="Ingrese el acreedor"></Form.Control>
                                    </Form.Group>
                                    <Form.Group className='mb-3'>
                                        <Form.Label>Cuotas</Form.Label>
                                        <Form.Control name='cuota' value={deudas.cuota} onChange={handleChange} type='number' placeholder="Ingrese la cuota"></Form.Control>
                                    </Form.Group>
                                    <Form.Group className='mb-3'>
                                        <Form.Label>Monto total</Form.Label>
                                        <Form.Control name='monto_total' value={deudas.monto_total} onChange={handleChange} type='number'  placeholder="Ingrese el monto"></Form.Control>
                                    </Form.Group>
                                    <Form.Group className='mb-3'>
                                        <Form.Label>Fecha Adquirida</Form.Label>
                                        <Form.Control name='fecha_adquirida' value={deudas.fecha_adquirida} onChange={handleChange} type='date' ></Form.Control>
                                    </Form.Group>
                                    <Form.Group className='mb-3'>
                                        <Form.Label>Fecha Finalizacion</Form.Label>
                                        <Form.Control name='fecha_finalizacion' value={deudas.fecha_finalizacion} onChange={handleChange} type='date' placeholder="Ingrese "></Form.Control>
                                    </Form.Group>
                                    <Form.Group className='mb-3'>
                                        <Form.Label>Tasa</Form.Label>
                                        <Form.Control name='tasa' value={deudas.tasa} onChange={handleChange} type='number' pattern="\d+(\.\d+)?%" placeholder="Ingrese la cuota"></Form.Control>
                                    </Form.Group>
                                    <Form.Group className='mb-3 d-flex gap-2'>
                                        <Button className='col' variant="danger" type="button" onClick={handleCloseDeudas}>
                                            Cancelar
                                        </Button>
                                        <Button className='col' variant="success" type="submit" onClick={handleSubmit}>
                                            Finalizar 
                                        </Button>
                                    </Form.Group>
                                </Form>
                            </div>
                        </Modal.Body>
                    </Modal>
                </div>
            </div>
        </div>
    );
}

export default Body;
