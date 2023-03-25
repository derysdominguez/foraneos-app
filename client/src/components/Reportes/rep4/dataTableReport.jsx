import Table from 'react-bootstrap/Table';

function TableRep4() {
  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th rowSpan={2} className='text-center'>#</th>
            <th rowSpan={2} className='text-center'>Nombre alumno</th>
            <th rowSpan={2} className='text-center'>Codigo</th>
            <th rowSpan={2} className='text-center'>Mensualidad</th>
            <th colSpan={10} className='text-center'>Fechas de pagos por cada mes</th>
          </tr>
          <tr>
            <th className='text-center'>S</th>
            <th className='text-center'>O</th>
            <th className='text-center'>N</th>
            <th className='text-center'>D</th>
            <th className='text-center'>E</th>
            <th className='text-center'>F</th>
            <th className='text-center'>M</th>
            <th className='text-center'>A</th>
            <th className='text-center'>M</th>
            <th className='text-center'>J</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th className='fs-6'>1</th>
            <th className='fs-6'>Ashley Izaguirre</th>
            <th className='fs-6'>20222023046</th>
            <th className='fs-6'>1.325,00</th>
            <th className='fs-6'>17/09</th>
            <th className='fs-6'>17/09</th>
            <th className='fs-6'>17/09</th>
            <th className='fs-6'>17/09</th>
            <th className='fs-6'>17/09</th>
            <th className='fs-6'>17/09</th>
            <th className='fs-6'>17/09</th>
            <th className='fs-6'>17/09</th>
            <th className='fs-6'>17/09</th>
            <th className='fs-6'>17/09</th>
          </tr>
          <tr>
            <th className='fs-6'>1</th>
            <th className='fs-6'>Ashley Izaguirre</th>
            <th className='fs-6'>20222023046</th>
            <th className='fs-6'>1.325,00</th>
            <th className='fs-6'>17/09</th>
            <th className='fs-6'>17/09</th>
            <th className='fs-6'>17/09</th>
            <th className='fs-6'>17/09</th>
            <th className='fs-6'>17/09</th>
            <th className='fs-6'>17/09</th>
            <th className='fs-6'>17/09</th>
            <th className='fs-6'>17/09</th>
            <th className='fs-6'>17/09</th>
            <th className='fs-6'>17/09</th>
          </tr>
          <tr>
            <th className='fs-6'>1</th>
            <th className='fs-6'>Ashley Izaguirre</th>
            <th className='fs-6'>20222023046</th>
            <th className='fs-6'>1.325,00</th>
            <th className='fs-6'>17/09</th>
            <th className='fs-6'>17/09</th>
            <th className='fs-6'>17/09</th>
            <th className='fs-6'>17/09</th>
            <th className='fs-6'>17/09</th>
            <th className='fs-6'>17/09</th>
            <th className='fs-6'>17/09</th>
            <th className='fs-6'>17/09</th>
            <th className='fs-6'>17/09</th>
            <th className='fs-6'>17/09</th>
          </tr>
        </tbody>
      </Table>
    </>
  );
}

export default TableRep4;