import "./pagination.css";
const Pagination = ({ currentPage, handlePage }) => {
  const pages = ["<", 1, 2, 3, 4, 5, ">"];
  return (
    <>
      <div className="page-container">
        {pages.map((page, i) => {
          return (
            <div
              className={currentPage === i ? "page current" : "page"}
              onClick={() => {
                handlePage(i);
              }}
            >
              {page}
            </div>
          );
        })}
      </div>
    </>
  );
};
export default Pagination;
