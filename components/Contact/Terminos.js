import { map } from 'lodash';
import React from 'react';

const Terminos = ({ terminos }) => {

    console.log(terminos);

    return (
        <>
            <div className="__terms">
                <div className="__terms_title">
                    <h3>POLÍTICA DE PRIVACIDAD</h3>
                </div>
                <div className="__terms_body">
                    <div className="description">
                        <p>El presente Política de Privacidad establece los términos en que Señor de Maca usa y protege la información que es proporcionada por sus usuarios al momento de utilizar su sitio web. Esta compañía está comprometida con la seguridad de los datos de sus usuarios. Cuando le pedimos llenar los campos de información personal con la cual usted pueda ser identificado, lo hacemos asegurando que sólo se empleará de acuerdo con los términos de este documento. Sin embargo esta Política de Privacidad puede cambiar con el tiempo o ser actualizada por lo que le recomendamos y enfatizamos revisar continuamente esta página para asegurarse que está de acuerdo con dichos cambios.</p>
                    </div>
                    <div className="terminos">
                        {
                            map(terminos, (termino) =>(
                                <div className="caja" key={termino.id}>
                                    <h3>{termino.titulo}</h3>
                                    <p>{termino.descripcion}</p>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default Terminos;
