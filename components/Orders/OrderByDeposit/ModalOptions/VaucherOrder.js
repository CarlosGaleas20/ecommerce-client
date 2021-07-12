import React, { useState } from 'react';
import { Grid, Button } from 'semantic-ui-react';
import { uploadImage } from '../../../../api/images';
import { toast } from 'react-toastify';
import { addVaucher } from '../../../../api/order';
import useAuth from '../../../../hooks/useAuth';

const VaucherOrder = ({ order, setReloadOrder,setShowModal }) => {

    const [loading, setLoading] = useState(false);
    const [imagenU, setImagenU] = useState(null);
    const [imagenM, setImagenM] = useState(null);

    const { auth, logout } = useAuth(); 

    const handleChange = (e) => {
        if(e.target.files[0]){
            const file = URL.createObjectURL(e.target.files[0]);
            setImagenU(file);
            setImagenM(e.target.files[0])
        }else{
            setImagenU(null);
            setImagenM(null);
        }
    }

    const handleSubmit = async(e) => {
        setLoading(true)
        e.preventDefault();
        console.log(imagenM);
        if(imagenM){
            try {
                const response = await uploadImage(imagenM);
                console.log(response);
                if (response.data) {
                    const result = await addVaucher(auth.idUser, order.idPedido, response.data[0], logout);
                    if(result){
                        toast.success('Vaucher agregado para su validación');
                        setShowModal(false);
                        setReloadOrder(true);
                    }
                } else {
                    toast.error('Error al subir la Imagen');
                }
            } catch (error) {
                console.log(error);
            }
        }else {
            toast.error('Debe seleccionar una imagen');
        }
        setLoading(false);
    }

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
                                <p>Suba una imagen del vaucher de su depósito para validar su pedido.</p>
                                <p>Al momento que suba el vaucher su pedido pasara a la sección de pedidos validados.</p>
                                <p>En caso de ser una foto, debe ser lo más clara y legible posible.</p>
                            </div>
                        </div>
                    </Grid.Column>
                    <Grid.Column mobile={16} tablet={16} computer={8}>
                        <div style={{
                            padding: 20,
                        }}>
                            <form>
                                <p>Suba una imagen</p>
                                <input
                                    type='file'
                                    name='poster'
                                    accept='image/gift, image/jpeg, image/png'
                                    onChange={handleChange}
                                />
                                <Button
                                    loading={loading}
                                    onClick={handleSubmit}
                                    primary
                                    style={{
                                        marginTop: 30,
                                    }}
                                >
                                    Guardar Vaucher
                                </Button>
                            </form>
                        </div>
                    </Grid.Column>
                    <Grid.Column mobile={16} tablet={16} computer={8}>
                        <div>
                            <p>Su imagen: </p>
                            {
                                imagenU &&
                                <img
                                    style={{
                                        width: '100%'
                                    }}
                                    src={imagenU}
                                />
                            }
                        </div>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </>
    )
}

export default VaucherOrder;
