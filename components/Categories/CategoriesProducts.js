import { map } from 'lodash';
import React from 'react';
import { Grid } from 'semantic-ui-react';
import CategoryItem from './CategoryItem';

const CategoriesProducts = ({categories}) => {
    return (
        <>
            <div className="caja">
            <Grid columns={3} divided>
                <Grid.Row>
                    {
                        map(categories, (category) => (
                            <CategoryItem 
                                key={category.id}
                                category={category}
                            />
                        ))
                    }
                </Grid.Row>
            </Grid>
            </div>
        </>
    )
}

export default CategoriesProducts;
