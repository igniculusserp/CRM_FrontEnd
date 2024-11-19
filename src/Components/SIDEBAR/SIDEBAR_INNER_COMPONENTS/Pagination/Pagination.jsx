const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  siblingCount = 1,
}) => {
  const getPaginationRange = (currentPage, totalPages, siblingCount = 1) => {
    const totalPageNumbers = siblingCount * 2 + 5;

    // If total pages are less than the range, show all pages
    if (totalPages <= totalPageNumbers) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 2);
    const rightSiblingIndex = Math.min(
      currentPage + siblingCount,
      totalPages - 1
    );

    const showLeftDots = leftSiblingIndex > 2;
    const showRightDots = rightSiblingIndex < totalPages - 1;

    const range = [];

    // Add the first page
    range.push(1);

    // Add left dots if needed
    if (showLeftDots) {
      range.push('...');
    }

    // Add the range of numbers between siblings
    for (let i = leftSiblingIndex; i <= rightSiblingIndex; i++) {
      range.push(i);
    }

    // Add right dots if needed
    if (showRightDots) {
      range.push('...');
    }

    // Add the last page
    range.push(totalPages);

    return range;
  };

  const paginationRange = getPaginationRange(
    currentPage,
    totalPages,
    siblingCount
  );

  return (
    <nav className="flex items-center justify-center space-x-2 mt-3 mb-3">
      {/* Previous Button */}
      <button
        onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-4 py-1.5 border ${
          currentPage === 1
            ? 'text-gray-400 cursor-not-allowed'
            : 'text-gray-800 hover:bg-gray-100'
        }`}
      >
        &lt;
      </button>

      {/* Page Numbers */}
      {paginationRange.map((page, idx) => {
        if (page === '...') {
          return (
            <span key={idx} className="px-4 py-1.5 text-gray-400">
              ...
            </span>
          );
        }

        return (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`px-4 py-1.5 border ${
              page === currentPage
                ? 'bg-blue-500 text-white'
                : 'text-gray-800 hover:bg-gray-100'
            }`}
          >
            {page}
          </button>
        );
      })}

      {/* Next Button */}
      <button
        onClick={() =>
          currentPage < totalPages && onPageChange(currentPage + 1)
        }
        disabled={currentPage === totalPages}
        className={`px-4 py-1.5 border ${
          currentPage === totalPages
            ? 'text-gray-400 cursor-not-allowed'
            : 'text-gray-800 hover:bg-gray-100'
        }`}
      >
        &gt;
      </button>
    </nav>
  );
};

export default Pagination;