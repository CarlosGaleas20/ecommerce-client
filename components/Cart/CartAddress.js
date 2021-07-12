import React, { useEffect, useState } from 'react';
import { size, map } from 'lodash';
import { Grid, Checkbox } from 'semantic-ui-react';
import Link from 'next/link';
import { getUserAddress } from '../../api/user';
import useAuth from '../../hooks/useAuth';
import Address from './Address';

const CartAddress = ({setAddress}) => {

    const [addresses, setAddresses] = useState(null);
    const [activeAddress, setActiveAddress] = useState(null);

    const { user, logout } = useAuth();

    useEffect(() => {
        ( async() => {
            const reponse = await getUserAddress(user.id, logout);
            setAddresses(reponse || [])
        })();
    }, []);

    return (
        <>
            <div className="__cart_addresses">
                <div className="title">Direccion de envio</div>
                <div className="terms">
                    <h3>Para comprar un producto debes seleccionar una dirección y aceptar los terminos y condiciones.</h3>
                </div>
                <div className="data">
                    {
                        size(addresses) === 0
                        ? (
                            <h3>No hay direcciones creadas.{'  '}
                            <Link href="/account">
                                <a>Añade tu primera dirección.</a>
                            </Link>
                            </h3>
                        )
                        :(
                            <Grid>
                                {
                                    map(addresses, (address) => (
                                        <Grid.Column key={address.id} mobile={16} tablet={8} computer={4}>
                                            <Address 
                                                address={address}
                                                setAddress={setAddress}
                                                activeAddress={activeAddress}
                                                setActiveAddress={setActiveAddress}
                                            />
                                        </Grid.Column>
                                    ))
                                }
                            </Grid>
                        )
                    }
                </div>
            </div>
        </>
    )
}

export default CartAddress;
