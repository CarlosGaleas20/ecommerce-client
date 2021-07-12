import Link from 'next/link';
import React from 'react';
import { Grid, Image, Card } from 'semantic-ui-react';

const CategoryItem = ({category}) => {

    const { url, imagen, title, descripcion } = category;

    return (
        <>
            <Grid.Column mobile={16} tablet={8} computer={5}>
                <Link href={`/products/${url}`}>
                    <a>
                        <Card className="container-item">
                            <Image src={imagen.url} wrapped ui={false} />
                            <Card.Content>
                                <Card.Header>{ title }</Card.Header>
                            </Card.Content>
                            <Card.Content extra>
                                {descripcion} 
                            </Card.Content>
                        </Card>
                    </a>
                </Link>
            </Grid.Column>
        </>
    )
}

export default CategoryItem;
