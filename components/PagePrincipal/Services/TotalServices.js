import React from 'react'
import { Icon } from 'semantic-ui-react';

const TotalServices = () => {
    return (
        <>
            <div
                className="__services"
                style={{
                    backgroundImage: `url('https://fondosmil.com/fondo/28255.jpg')`
                }}
            >
                <div className="__services_title">
                    <h3>¿QUÉ NOS DIFERENCIA?</h3>
                </div>
                <div className="__services_body">
                    <div className="__services_body-caja">
                        <div className="item">
                            <div className="icono">
                                <Icon name="cart arrow down" />
                            </div>
                            <div className="contenido">
                                <h4>AMPLIA GAMA DE PRODUCTOS</h4>
                                <p>Ofrecemos una amplia gama de productos de calidad para el área de ferretería y construcción</p>
                            </div>
                        </div>
                        <div className="item">
                        <div className="icono">
                                <Icon name="book" />
                            </div>
                            <div className="contenido">
                                <h4>CERTIFICADOS</h4>
                                <p>Hemos sido certificados con  «AAA» por el ICRE.</p>
                            </div>
                        </div>
                        <div className="item">
                        <div className="icono">
                                <Icon name="dollar sign" />
                            </div>
                            <div className="contenido">
                                <h4>MEJORES PRECIOS</h4>
                                <p>Siendo uno de los mayores distribuidores en el país, ofrecemos los mejores precios para nuestros clientes</p>
                            </div>
                        </div>
                    </div>
                    <div className="__services_body-caja">
                        <div className="item">
                        <div className="icono">
                                <Icon name="check" />
                            </div>
                            <div className="contenido">
                                <h4>GARANTÍA</h4>
                                <p>Megaproductos brinda mayor garantía a sus clientes tanto en el producto como en la distribución</p>
                            </div>
                        </div>
                        <div className="item">
                        <div className="icono">
                                <Icon name="clock" />
                            </div>
                            <div className="contenido">
                                <h4>27 AÑOS DE EXPERIENCIA</h4>
                                <p>Representando a Marcas líderes a nivel nacional, con el fin de cumplir con nuestros clientes con Excelencia y calidad.</p>
                            </div>
                        </div>
                        <div className="item">
                        <div className="icono">
                                <Icon name="users" />
                            </div>
                            <div className="contenido">
                                <h4>SERVICIO AL CLIENTE</h4>
                                <p>Atención al cliente de forma ágil, brindando soluciones rápidas</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TotalServices;
