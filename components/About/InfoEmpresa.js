import React from 'react';
import { Grid, Image } from 'semantic-ui-react';
import Marcas from '../PagePrincipal/Marcas/Marcas';

const InfoEmpresa = ({ datos, marcas }) => {
    return (
        <>
            <div className="__about">
                <Grid columns={2} divided>
                    <Grid.Row>
                        <Grid.Column className="data">
                            <h3>Sobre Nosotros</h3>
                            <p>{datos.descripcion}</p>
                        </Grid.Column>
                        <Grid.Column>
                            <Image src={datos.imgDescripcion.url} />
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column>
                            <Image src={datos.imgMision.url} />    
                        </Grid.Column>
                        <Grid.Column className="data">
                            <h3>Misión</h3>
                            <p>{datos.mision}</p>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column className="data">
                            <h3>Visión</h3>
                            <p>{datos.vision}</p>
                        </Grid.Column>
                        <Grid.Column>
                            <Image src={datos.imgVision.url} />
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column>
                            <Image src={datos.imgValores.url} />    
                        </Grid.Column>
                        <Grid.Column className="data">
                            <h3>Valores</h3>
                            <p>{datos.valores}</p>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                <Marcas marcas={marcas} />
            </div>
        </>
    )
}

export default InfoEmpresa;
