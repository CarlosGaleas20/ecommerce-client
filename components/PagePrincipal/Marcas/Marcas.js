import React from 'react';
import Carousel from 'react-multi-carousel';
import {map} from 'lodash'
import 'react-multi-carousel/lib/styles.css';

const Marcas = ({ marcas }) => {

    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3,
            slidesToSlide: 1 // optional, default to 1.
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2,
            slidesToSlide: 1 // optional, default to 1.
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
            slidesToSlide: 1 // optional, default to 1.
        }
    };


    return (
        <>
            <div className="__categories">
                <div className="__categories_title">
                    <h3>NUESTRAS MARCAS</h3>
                </div>
                <div className="__categories_body">
                    <Carousel
                        swipeable={false}
                        draggable={false}
                        showDots={true}
                        responsive={responsive}
                        ssr={true}
                        infinite={true}
                        autoPlaySpeed={500}
                        keyBoardControl={true}
                        customTransition="all .5"
                        transitionDuration={500}
                        containerClass="carousel-container"
                        removeArrowOnDeviceType={["tablet", "mobile"]}
                        dotListClass="custom-dot-list-style"
                        itemClass="carousel-item-padding-40-px"
                    >
                        {
                            map(marcas, (marca) => (
                                <div className="caja" key={marca.id}>
                                    <img src={marca.portada.url} />
                                </div>
                            ))
                        }
                    </Carousel>
                </div>
            </div>
        </>
    )
}

export default Marcas;
