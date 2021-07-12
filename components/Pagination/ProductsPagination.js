import { useRouter } from 'next/router';
import React from 'react';
import { Pagination as PaginationSU } from 'semantic-ui-react';
import queryString from 'query-string'

const ProductsPagination = ({totalProducts, page, limitPage}) => {

    const totalPages = Math.ceil( totalProducts / limitPage);
    const router = useRouter();
    const urlParse = queryString.parseUrl(router.asPath);

    const goToPage = (newPage) => {
        urlParse.query.page = newPage;
        const url = queryString.stringifyUrl(urlParse);
        router.push(url);
    }
    return (
        <div className="__products_pagination">
            <PaginationSU
                defaultActivePage={page}
                totalPages={totalPages}
                firstItem={null}
                lastItem={null}
                onPageChange={(_, data) => goToPage(data.activePage)}
                boundaryRange={0}
                siblingRange={1}
                ellipsisItem={null}
            />
        </div>
    )
}

export default ProductsPagination;
