import React, { useState } from 'react';
import Slider from 'react-slick';
import { map } from 'lodash';
import { Image } from 'semantic-ui-react';
import { Modal } from 'react-bootstrap';

const ProductSlider = ({title, screenshots}) => {

    const [modal, setModal] = useState(false);
    const [imageUrl, setImageUrl] = useState(null);

    const settings = {
        className: 'carousel-screenshots',
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        swipeToSlider: true
    }

    const openImage = (url) => {
        setImageUrl(url);
        setModal(true);
    }

    console.log(screenshots);


    return (
        <>
            <Slider {...settings}>
                {
                    map(screenshots, (screenshot) => (
                        <Image
                            key={screenshot._id}
                            src={screenshot.url}
                            alt={screenshot.name}
                            onClick={() => openImage(screenshot.url)} 
                        />
                    ))
                }    
            </Slider>
            <Modal aria-labelledby="contained-modal-title-vcenter"
                centered
                show={modal}
                onHide={() => setModal(false)} size="lg">
                <Image className="__product_image" src={imageUrl} alt={title} />    
            </Modal>    
        </>
    )
}

export default ProductSlider;