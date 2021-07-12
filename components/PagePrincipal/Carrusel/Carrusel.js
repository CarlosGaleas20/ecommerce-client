import React from 'react';
import { Carousel } from 'react-bootstrap';
import { map } from 'lodash';

const Carrusel = ({carrusel}) => {
    return (
        <>
            <Carousel className="__carrusel">
            {
            map(carrusel, (carruselItem) =>(
                <Carousel.Item key={carruselItem.id}>
                <img
                    className="d-block w-100"
                    src={carruselItem.imagen.url}
                    alt={carruselItem.titulo}
                />
                <Carousel.Caption className="__carrusel_item">
                    <h3>{carruselItem.titulo}</h3>
                    <p>{carruselItem.descripcion}.</p>
                </Carousel.Caption>
        </Carousel.Item> 
            ))
            }
            </Carousel>
        </>
    )
}

export default Carrusel;
