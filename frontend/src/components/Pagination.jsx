const Pagination = ({ items, pageSize, currentPage, onPageChange }) => {
    const pagesCount = Math.ceil(items / pageSize);
  
    if (pagesCount === 1) return null;
    const pages = Array.from({ length: pagesCount }, (_, i) => i + 1);
  
    return (
      <>
        <nav>
          <ul className="pagination" style={{ display: "flex", justifyContent: "center" }}>
            {pages.map((page) => (
              <li
                className={`page-item ${page === currentPage ? 'current-page' : ''}`}
                style={{ cursor: 'pointer', marginRight: "20px", border: "2px solid black", padding: "5px" }}
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
  