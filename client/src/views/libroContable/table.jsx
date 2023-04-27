
import React from 'react';
import { Button } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import {AiOutlineEdit} from 'react-icons/ai'

function TableGenerator(props) {
  
  const { dataCompleta } = props;
  
  const data = dataCompleta.map(({asientodetalles, ...resto})=> resto)
  const subData = dataCompleta.map(({asientodetalles, ...resto})=> asientodetalles)
  const subDataHeaders = ['Cuenta', 'Debe', 'Haber'];

  console.log(subData);

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
                  <Button variant='warning'><AiOutlineEdit/></Button>
                  <Button variant='warning'><AiOutlineEdit/></Button>
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
      <Table borderless hover>
        {renderTableHeader()}
        {renderTableRows()}
      </Table>
  );
}

export default TableGenerator;