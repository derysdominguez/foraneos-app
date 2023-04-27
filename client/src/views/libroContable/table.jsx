
import React, { useState, useEffect } from 'react';
import { Alert, Button, Form, ListGroup, Modal } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import {AiOutlineEdit} from 'react-icons/ai'
import { BsEraserFill } from 'react-icons/bs'
import Swal from 'sweetalert2'

function TableGenerator(props) {
  
  const { dataCompleta } = props;
  
  const data = dataCompleta.map(({asientodetalles, ...resto})=> resto)
  const subData = dataCompleta.map(({asientodetalles, ...resto})=> asientodetalles)
  const subDataHeaders = ['Cuenta', 'Debe', 'Haber'];

  const [showModal, setShowModal] = useState(false);
  const [valor, setValor] = useState('');
  const [allAsientos, setAllAsientos] = useState([])
  const [showSuccess, setShowSuccess] = useState(false);
  const [showDanger, setShowDanger] = useState(false);
  const [showDanger2, setShowDanger2] = useState(false);
  const [code, setCodigo] = useState()

  const [infoAsiento, setInfoData] = useState({
      descripcion : '', 
      fecha : '2023-04-23'
  })

  const [asientos, setAsientos] = useState({
      cuenta: '', 
      naturaleza: 'Deudor', 
      monto: ''
  })

  /**
   * ? Obtencion de datos
   */

  const handleChange = (event) => {
      const { name, value } = event.target;
      setAsientos({
          ...asientos,
          [name]: value
      });
      if (event.target.name === "cuenta") {
          setValor(buscar(event.target.value));
      }
      /* if(event.target.name === "buscar"){
          setValor(event.target.value)
      } */
  }
  
  const handleChange2 = (event) => {
      const { name, value } = event.target;
      setInfoData({
          ...infoAsiento,
          [name]: value
      });
  }

  /**
   * ? Validaciones / Creacion de asiento contable con detalles
   */
  const handleSubmit = async (event) => {
      event.preventDefault();
      const { fecha, descripcion } = infoAsiento
      
      const debe = allAsientos.reduce((acum, value) => {
          return value.naturaleza === 'Deudor' ? (acum + Number(value.monto)) : acum;
      }, 0)
      
      const haber = allAsientos.reduce((acum, value) => {
          return value.naturaleza === 'Acreedor' ? (acum + Number(value.monto)) : acum;
      }, 0)

      const errorMsg = (!fecha || !descripcion) ? 'Tiene que ingresar la descripción y la fecha'
      : !allAsientos.length ? 'Para ingresar el asiento, debe agregar los movimientos (debe/haber)'
      : debe !== haber ? 'La cantidad del lado deudor no es igual al del lado acreedor'
      : '';

      if (errorMsg) {
          return Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: errorMsg,
          });
      }

      /**
       * ? Se ejecuta solo si no hay mensajes de error (errorMsg)
       * Primero se asigna los valores a enviarAsientos
       */

      const asientosDetallesConvertidos = allAsientos.map(asiento => {
          const lado = asiento.naturaleza === 'Deudor' ? 'd' : 'h';
          return {
              lado: lado,
              monto: asiento.monto,
              cuentaid: asiento.cuenta,
          };
      });

      const enviarCompletos = {
          'fecha_asiento' : fecha, 
          'descripcion' : descripcion, 
          'asientodetalles' : asientosDetallesConvertidos
      }
      
      try {
          const response = await fetch(`http://localhost:4000/asientos/${code}`, {
              method: 'PUT',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify(enviarCompletos),
          });
          const dataCenter = await response.json();
          console.log(enviarCompletos)
          if (dataCenter.message) {
              return Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: 'La fecha debe estar en el rango del mes actual hasta el momento, sin dias futuros',
              });
          }
      } catch (error) {
          console.log(error)
      }

      Swal.fire({
      icon: 'success',
      title: 'Asiento Modificado!',
      text: 'Revisa la tabla para mas detalles.',
      }).then(handeSuccess);
  }

  const handleSubmit2 = (event) => {
      event.preventDefault();

      const existeValor = allAsientos.some(element => element.cuenta === asientos.cuenta);

      if(existeValor==false){
          console.log(existeValor)
          if(asientos.cuenta && asientos.monto && asientos.naturaleza && !existeValor){
              setAllAsientos(prevAsientos => [...prevAsientos, asientos])
              setValor('')
              setAsientos({
                  cuenta: '', 
                  naturaleza: 'Deudor', 
                  monto: ''
              })
              setShowSuccess(true)
              setShowDanger(false)
              setShowDanger2(false)
          }else{
              setShowSuccess(false)
              setShowDanger(true)
              setShowDanger2(false)
          }
      }else{
          setShowSuccess(false)
          setShowDanger(false)
          setShowDanger2(true)
      }
  }

  const handeSuccess = () =>{
      setAllAsientos([])
      setAsientos({
          cuenta: '', 
          naturaleza: 'Deudor', 
          monto: ''
      })
      setValor('')
      setInfoData({
          descripcion : '', 
          fecha : '2023-04-23'
      })
      setShowSuccess(false)
      setShowDanger(false)
      setShowModal(false)
  }

  const handleClose = () => {
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
              setAllAsientos([])
              setAsientos({
                  cuenta: '', 
                  naturaleza: 'Deudor', 
                  monto: ''
              })
              setValor('')
              setInfoData({
                  descripcion : '', 
                  fecha : '2023-04-23'
              })
              setShowSuccess(false)
              setShowDanger(false)
              setShowModal(false)
              Swal.fire(
                  'Operación cancelada!',
                  'Puede volver a sus actividades normales.',
                  'error'
              )
          }
      })
  }

  const handleDelete = (index) => {
      const newAsientos = [...allAsientos]
      newAsientos.splice(index, 1)
      setAllAsientos(newAsientos)
  }

  const handleShow = (index) => {
    /**
     * ? mismos metodos que la vista principal
     */
    setInfoData({
      'descripcion' : dataCompleta[index].descripcion, 
      'fecha' : dataCompleta[index].fecha 
    })

    const inversa = dataCompleta[index].asientodetalles.map(asiento => {     
      return {
          naturaleza: asiento.lado === 'd' ? 'Deudor' : 'Acreedor',
          monto: asiento.monto,
          cuenta: asiento.cuenta.codigo,
      };
    });

    setCodigo(dataCompleta[index].codigo)
    setAllAsientos(inversa)
    setShowModal(true)
  };
  


  const buscar = (index) =>{
    const element = dataURL.find(item => item.codigo === index)
    return element ? element.nombre : ''
  }


  const handleDelete2 = async (index) => { 
    Swal.fire({
        title: 'Eliminar',
        text: "Estas seguro de eliminar este elemento?",
        icon: 'info',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Eliminar', 
        cancelButtonText: 'Cancelar'
    }).then(async (result) => {
        if (result.isConfirmed) {
          try {
              const response = await fetch(`http://localhost:4000/asientos/${data[index].codigo}`, {
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

  const url = 'http://localhost:4000/cuentas'
  const url2 = 'http://localhost:4000/asientos/'

  const [dataURL, setDataURL] = useState([])
  const [data2, setData2] = useState([])

  const api = async () => {
    try {
        const [response, response2] = await Promise.all([fetch(url), fetch(url2)])
        const [lbJSON, lbJSON2] = await Promise.all([response.json(), response2.json()])
        const newLBSON = lbJSON.map(({ codigo, nombre }) => ({ codigo, nombre }));
        const newLBSON2 = lbJSON2.map(({ codigo, fecha_asiento, descripcion, asientodetalles }) => ({ codigo, fecha : fecha_asiento, descripcion, asientodetalles }));
        setDataURL(newLBSON)
        setData2(newLBSON2)
    } catch (error) {
        console.error(error)
    }
  }

  useEffect(()=> {
    api()
  }, [allAsientos])

  const renderTableHeader = () => {
    return (
      <thead>
        <tr>
          {Object.keys(data[0]).map((key) => {
            return <th key={key}>{key.charAt(0).toUpperCase() + key.slice(1).toLowerCase()}</th>;
          })}
          <td rowSpan={data.length} className='text-center'>Acciones</td>
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
            <React.Fragment key={key}>
              <tr className='align-middle border-top border-bottom' style={{backgroundColor: '#fafbe3'}} key={key}>
                {Object.values(item).map((value, index) => {
                  const key = `col-${index}`;
                  return <td className='align-center' key={key}>{value}</td>;
                })}
                <td className='d-flex gap-1 justify-content-center'>
                  <Button variant='warning' onClick={()=>handleShow(index)}><AiOutlineEdit/></Button>
                  <Button variant='danger' onClick={()=>handleDelete2(index)}><BsEraserFill/></Button>
                </td>
              </tr>
              {subData[index].length > 0 && (
                <React.Fragment>
                  <tr>
                    {subDataHeaders.map((header, indexHeader) => (
                      <th key={`header-${indexHeader}`} colSpan={header === 'Cuenta' ? 2 : 1}>{header}</th>
                    ))}
                  </tr>
                  {subData[index].sort((a, b) => {
                      if (a.lado === 'd' && b.lado === 'h') return -1;
                      if (a.lado === 'h' && b.lado === 'd') return 1;
                      return 0;
                  }).map((detalle, indexDetalle) => {
                    const key = `row-${index}-detalle-${indexDetalle}`;
                    return (
                      <React.Fragment key={key}>
                        <tr className='table-light' key={key}>
                          <td colSpan={2}>{detalle.cuenta.codigo} {detalle.cuenta.nombre}</td>
                          <td>{detalle.lado === 'd' ? detalle.monto : ''}</td>
                          <td>{detalle.lado === 'h' ? detalle.monto : ''}</td>
                        </tr>
                      </React.Fragment>
                    );
                  })}
                  <tr>
                    <td colSpan={4}></td>
                  </tr>
                </React.Fragment>
              )}
            </React.Fragment>
          );
        })}
      </tbody>
    );
  };
  

  return (
      <>
        <Table borderless hover>
          {renderTableHeader()}
          {renderTableRows()}
        </Table>
        <Modal show={showModal} onHide={handleClose} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton>
                    <Modal.Title>Nuevo asiento contable</Modal.Title>
                </Modal.Header>
                <Modal.Body className='d-flex gap-3'>
                    <div className='col py-2 px-4'>
                        <Form>
                            <Form.Group className='mb-3'>
                                <Form.Label>Descripcion</Form.Label>
                                <Form.Control name='descripcion' as="textarea" rows={2} value={infoAsiento.descripcion} onChange={handleChange2} placeholder="Ingrese una descripcion completa del asiento"></Form.Control>
                            </Form.Group>
                            <Form.Group className='mb-4'>
                                <Form.Label>Fecha</Form.Label>
                                <Form.Control name='fecha' type='date' value={infoAsiento.fecha} onChange={handleChange2}></Form.Control>
                            </Form.Group>
                            <Form.Group className='mb-3'>
                                <Form.Label>Cuenta</Form.Label>
                                <div className='d-flex p-0 gap-3'>
                                    {/* <Form.Control name='buscar' value={valor} onChange={handleChange} type='text' placeholder='Buscar...'></Form.Control> */}
                                    <Form.Select name='cuenta' value={asientos.cuenta} onChange={handleChange}>
                                        <option disabled value={''}>Seleccion una cuenta</option>
                                        {dataURL ? dataURL.map((element, index) => (
                                            <option key={index} value={element.codigo}>{element.nombre}</option>
                                        )) : <option disabled>Cargando...</option>}
                                    </Form.Select>
                                </div>
                            </Form.Group> 
                            <Form.Group className='mb-3'>
                                <Form.Label>Movimiento</Form.Label>
                                <Form.Select name='naturaleza' value={asientos.naturaleza} onChange={handleChange}>
                                    <option value={"Deudor"}>Debe</option>
                                    <option value={"Acreedor"}>Haber</option>
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className='mb-3'>
                                <Form.Label>Monto</Form.Label>
                                <Form.Control name='monto' value={asientos.monto} onChange={handleChange} type='number' placeholder="Ingrese monto" min={2500} max={75000}></Form.Control>
                            </Form.Group>
                            
                            <Alert show={showDanger} variant="danger">
                                <p className='m-0'>
                                    Rellene todos los datos.
                                </p>
                            </Alert>
                            <Alert show={showSuccess} variant="success" className='d-flex align-items-center'>
                                <p className='m-0'>
                                    Movimiento creado. 
                                </p>
                            </Alert>
                            <Alert show={showDanger2} variant="danger" className='d-flex align-items-center'>
                                <p className='m-0'>
                                    Las cuentas solo pueden estar en un lado (debe / haber)
                                </p>
                            </Alert>          
                            <Form.Group className='mb-2 d-flex'>
                                <Button className='col' variant="secondary" type="button" onClick={handleSubmit2}>
                                    Agregar partida (Debe / Haber)
                                </Button>
                            </Form.Group>
                            <Form.Group className='mb-3 d-flex gap-2'>
                                <Button className='col' variant="danger" type="button" onClick={handleClose}>
                                    Cancelar
                                </Button>
                                <Button className='col' variant="success" type="submit" onClick={handleSubmit}>
                                    Actualizar 
                                </Button>
                            </Form.Group>
                        </Form>
                    </div>
                    <div className='col bg-color-brand p-5 rounded shadow-lg '>
                        <ListGroup className='col mb-3'>
                            <ListGroup.Item>Debe</ListGroup.Item>
                            {allAsientos.filter(asiento => asiento.naturaleza === 'Deudor').map((asiento, index) => (
                                <ListGroup.Item key={index}  className="d-flex justify-content-between align-items-center">{buscar(asiento.cuenta)} - {asiento.monto}
                                    <Button variant="danger" onClick={() => handleDelete(allAsientos.indexOf(asiento))}>X</Button> 
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                        <ListGroup className='col'>
                            <ListGroup.Item>Haber</ListGroup.Item>
                            {allAsientos.filter(asiento => asiento.naturaleza === 'Acreedor').map((asiento, index) => (
                                <ListGroup.Item key={index} className="d-flex justify-content-between align-items-center">{buscar(asiento.cuenta)} - {asiento.monto}
                                    <Button variant="danger" onClick={() => handleDelete(allAsientos.indexOf(asiento))}>X</Button> 
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    </div>
                </Modal.Body>
            </Modal>
      </>
  );
}

export default TableGenerator;