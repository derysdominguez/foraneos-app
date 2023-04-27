import React, { useState, useEffect } from 'react';
import { Alert, Button, Modal, Form } from 'react-bootstrap';
import { BiBookAdd, BiEraser } from "react-icons/bi";
import Swal from 'sweetalert2'
import TableGenerator from './tableBtns';

const Body = () => {
    
    /**
     * ? Configuracion modals
     */
    const [cuenta, setCuenta] = useState(false);
    const handleShowCuenta = () => setCuenta(true);

    const handleCloseCuenta = () => {
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
                handleSuccess()
                setCuenta(false)
            }
        })
    }

    /**
     * ? Get Apis
     */
    const [allCuentas, setAllCuentas] = useState('')
    
    const getCuentas = async () => {
        try {
            const response = await fetch('http://localhost:4000/cuentas');
            const data = await response.json();
            const filterData = data.map(({naturaleza,...resto})=> resto)
            setAllCuentas(filterData)
        } catch (error) {
            console.error('Error al obtener las cuentas:', error);
        }
    }

    /**
     * ? Metodo post cuentas / para ingresar nuevas cuentas con numeracion
     */
    
    const [valorCuenta, setValorCuentas] = useState({
        'codigo' : '', 
        'nombre' : '', 
        'clasificacion' : 'activo'
    })

    const handleChange = (event) => {
        const { name, value } = event.target;
        setValorCuentas((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };


    const handleSubmit = async (event) => {
        event.preventDefault();
        const { codigo, nombre, clasificacion } = valorCuenta;
        let errorMsg = '';
        const equivalencias = {
            '100': 'activo',
            '200': 'pasivo',
            '300': 'patrimonio',
            '400': 'ingreso',
            '500': 'gastos-admin',
            '600': 'gastos-ventas'
        }

        if (!nombre || !clasificacion) {
            errorMsg = 'Rellene el dato de nombre y clasificación';
        } else {
            if (equivalencias[codigo.slice(0, 3)] === clasificacion) {
                if(codigo.length>=4 && codigo.length<=20){
                    try {
                        const response = await fetch('http://localhost:4000/cuentas', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(valorCuenta),
                        });
                        const dataCenter = await response.json();
                    } catch (error) {
                        errorMsg = 'Dato ya existe';
                    }
                }else{
                    errorMsg = 'El codigo debe tener un tamaño minimo de 4 y maximo de 20';
                }
            }else{
                errorMsg = `El codigo no es de la clasificacion ${clasificacion}`
            }
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
    };

    const handleSuccess = () =>{
        setValorCuentas({
            'codigo' : '', 
            'nombre' : '', 
            'clasificacion' : 'pasivo'
        })
        setCuenta(false)
    }

    useEffect(()=> {
        getCuentas()
    }, [allCuentas])

    return (
        <div className='bodyText bg-white w-100 p-4 rounded d-flex align-items-start d-flex gap-2 flex-wrap justify-content-evenly'>
            <div className='bg-color-brand gap-2 w-100 p-3 rounded text-white d-flex justify-content-between align-items-center'>
                <span className='w-50'>Libro Diario Contable</span>
                <Form.Select className='w-25'>
                    <option value={'activo'}>activo</option>
                    <option value={'pasivo'}>Pasivos</option>
                    <option value={'patrimonio'}>Patrimonios</option>
                    <option value={'ingreso'}>Ingresos</option>
                    <option value={'gasto-admin'}>Gastos de administracion</option>
                    <option value={'gasto-ventas'}>Gastos de ventas</option>
                </Form.Select>
                <div className='w-25 d-flex justify-content-between align-items-center gap-2'>
                    <Button className='d-flex w-100 align-items-center fw-bold' variant="light" onClick={handleShowCuenta} >
                        <BiBookAdd className='me-2'/>
                        <span>
                            Cuenta
                        </span>
                    </Button>
                </div>
            </div>
            <div className='w-100 overflow-auto p-0 d-flex rounded align-items-center justify-content-center'>
                <div className='col-12 mt-1 w-100 h-libroContable'>
                    
                    {allCuentas.length > 0 ? (
                        <TableGenerator data={allCuentas} />
                        ) : (
                        <div>Cargando...</div>
                    )}

                    <Modal show={cuenta} onHide={handleCloseCuenta} aria-labelledby="contained-modal-title-vcenter" centered>
                        <Modal.Header closeButton>
                            <Modal.Title>Creacion de cuentas</Modal.Title>
                        </Modal.Header>
                        <Modal.Body className='d-flex gap-3'>
                            <div className='col py-2 px-4'>
                                <Form>
                                    <Form.Group className='mb-3'>
                                        <Form.Label>Codigo</Form.Label>
                                        <Form.Control name='codigo' value={valorCuenta.codigo} onChange={handleChange} type='number' placeholder="Ingrese "></Form.Control>
                                    </Form.Group>
                                    <Form.Group className='mb-3'>
                                        <Form.Label>Nombre</Form.Label>
                                        <Form.Control name='nombre' value={valorCuenta.nombre} onChange={handleChange} type='text' placeholder="Ingrese "></Form.Control>
                                    </Form.Group>
                                    <Form.Group className='mb-3'>
                                        <Form.Label>Clasificacion</Form.Label>
                                        <Form.Select name='clasificacion' value={valorCuenta.clasificacion} onChange={handleChange}>
                                            <option value={'activo'}>Activos</option>
                                            <option value={'pasivo'}>Pasivos</option>
                                            <option value={'patrimonio'}>Patrimonios</option>
                                            <option value={'ingreso'}>Ingresos</option>
                                            <option value={'gasto-admin'}>Gastos de administracion</option>
                                            <option value={'gasto-ventas'}>Gastos de ventas</option>
                                        </Form.Select>
                                    </Form.Group>
                                    <Form.Group className='mb-3 d-flex gap-2'>
                                        <Button className='col' variant="danger" type="button" onClick={handleCloseCuenta}>
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
