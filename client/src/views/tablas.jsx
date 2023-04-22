import React from 'react';
import {Table, Button} from 'react-bootstrap';
import {AiOutlineEdit} from 'react-icons/ai'
import {BsTrash} from 'react-icons/bs'

function TableBtn(props) {
    const { data } = props;

    const renderTableHeader = () => {
        return (
        <thead>
            <tr>
            {Object.keys(data[0]).map((key) => {
                return <th key={key}>{key.charAt(0).toUpperCase() + key.slice(1).toLowerCase()}</th>;
            })}
            <th className='text-center'>Accion</th>
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
                            <Button variant='warning'><AiOutlineEdit/></Button>
                            <Button variant='danger'><BsTrash/></Button>
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

export default TableBtn;
