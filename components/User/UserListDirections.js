import React, { useEffect, useState } from 'react'
import { map, size } from 'lodash';
import { Grid } from 'semantic-ui-react';
import { getUserAddress } from '../../api/user';
import useAuth from '../../hooks/useAuth';
import UserDirectionsItem from './UserDirectionsItem';

const UserListDirections = ({ reloadDirections, setReloadDirections, openModal }) => {

    const [addresses, setAddresses] = useState([]);

    const {user, logout} = useAuth();

    useEffect(() => {
        ( async() => {
            const response = await getUserAddress(user.id, logout);
            setAddresses(response || []);
            setReloadDirections(false);
        })()
    }, [reloadDirections])

    return (
        <>
            <div className="__user_directions">
                {
                    size(addresses) === 0
                    ? <h3>No hay direcciones</h3>
                    : (
                        <Grid>
                            {
                                map(addresses, (address) => (
                                    <Grid.Column key={address.id} mobile={16} tablet={8} computer={4}>
                                        <UserDirectionsItem 
                                            address={address} 
                                            setReloadDirections={setReloadDirections}
                                            openModal={openModal}
                                        />
                                    </Grid.Column>
                                ))
                            }
                        </Grid>
                    )
                }
            </div>
        </>
    )
}

export default UserListDirections;
