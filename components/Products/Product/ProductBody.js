import React from 'react';
import { Grid, Image, GridColumn } from 'semantic-ui-react';
import ProductHeader from './ProductHeader';
import SlideProducts from './SliderProducts';

const ProductBody = ({product}) => {

    const {title, poster} = product;

    return (
        <div>
            <Grid className="__product_data-container">
                <GridColumn mobile={16} tablet={6} computer={6}>
                    <Image src={poster.url} alt={title} size='medium' centered />
                </GridColumn>
                <GridColumn mobile={16} tablet={10} computer={10}>
                    <ProductHeader product={product}/>
                </GridColumn>
                <GridColumn mobile={16} tablet={16} computer={16}>
                <SlideProducts
                title={title}
                screenshots={product.screenshots}
            />
                </GridColumn>
            </Grid>
        </div>
    )
}

export default ProductBody;
