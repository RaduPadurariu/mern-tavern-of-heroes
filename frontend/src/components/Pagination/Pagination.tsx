import { useSearchParams } from "react-router";
import type { PaginationProps } from "../../types/types";
import ReactPaginate from "react-paginate";

const Pagination = <T,>({
  itemsPerPage,
  values,
  renderItem,
}: PaginationProps<T>) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const pageFromQuery = Number(searchParams.get("page")) || 1;

  const startIndex = (pageFromQuery - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = values.slice(startIndex, endIndex);
  const pageCount = Math.ceil(values.length / itemsPerPage);

  const handlePageChange = (event: { selected: number }) => {
    // event.selected este indexul paginii
    const nextPage = event.selected + 1;

    setSearchParams({ page: String(nextPage) });

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section>
      {currentItems.map(renderItem)}
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageChange}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
        containerClassName="flex items-center justify-center gap-2 my-6"
        pageClassName="px-3 py-1 rounded cursor-pointer hover:opacity-80"
        activeClassName="bg-(--light-color) text-(--primary-color)"
        previousClassName="px-3 py-1 mr-2 cursor-pointer"
        nextClassName="px-3 py-1 ml-2 cursor-pointer"
        disabledClassName="opacity-40 cursor-not-allowed"
        breakClassName="px-2"
      />
    </section>
  );
};

export default Pagination;
