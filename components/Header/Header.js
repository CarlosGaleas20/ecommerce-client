import React from 'react'
import MenuApp from './MenuApp';
import TopBar from './TopBar';

const Header = () => {
    return (
        <>
            <div className="__header_container">
                <TopBar />
                <MenuApp />
            </div>
        </>
    )
}

export default Header;
