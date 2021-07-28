import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import {Loader} from 'semantic-ui-react';
import { toast } from 'react-toastify';
import UserData from '../components/User/UserData';
import UserDirections from '../components/User/UserDirections';
import UserEmail from '../components/User/UserEmail';
import UserPass from '../components/User/UserPass';
import useAuth from '../hooks/useAuth';
import BasicLayout from '../layouts/BasicLayout/BasicLayout';
import Seo from '../components/Seo';

const Account = () => {


    const { auth, user, logout, setReloaderUser } = useAuth();

    const router = useRouter();

    useEffect(() => {
        if (!auth && !user) {
            router.replace('/');
            toast.error('Debe estar logueado para acceder');
            return null;
        }
        return null;
    }, [auth])

    const title = 'Tus datos - Señor de Maca';
    const description = 'Tus datos de usuario';

    return (
        <>
            {
                (auth && user)
                ? (
                    <BasicLayout className="__account_body" >
                        <Seo title={title} description={description} />
                        <div className="__account_configurartion">
                            <div className="__account_tittle">
                                Configuración
                            </div>
                            <div className="__account_data">
                                <UserData 
                                    user={user}
                                    logout={logout}
                                    setReloaderUser={setReloaderUser}
                                />
                                <UserEmail 
                                    user={user}
                                    logout={logout}
                                    setReloaderUser={setReloaderUser}
                                />

                                <UserPass 
                                    user={user}
                                    logout={logout}
                                    setReloaderUser={setReloaderUser}
                                />
                                
                            </div>
                            <UserDirections />
                        </div>
                    </BasicLayout>
                )
                : (<Loader active>Verificando Usuario</Loader>)
            }
        </>
    );
}

export default Account;
