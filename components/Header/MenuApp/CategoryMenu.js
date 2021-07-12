import React from 'react';
import Link from 'next/link';
import { Menu } from 'semantic-ui-react';

const CategoryMenu = () => {

    
    return (
        <Menu>
            <Link href={'/'}>
                <Menu.Item as="a">
                        Inicio
                </Menu.Item>
            </Link>
            <Link href={'/about'}>
                <Menu.Item as="a">
                        Sobre Nosotros
                </Menu.Item>
            </Link>
            <Link href={'/listcategories'}>
                <Menu.Item as="a">
                        Productos
                </Menu.Item>
            </Link>
            <Link href={'/contact'}>
                <Menu.Item as="a">
                        Contáctenos
                </Menu.Item>
            </Link>
        </Menu>
    )
}

export default CategoryMenu;
