import { SetURLSearchParams } from "react-router-dom";

type PaginationControlsProps = {
    pageNum: string;
    setSearchParams: SetURLSearchParams;
};

export default function PaginationControls({
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
            <button
                onClick={() => handleNewPageClick(-1)}
                disabled={pageNum === "1"}
            >
                Prev Page
            </button>
            {pageNum}
            <button onClick={() => handleNewPageClick(1)}>Next Page</button>
        </div>
    );
}
