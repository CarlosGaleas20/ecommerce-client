import React from 'react';
import { Grid } from 'semantic-ui-react';

const VaucherOrderSend = ({ order }) => {

    return (
        <>
            <Grid>
                <Grid.Row>
                    <Grid.Column mobile={16} tablet={16} computer={16}>
                        <div className="container" style={{marginBottom: 30,}}>
                            <div className="container_info-data">
                                <div
                                    style={{
                                        color: '#007bff',
                                        textAlign: 'center',
                                        fontWeight: 'bold',
                                    }}
                                ><h2
                                    style={{fontWeight: 'bold', fontSize: 20,}}
                                >Su vaucher de pedido: </h2></div>
                                <p>Este es el vaucher de compra que fue aprobado por el gerente de la empresa.</p>
                            </div>
                        </div>
                    </Grid.Column>
                    <Grid.Column mobile={16} tablet={16} computer={16}>
                        <div>
                            <p>Su vaucher: </p>
                            {
                                order &&
                                <img
                                    style={{
                                        width: '100%'
                                    }}
                                    src={order.vaucher.url}
                                />
                            }
                        </div>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </>
    )
}

export default VaucherOrderSend;
