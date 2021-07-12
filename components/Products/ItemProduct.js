import React from 'react';
import { Grid, Card, Icon, Image } from 'semantic-ui-react';
import Link from 'next/link';

const ItemProduct = ({ product }) => {

    const {url, poster, title, price, category} = product;

    return (
        <>
            <Grid.Column mobile={16} tablet={8} computer={4}>
                <Link href={`/${url}`}>
                    <a>
                        <Card className="__products_container-item">
                            <Image src={poster.url} wrapped ui={false} />
                            <Card.Content>
                                <Card.Header>{ title }</Card.Header>
                                <Card.Meta>
                                    <span className='date'>{ category.title }</span>
                                </Card.Meta>
                            </Card.Content>
                            <Card.Content extra>
                                <Icon name='money bill alternate outline' />
                                ${price} 
                            </Card.Content>
                        </Card>
                    </a>
                </Link>
            </Grid.Column>

        </>
    )
}

export default ItemProduct;
