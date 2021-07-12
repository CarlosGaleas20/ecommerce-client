import React, { useState } from 'react';
import { Button } from 'semantic-ui-react';
import { toast } from 'react-toastify';
import { deleteUserAddress } from '../../api/user';
import useAuth from '../../hooks/useAuth';

const UserDirectionsItem = ({address, setReloadDirections, openModal}) => {

    const { logout } = useAuth();
    
    const [loading, setLoading] = useState(false);

    const {title, canton, cuidad, calle, id} = address;

    const hamdleDelete = async() => {
        setLoading(true);
        const response = await deleteUserAddress(id, logout);
        if(response === 'found') {
            toast.error('La dirección se encuetra activa en un pedido');
            toast.error('No de puede eliminar la dirección');
        } else{
            setReloadDirections(true);
            toast.success('Direcciòn Eliminada');
        }
        setLoading(false);
    }

    return (
        <>
            <div className="__user_directions-item">
                <p>{title}</p>
                <p>{canton}</p>
                <p>{cuidad}</p>
                <p>{calle}</p>
                <div className="actions">
                    <Button primary onClick={() => openModal(`Editar: ${title}`, address)}>Editar</Button>
                    <Button onClick={hamdleDelete} loading={loading}>Eliminar</Button>
                </div>
            </div>
        </>
    )
}

export default UserDirectionsItem;
