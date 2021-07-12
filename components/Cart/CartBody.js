import React, { useState } from 'react';
import CartSummary from './CartSummary';
import CartAddress from './CartAddress';
import CartTerms from './CartTerms';
import PaymentMethod from './PaymentMethod';

const CartBody = ({products, reload, setReload, productsData}) => {

    const [address, setAddress] = useState(null);
    const [terminos, setTerminos] = useState(false);
    const [addressLocal, setAddressLocal] = useState(false);
    console.log(address);

    return (
        <div>
            {
                products
                &&(<CartSummary 
                    products={products} 
                    reload={reload} 
                    setReload={setReload} 
                    productsData={productsData}
                />)
            }
            {
                products
                &&(<CartTerms 
                    setAddress={setAddress}
                    terminos={terminos}
                    setTerminos={setTerminos}
                    addressLocal={addressLocal}
                    setAddressLocal={setAddressLocal}
                />)
            }
            {
                products && !addressLocal
                &&(<CartAddress
                        setAddress={setAddress}
                    />)
            }
            {
                address && terminos
                &&(<PaymentMethod
                    products={products}
                    address={address}
                    setReload={setReload} 
                    productsData={productsData}
                    />)
            }      
        </div>
    )
}

export default CartBody;
