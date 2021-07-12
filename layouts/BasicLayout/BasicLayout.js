import React from 'react';
import { Container } from 'semantic-ui-react';
import classNames from 'classnames'
import Header from '../../components/Header';
import Footer from '../../components/Footer/Footer';

const BasicLayout = ({children, className}) => {
    return (
        <>
            <Container fluid className={classNames("__basic_layout", {
                [className]: className,
            })}>
                <Header />
                <Container className="__basic_container">
                    {children}
                </Container>
                <Footer />
            </Container>
        </>
    )
}

export default BasicLayout;
