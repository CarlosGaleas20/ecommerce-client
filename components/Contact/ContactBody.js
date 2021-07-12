import React from 'react';
import { Grid, Loader } from 'semantic-ui-react';
import ContactForm from './ContactForm';
import ContactInfo from './ContactInfo';

const ContactBody = ({ info }) => {

    return (
        <>
            <div className="__contact">
                <div className="__contact_title">
                    <h3>Contáctenos</h3>
                </div>
                <div className="__contact_body">
                    <Grid columns={2} divided>
                        <Grid.Row>
                            <Grid.Column mobile={16} tablet={8} computer={8}>
                            {
                                !info
                                ? (<Loader active>Cargando información</Loader>)
                                : (<ContactInfo info={info} />)
                            }
                            </Grid.Column>
                            <Grid.Column mobile={16} tablet={8} computer={8}>
                                <ContactForm />
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </div>
            </div>
        </>
    )
}

export default ContactBody;