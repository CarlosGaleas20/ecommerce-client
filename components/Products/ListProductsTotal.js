import { map } from 'lodash';
import React from 'react';
import { Grid } from 'semantic-ui-react';
import ItemProduct from './ItemProduct';

const ListProductsTotal = ({products}) => {
    return (
        <>
            <div className="caja">
            <Grid columns={3} divided>
                <Grid.Row>
                    {
                        map(products, (product) => (
                            <ItemProduct
                                key={product.id}
                                product={product}
                            />
                        ))
                    }
                </Grid.Row>
            </Grid>
            </div>
        </>
    )
}

export default ListProductsTotal;