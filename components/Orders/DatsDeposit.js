import React from 'react';
import { Grid } from 'semantic-ui-react';

const DatsDeposit = ({infoDeposit}) => {

    return (
        <>
            <Grid>
                <Grid.Row>
                    <Grid.Column mobile={16} tablet={16} computer={16}>
                        <div className="container" style={{
                            marginBottom: 30,
                            display: 'flex',
                            justifyContent: 'center',
                            height: 250,
                            }}>
                            <div className="container_info-data">
                                <div
                                    style={{
                                        color: '#007bff',
                                        textAlign: 'center',
                                        fontWeight: 'bold',
                                    }}
                                ><h2
                                    style={{fontWeight: 'bold', fontSize: 20,}}
                                >Datos para el deposito o transferencia bancaria:</h2></div>
                                <p>Aquí tienes la información para que puedas realizar tu deposito o transferencia</p>
                                <p>Eso datos son visibles en la sección de pedido.</p>
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    flexDirection: 'column'
                                }}>
                                <p>Nombre del Banco:<span style={{color: '#007bff', fontWeight: 'bold',}}> {infoDeposit.nombreBanco}</span></p>
                                <p>Tipo de la cuenta: <span style={{color: '#007bff', fontWeight: 'bold',}}> {infoDeposit.tipoCuenta}</span></p>
                                <p>Número de la cuenta: <span style={{color: '#007bff', fontWeight: 'bold',}}> {infoDeposit.numeroCuenta}</span></p>
                                <p>Nombre del titular:  <span style={{color: '#007bff', fontWeight: 'bold',}}> {infoDeposit.nombrePropietario}</span></p>
                                </div>
                            </div>
                        </div>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </>
    )
}

export default DatsDeposit;
