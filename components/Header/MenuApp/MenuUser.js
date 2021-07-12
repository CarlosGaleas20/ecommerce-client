import Link from 'next/link';
import React from 'react';
import { Menu, Icon, Label } from 'semantic-ui-react';
import { Dropdown, DropdownButton } from 'react-bootstrap'
import useCart from '../../../hooks/useCart';

const MenuUser = ({ setShow, user, logout }) => {

    const { productsCart } = useCart();


    return (
        <Menu>
            {
                (user)
                    ? (
                        <>
                            <Link href="/cartproducts">
                                <Menu.Item as="a" className="m-0">
                                    <Icon name="cart" />
                                    {
                                        productsCart > 0
                                        && (<Label color="red" floating circular>
                                            {productsCart}
                                        </Label>)
                                    }
                                </Menu.Item>
                            </Link>
                            <Dropdown>
                                <DropdownButton 
                                drop="left" 
                                variant="info" 
                                id="dropdown-basic-button"
                                title={`${user.name} ${user.lastname}`}
                                >
                                    <Dropdown.Item>
                                        <Link href="/account">
                                            <a>
                                            <Menu.Item>
                                                <Icon name="user outline" />
                                                    Mi cuenta
                                            </Menu.Item>
                                            </a>
                                        </Link>
                                    </Dropdown.Item>
                                    <Dropdown.Item>
                                        <Link href="/wishlist">
                                            <a>
                                            <Menu.Item>
                                                <Icon name="heart outline" />
                                                    Favoritos
                                            </Menu.Item>
                                            </a>
                                        </Link>
                                    </Dropdown.Item>
                                    <Dropdown.Item>
                                        <Link href="/orders">
                                            <a>
                                            <Menu.Item>
                                                <Icon name="cart arrow down" />
                                                    Mis pedidos
                                            </Menu.Item>
                                            </a>
                                        </Link>
                                    </Dropdown.Item>
                                    <Dropdown.Item>
                                        <Menu.Item className="m-0" onClick={logout}>
                                            <Icon name="power off" />
                                                Salir
                                        </Menu.Item>
                                    </Dropdown.Item>
                                </DropdownButton>
                            </Dropdown>
                        </>
                    )
                    : (
                        <Menu.Item onClick={setShow}>
                            <Icon
                                name="user outline" />
                        Mi cuenta
                        </Menu.Item>
                    )
            }

        </Menu>
    )
}

export default MenuUser;