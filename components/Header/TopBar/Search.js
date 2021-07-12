import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { Input } from 'semantic-ui-react';

const Search = () => {

    const [search, setSearch] = useState('');
    const [load, setLoad] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if(load) {
            router.push(`/search?query=${search}`)
        }
        setLoad(true);
    }, [search])


    return (
        <>
            <Input
                id="searh-product"
                icon={{name: "search"}}
                placeholder="Buscar"
                value={router.query.query}
                onChange={(_, data) => setSearch(data.value)}
                autoComplete="off"
            />
        </>
    )
}

export default Search;
