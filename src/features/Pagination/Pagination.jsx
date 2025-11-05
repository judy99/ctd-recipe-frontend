import Button from '../../shared/Button/Button';

export default function Pagination({
  setSearchParams,
  totalPages,
  currentPage,
}) {
  const handleNextPage = () => {
    if (currentPage + 1 <= totalPages) {
      setSearchParams({
        page: currentPage + 1,
      });
    } else {
      setSearchParams({
        page: totalPages,
      });
    }
  };
  const handlePreviousPage = () => {
    if (currentPage - 1 >= 1) {
      setSearchParams({
        page: currentPage - 1,
      });
    } else {
      setSearchParams({
        page: 1,
      });
    }
  };
  return (
    <div className="mx-auto mb-5 flex w-[400px] items-center justify-evenly rounded-[10px] border border-gray-300 p-2.5 max-[623px]:w-auto max-[623px]:flex-col">
      <Button
        title="Previous"
        disabled={currentPage === 1}
        onClickHandler={handlePreviousPage}
        className="max-[623px]:mb-1.5"
      />
      <span className="max-[623px]:mb-1.5">
        Page {currentPage} of {totalPages}
      </span>
      <Button
        title="Next"
        disabled={currentPage === totalPages}
        onClickHandler={handleNextPage}
        className="max-[623px]:mb-1.5"
      />
    </div>
  );
}
