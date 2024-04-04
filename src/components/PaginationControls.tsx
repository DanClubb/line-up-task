import { SetURLSearchParams } from "react-router-dom";

type PaginationControlsProps = {
    hasPrev: boolean;
    hasNext: boolean;
    pageNum: string;
    setSearchParams: SetURLSearchParams;
};

export default function PaginationControls({
    hasPrev,
    hasNext,
    pageNum,
    setSearchParams,
}: PaginationControlsProps) {
    // Updating the page search param when the prev/next page button is clicked so the correct page of users can be fetched
    const handleNewPageClick = (newPage: number) => {
        setSearchParams((prev) => {
            prev.set("page", `${parseInt(pageNum) + newPage}`);
            return prev;
        });
    };

    return (
        <div className="pagination-controls">
            {/* hasPrev stops users navigating and trying to fectch pages below 1 */}
            <button onClick={() => handleNewPageClick(-1)} disabled={!hasPrev}>
                Prev Page
            </button>
            <span className="page-num">{pageNum}</span>
            {/* hasNext stops users navigating and trying to fectch pages after the first page that doesn't have any users */}
            <button onClick={() => handleNewPageClick(1)} disabled={!hasNext}>
                Next Page
            </button>
        </div>
    );
}
