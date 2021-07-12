import React, { useEffect, useState } from 'react';
import { Grid, Loader, Dropdown, Form, Label, TextArea, Button } from 'semantic-ui-react';
import { toast } from 'react-toastify';
import useAuth from '../../../../hooks/useAuth';
import { getEncuestaByDeposit, registerEncuestaByDeposit } from '../../../../api/infoSell';
import { size } from 'lodash';

const Encuesta = ({ order }) => {

    const [loading, setLoading] = useState(false);
    const [encuesta, setEncuesta] = useState(null);
    const [reloader, setReloader] = useState(false);
    const [ data, setData ] = useState({});
    const { auth, logout } = useAuth();
    console.log(encuesta);

    useEffect(() => {
        (async () => {
            if (auth) {
                const response = await getEncuestaByDeposit(auth.idUser, order.id, logout);
                if (size(response) > 0) setEncuesta(response);
                else setEncuesta([]);
            }
            setReloader(false);
        })()
    }, [reloader])

    const handleSubmit = async(e) => {
        e.preventDefault();
        setLoading(true);
        if(size(data.titulo) > 0 && size(data.descripcion) > 0){
            const response = await registerEncuestaByDeposit(auth.idUser, order.id, data, logout);
            console.log(response);
            if (response) {
                toast.success('Gracias por responder la Encuesta');
                setReloader(true);
            } else {
                toast.error('Hubo algun error');
            }
            setLoading(false);
        }else{
            toast.error('Debe llenar todos los campos');
        } 
        setLoading(false);
    }

    const handleChange = (e, {value}) => {
        setData({
            ...data,
            titulo: value,
        });
    }
    const handleChangeText = (e, {value}) => {
        setData({
            ...data,
            descripcion: value,
        });
    }

    const options = [
        { key: '1', value: 'Muy Bueno', text: 'Muy Bueno' },
        { key: '2', value: 'Bueno', text: 'Bueno' },
        { key: '3', value: 'Regular', text: 'Regular' },
        { key: '4', value: 'Malo', text: 'Malo' },
        { key: '5', value: 'Muy Malo', text: 'Muy Malo' },
      ]

    return (
        <>
            <Grid>
                <Grid.Row>
                    <Grid.Column mobile={16} tablet={16} computer={16}>
                        <div className="container" style={{ marginBottom: 30, }}>
                            <div className="container_info-data">
                                <div
                                    style={{
                                        color: '#007bff',
                                        textAlign: 'center',
                                        fontWeight: 'bold',
                                    }}
                                ><h2
                                    style={{ fontWeight: 'bold', fontSize: 20, }}
                                >Encuesta de satisfacción: </h2></div>
                                <p>Por favor responda a la preguntas para conocer su nivel de satisfacción acerca de la entrega de su producto</p>
                            </div>
                        </div>
                    </Grid.Column>
                    {
                        encuesta
                            ? (size(encuesta) === 0
                                ? (<Grid.Column mobile={16} tablet={16} computer={16}>
                                    <Form>
                                        <div style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            width: '70%',
                                            margin: '0 auto',
                                            
                                        }}>
                                        <Label style={{
                                            padding: '10px',
                                            fontSize: 15,
                                            marginBottom: 10,
                                        }}>Selecciona tu grado de satisfacción:</Label>
                                        <Dropdown
                                            style={{
                                                padding: '10px',
                                                fontSize: 15,
                                                marginBottom: 10,
                                            }}
                                            placeholder='Selecciona una opción'
                                            options={options}
                                            onChange={handleChange}
                                            value={data.titulo}
                                            name="titulo"
                                            fluid
                                            selection
                                            />
                                        <Label style={{
                                            padding: '10px',
                                            fontSize: 15,
                                            marginBottom: 10,
                                        }}>Ingresa un comentario:</Label>
                                        <TextArea
                                        style={{
                                            padding: '10px',
                                            fontSize: 15,
                                            marginBottom: 10,
                                        }}
                                            type="text"
                                            name="descripcion"
                                            placeholder="Tu comentario"
                                            autoComplete="off"
                                            onChange={handleChangeText}
                                            value={data.descripcion}
                                        />
                                        <Button
                                            color="primary" 
                                            type="submit" 
                                            className="submit" 
                                            loading={loading}
                                            onClick={handleSubmit}
                                            >Enviar</Button>
                                        </div>
                                    </Form>
                                </Grid.Column>)
                                : (
                                    <Grid.Column mobile={16} tablet={16} computer={16}>
                                        <div className="container" style={{ marginBottom: 30, }}>
                                            <div className="container_info-data">
                                                <div
                                                    style={{
                                                        color: '#007bff',
                                                        textAlign: 'center',
                                                        fontWeight: 'bold',
                                                    }}
                                                ><h2
                                                    style={{ fontWeight: 'bold', fontSize: 20, }}
                                                >Usted ya ha respondido la encuesta </h2></div>
                                                <p>Esta fueron sus respuestas:</p>
                                                <p>Nivel de satisfacción: <span
                                                style={{
                                                    color: '#007bff',
                                                }}> {encuesta[0].titulo}</span></p>
                                                <p>Su comentario: <span
                                                 style={{
                                                    color: '#007bff',
                                                }}> {encuesta[0].descripcion}</span></p>
                                            </div>
                                        </div>
                                    </Grid.Column>
                                )
                            )
                            : ((<Loader active>Cargando información</Loader>))
                    }


                </Grid.Row>
            </Grid>
        </>
    )
}

export default Encuesta;