import Table from 'react-bootstrap/Table';

function TableRep1(props) {
  return (
    <>
      <h6 className='fs-6'>{props.nombre}</h6>
      <hr></hr>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Fecha</th>
            <th>Cuenta</th>
            <th>Descripcion</th>
            <th>Monto</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>25/12/2022</td>
            <td>202000514</td>
            <td>@mdo</td>
            <td>1500</td>
          </tr>
          <tr>
            <td>2</td>
            <td>25/12/2022</td>
            <td>202000515</td>
            <td>@fat</td>
            <td>2500</td>
          </tr>
          <tr>
            <td>2</td>
            <td>25/12/2022</td>
            <td>202000515</td>
            <td>@fat</td>
            <td>2500</td>
          </tr>
          <tr>
            <td>2</td>
            <td>25/12/2022</td>
            <td>202000515</td>
            <td>@fat</td>
            <td>2500</td>
          </tr>
          <tr>
            <td>2</td>
            <td>25/12/2022</td>
            <td>202000515</td>
            <td>@fat</td>
            <td>2500</td>
          </tr>
          <tr>
            <td colSpan={4} className="bg-secondary text-white">Total</td>
            <td className="bg-secondary text-white">11500</td>
          </tr> 
        </tbody>
      </Table>
    </>
  );
}

export default TableRep1;