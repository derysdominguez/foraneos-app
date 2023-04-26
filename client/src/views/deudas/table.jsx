import React, {useState} from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import {AiOutlineEdit} from 'react-icons/ai'
import { BsFillEraserFill } from 'react-icons/bs';
import Swal from 'sweetalert2'

function TableGenerator(props) {
  const { data } = props;
  const [deudasModal, setDeudasModal] = useState(false);

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

  const [ deudas, setDeudas ] = useState({
    'acreedor' : '', 
    'cuota' : '',
    'monto_total' : '', 
    'fecha_adquirida' : new Date().toISOString().substring(0, 10), 
    'fecha_finalizacion' : new Date().toISOString().substring(0, 10),
    'tasa' : ''
  }) 

  const handleChange = (event) => {
    const { name, value } = event.target;
    setDeudas((prevState) => ({
        ...prevState,
        [name]: value
    }));
  };

  const handleSubmit = async (event, index) => {

    event.preventDefault();

    console.log(index)

    const { acreedor, cuota, monto_total, tasa, fecha_adquirida, fecha_finalizacion, id } = deudas
    let errorMsg = ''

    if (acreedor && cuota && monto_total && tasa && fecha_adquirida && fecha_finalizacion) {
        if (tasa>= 0 && tasa<=1){
            if ( new Date(fecha_adquirida) < new Date(fecha_finalizacion) ){
                if(cuota < monto_total){
                    try {
                        const response = await fetch(`http://localhost:4000/deudas/${id}`, {
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(deudas),
                        });
                        const dataCenter = await response.json();

                        console.log(dataCenter.message)
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
        title: 'Actualizado con exito',
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

  const handleShow =  (dataVer) => {
    setDeudas(data[dataVer])
    setDeudasModal(true)
  }

  const handleDelete = async (index) => { 
    Swal.fire({
        title: 'Eliminar',
        text: "Estas seguro de eliminar este item?",
        icon: 'info',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Eliminar', 
        cancelButtonText: 'Cancelar'
    }).then(async (result) => {
        if (result.isConfirmed) {
          try {
              const response = await fetch(`http://localhost:4000/deudas/${data[index].id}`, {
                  method: 'DELETE',
              });
          } catch (error) {
              console.log(error)
          }
          Swal.fire({
              icon: 'success',
              title: 'Eliminado con exito',
              text: 'Revisa la tabla para mas detalles.',
          })
        }
    })
  }

  const renderTableHeader = () => {
    return (
      <thead>
        <tr>
          {Object.keys(data[0]).map((key) => {
            return <th key={key}>{key.charAt(0).toUpperCase() + key.slice(1).toLowerCase()}</th>;
          })}
          <th className='text-center'>Acciones</th>
        </tr>
      </thead>
    );
  };

  const renderTableRows = () => {
    return (
      <tbody>
        {data.map((item, index) => {
          // Generar una clave única
          const key = `row-${index}`;
  
          return (
            <tr key={key}>
              {Object.values(item).map((value, index) => {
                const key = `col-${index}`;
                return <td key={key}>{value}</td>;
              })}
              
              <td className='d-flex gap-1 justify-content-center'>
                <Button variant='warning' onClick={()=>handleShow(index)}><AiOutlineEdit/></Button>
                <Button variant='danger' onClick={()=>handleDelete(index)} ><BsFillEraserFill /></Button>
              </td>
            </tr>
          );
        })}
      </tbody>
    );
  };
  

  return (
      <div>
        <Table striped bordered hover>
          {renderTableHeader()}
          {renderTableRows()}
        </Table>
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
                              Actualizar 
                          </Button>
                      </Form.Group>
                  </Form>
              </div>
          </Modal.Body>
        </Modal>
      </div>
  );
}

export default TableGenerator;
