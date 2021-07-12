import React from 'react';
import classNames from 'classnames';

const Address = ({address, setAddress, activeAddress, setActiveAddress}) => {

    const {calle, canton, cuidad, title, id} = address

    const changeAddress = () =>{
        setActiveAddress(address._id);
        setAddress(address);
    }

    return (
        <>
            <div className={classNames("address", {
                active: activeAddress === address._id,
            })}
                onClick={changeAddress}
            >
                <p>{title}</p>
                <p>{canton}</p>
                <p>{cuidad}</p>
                <p>{calle}</p>
            </div>
        </>
    )
}

export default Address;
