import React from 'react';
import { Checkbox } from 'semantic-ui-react';
import Link from 'next/link';


const CartTerms = ({setAddress, terminos, setTerminos, addressLocal, setAddressLocal}) => {

    const local = '60bfcf5667e73a2b74fc6cc4';

    const onChange = () => {
        setTerminos(!terminos);
    }

    const onChangeAddress = () => {
        if(addressLocal) {
            setAddressLocal(!addressLocal);
            setAddress(null);
        } else {
            setAddressLocal(!addressLocal);
            setAddress({id: local});
        }
    }

    return (
        <>
            <div className="__cart_addresses">
                <div className="title">Terminos y Conciones</div>
                <div className="terms">
                    <h3>Para comprar un producto debes seleccionar la forma de entrega y aceptar los terminos y condiciones.</h3>
                </div>
                <div className="data">
                <div className="terminos">
                        <Checkbox
                            label="Retiro en el local"
                            checked={addressLocal}
                            onChange={onChangeAddress}
                        />
                    </div>
                    <div className="terminos">
                        <Checkbox
                            label="Acepta los "
                            checked={terminos}
                            onChange={onChange}
                        />
                        <Link href="/terms">
                                <a> Terminos y Condiciones de Uso para comprar</a>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CartTerms;