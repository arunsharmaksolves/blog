const Pagination = ({ items, pageSize, currentPage, onPageChange }) => {
    const pagesCount = Math.ceil(items / pageSize);

    if (pagesCount === 1) return null;
    const pages = Array.from({ length: pagesCount }, (_, i) => i + 1);

    return (
        <>
            <nav aria-label="Page navigation example" className="text-center d-flex align-items-center justify-content-center">
                <ul className="pagination">
                    {pages.map((page) => (
                        <li className="page-item" style={{cursor:'pointer'}}
                        key={page}
                    >
                        <a className="page-link" onClick={() => onPageChange(page)}>
                            {page}
                        </a>
                    </li>
                    ))}
                </ul>
            </nav>
        </>
    );
};

export default Pagination;