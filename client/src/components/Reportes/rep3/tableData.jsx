import Table from 'react-bootstrap/Table';

function TableRep3(props) {
    /* Si podes hacerlo automatico hacelo, que hueva  */
    const {dataTable: data} = props
    const ingresosVentas = data.ingresosMensualidad + data.ingresoMatriculas
    const otros = data.diasDeColor+data.otros
    const totalIngresos = otros + ingresosVentas
    const totalGastosDeAdministracion = data.sueldosYsalariosAdmin+data.comunicacionAdmin+data.gastosPublicos+data.materialDidacticoAdmin+data.gastosPorViajes+data.honorariosAdmin+data.otrosGastosDeAdministracion
    const totalGastosDeVentas = data.sueldosYsalariosVentas+data.comunicacionVentas+data.materialDidacticoVentas+data.gastosPorViajesVentas+data.honorariosVentas+data.otrosGastosDeVentas
    const totalGastos = totalGastosDeAdministracion + totalGastosDeVentas + data.otrosGastos
    const utilidadNeta = totalIngresos - totalGastos
    const impuestoSobreLaRenta = utilidadNeta * 0.25
    const utilidadMarginal = utilidadNeta-impuestoSobreLaRenta

    return (
        <>
            <Table hover>
                <thead>
                    <tr>
                        <th>Descripcion</th>
                        <th className='text-center'>I</th>
                        <th className='text-center'>II</th>
                        <th className='text-center'>III</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Ingresos por ventas</td>
                        <td colSpan={3}></td>
                    </tr>
                    <tr>
                        <td>Ingresos por mensualidades</td>
                        <td className='text-center'>L. {data.ingresosMensualidad}</td>
                        <td colSpan={2}></td>
                    </tr>
                    <tr>
                        <td>Ingresos por matriculasa</td>
                        <td className='text-center'>L. {data.ingresoMatriculas}</td>
                        <td colSpan={2}></td>
                    </tr>
                    <tr>
                        <td>Total de Ingresos por ventas</td>
                        <td className='text-center'></td>
                        <td className='text-center'>L. {ingresosVentas}</td>
                        <td className='text-center'></td>
                    </tr>
                    <tr>
                        <td>Otros ingresos</td>
                        <td colSpan={3}></td>
                    </tr>
                    <tr>
                        <td>Días de color</td>
                        <td className='text-center'>L. {data.diasDeColor}</td>
                        <td colSpan={2}></td>
                    </tr>
                    <tr>
                        <td>Otros</td>
                        <td className='text-center'>L. {data.otros}</td>
                        <td colSpan={2}></td>
                    </tr>
                    <tr>
                        <td>Total de otros ingresos</td>
                        <td></td>
                        <td className='text-center'>L. {otros}</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>Total ingresos</td>
                        <td colSpan={2}></td>
                        <td className='text-center'>L. {totalIngresos}</td>
                    </tr>
                    <tr>
                        <td>Gastos</td>
                        <td colSpan={3}></td>
                    </tr>
                    <tr>
                        <td>Gastos de administración</td>
                        <td colSpan={3}></td>
                    </tr>
                    <tr>
                        <td>Sueldos y salarios</td>
                        <td className='text-center'>L. {data.sueldosYsalariosAdmin}</td>
                        <td colSpan={2}></td>
                    </tr>
                    <tr>
                        <td>Comunicación</td>
                        <td className='text-center'>L. {data.comunicacionAdmin}</td>
                        <td colSpan={2}></td>
                    </tr>
                    <tr>
                        <td>Gastos públicos</td>
                        <td className='text-center'>L. {data.gastosPublicos}</td>
                        <td colSpan={2}></td>
                    </tr>
                    <tr>
                        <td>Material didáctico</td>
                        <td className='text-center'>L. {data.materialDidacticoAdmin}</td>
                        <td colSpan={2}></td>
                    </tr>
                    <tr>
                        <td>Gastos por viajes</td>
                        <td className='text-center'>L. {data.gastosPorViajes}</td>
                        <td colSpan={2}></td>
                    </tr>
                    <tr>
                        <td>Honorarios</td>
                        <td className='text-center'>L. {data.honorariosAdmin}</td>
                        <td colSpan={2}></td>
                    </tr>
                    <tr>
                        <td>Otros gastos de administración</td>
                        <td className='text-center'>L. {data.otrosGastosDeAdministracion}</td>
                        <td colSpan={2}></td>
                    </tr>
                    <tr>
                        <td>Total de gastos de administración</td>
                        <td></td>
                        <td className='text-center'>L. {totalGastosDeAdministracion}</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>Sueldos y salarios</td>
                        <td className='text-center'>L. {data.sueldosYsalariosVentas}</td>
                        <td colSpan={2}></td>
                    </tr>
                    <tr>
                        <td>Comunicación</td>
                        <td className='text-center'>L. {data.comunicacionVentas}</td>
                        <td colSpan={2}></td>
                    </tr>
                    <tr>
                        <td>Material didáctico</td>
                        <td className='text-center'>L. {data.materialDidacticoVentas}</td>
                        <td colSpan={2}></td>
                    </tr>
                    <tr>
                        <td>Gastos por viajes</td>
                        <td className='text-center'>L. {data.gastosPorViajesVentas}</td>
                        <td colSpan={2}></td>
                    </tr>
                    <tr>
                        <td>Honorarios</td>
                        <td className='text-center'>L. {data.honorariosVentas}</td>
                        <td colSpan={2}></td>
                    </tr>
                    <tr>
                        <td>Otros gastos de ventas</td>
                        <td className='text-center'>L. {data.otrosGastosDeVentas}</td>
                        <td colSpan={2}></td>
                    </tr>
                    <tr>
                        <td>Total de gastos de ventas</td>
                        <td></td>
                        <td className='text-center'>L. {totalGastosDeVentas}</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>Otros gastos</td>
                        <td></td>
                        <td className='text-center'>L. {data.otrosGastos}</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>Total de gastos</td>
                        <td colSpan={2}></td>
                        <td className='text-center'>L. {totalGastos}</td>
                    </tr>
                    <tr>
                        <td>Utilidad neta</td>
                        <td colSpan={2}></td>
                        <td className='text-center'>L. {utilidadNeta}</td>
                    </tr>
                    <tr>
                        <td>Impuesto sobre la renta</td>
                        <td colSpan={2}></td>
                        <td className='text-center'>L. {impuestoSobreLaRenta}</td>
                    </tr>
                    <tr>
                        <td>Utilidad marginal</td>
                        <td colSpan={2}></td>
                        <td className='text-center'>L. {utilidadMarginal}</td>
                    </tr>
                </tbody>
            </Table>
        </>
    );
}

export default TableRep3;