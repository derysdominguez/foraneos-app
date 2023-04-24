import React, { useState} from "react";
import { Table, Button, Modal, Form } from "react-bootstrap";
import { AiOutlineEdit } from "react-icons/ai";

function TableCancelacion(props) {
  const { data } = props;
  const [showModal, setShowModal] = useState(false);

  const handleShow = (va) => {
    console.log("Called");
  };

  const renderTableHeader = () => {
    return (
      <thead>
        <tr>
          {Object.keys(data[0]).map((key) => {
            return (
              <th key={key}>
                {key.charAt(0).toUpperCase() + key.slice(1).toLowerCase()}
              </th>
            );
          })}
        </tr>
      </thead>
    );
  };

  const renderModal = () => {
    return (
      <Modal
        show={showModal}
        onHide={handleClose}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Datos del alumno</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {Object.keys(dateMen).map((propiedad, index) => (
              <Form.Group key={index} className="mb-3 d-flex">
                <Form.Label className="d-flex col-2 align-items-center m-0">
                  <span>{propiedad}</span>
                </Form.Label>
                <Form.Control
                  className="col"
                  type="text"
                  defaultValue={dateMen[propiedad] ? dateMen[propiedad] : "-"}
                />
              </Form.Group>
            ))}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Regresar
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Retirar alumno
          </Button>
        </Modal.Footer>
      </Modal>
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
              <td className="d-flex gap-1 justify-content-center">
                <Button variant="warning" onClick={() => handleShow(index)}>
                  <AiOutlineEdit />
                </Button>
              </td>
            </tr>
          );
        })}
      </tbody>
    );
  };

  return (
    <Table striped bordered hover>
      {renderTableHeader()}
      {renderTableRows()}
    </Table>
  );
}

export default TableCancelacion;
