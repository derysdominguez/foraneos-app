import { Table, Button, Modal, Form } from 'react-bootstrap'
import { AiOutlineEdit } from 'react-icons/ai'
export function TablaAlumnos({data}) {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Código</th>
          <th>Grado</th>
          <th>Estado</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => {
          // Generar una clave única
          const key = `row-${index}`

          return (
            <tr key={key}>
              {Object.values(item).map((value, index) => {
                const key = `col-${index}`
                return <td key={key}>{value}</td>
              })}
              <td className='d-flex gap-1 justify-content-center'>
                <Button variant='warning' onClick={() => handleShow(index)}>
                  <AiOutlineEdit />
                </Button>
              </td>
            </tr>
          )
        })}
      </tbody>
    </Table>
  )
}
