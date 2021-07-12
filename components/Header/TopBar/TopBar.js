import React from 'react'
import {Container, Grid} from 'semantic-ui-react';
import Logo from './Logo';
import Search from './Search';

const TopBar = () => {
    return (
        <>
        <div className="__header_top-bar">
            <Container>
                <Grid className="__header_top-bar">
                    <Grid.Column width={10} className="top-bar__left">
                        <Logo />
                    </Grid.Column>
                    <Grid.Column width={6} className="top-bar__right">
                        <Search />
                    </Grid.Column>
                </Grid>
            </Container>
        </div>
        </>
    );
}

export default TopBar;
