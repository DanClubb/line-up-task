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
    const handleNewPageClick = (newPage: number) => {
        setSearchParams((prev) => {
            prev.set("page", `${parseInt(pageNum) + newPage}`);
            return prev;
        });
    };
    return (
        <div className="pagination-controls">
            <button onClick={() => handleNewPageClick(-1)} disabled={!hasPrev}>
                Prev Page
            </button>
            <span className="page-num">{pageNum}</span>
            <button onClick={() => handleNewPageClick(1)} disabled={!hasNext}>
                Next Page
            </button>
        </div>
    );
}
