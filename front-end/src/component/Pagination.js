import React from 'react'

export default function Pagination({pagination , onChangePagination }) {
    const {size , page , totalRecord} = pagination;
    const totalPage = Math.ceil(totalRecord / size);


    return (
        <div className="pagination">
				<button className="button-page"
                disabled = {page <= 0}
                onClick = {() => onChangePagination(page - 1)}>Previous</button>
				<button className="button-page"
                disabled = {page >= totalPage - 1}
                onClick = {() => onChangePagination(page + 1)}>Next</button>
		</div>
    )
}
