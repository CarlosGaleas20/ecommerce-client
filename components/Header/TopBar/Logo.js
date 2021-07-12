import React from 'react';
import Link from 'next/link';
import { Image } from 'semantic-ui-react';

const Logo = () => {
    return (
        <>
            <Link href="/">
                <a>
                    <Image className="__header_top-bar_image" src="/logo1.jpeg" alt="Señor de Maca" />
                </a>
            </Link>
        </>
    );
}

export default Logo;
