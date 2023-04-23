import Table from 'react-bootstrap/Table';

function TableRep4(props){
  const { data } = props;
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
                return <td className='col-12' key={key}>{value}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    );
  };
  
  return (
    <>
      <Table striped bordered hover className='mt-4'>
        <thead>
          <tr>
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
        {renderTableRows()}
      </Table>
    </>
  );
}

export default TableRep4;