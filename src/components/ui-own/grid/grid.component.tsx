import React, { useRef } from "react";
import { AutoSizer, MultiGrid, GridCellProps } from "react-virtualized";
// import { useTranslation } from "react-i18next";

interface IGridProps {
  rowCount: number;
  columnCount: number;
  rowRender: any;
}

const StyleGrid = {
  border: "1px solid #f5f5f5"
};
const StyleBottomLeftGrid = {
  borderRight: "1px solid #aaa",
  backgroundColor: "#f7f7f7"
};
const StyleTopLeftGrid = {
  borderBottom: "1px solid #aaa",
  borderRight: "1px solid #aaa"
};
const StyleTopRightGrid = {
  borderBottom: "1px solid #aaa"
};

const GridComponent: React.FC<IGridProps> = ({
  rowCount,
  columnCount,
  rowRender
}) => {
  // const { t } = useTranslation(["common"]);
  const gridRef: any = useRef(null);

  const reRenderGrid = () => {
    if (gridRef) {
      gridRef.current.forceUpdateGrids();
    }
  };

  function _cellRenderer({ columnIndex, key, rowIndex, style }: GridCellProps) {
    const row = rowRender(rowIndex, columnIndex);
    return (
      <div key={key} style={style}>
        {row}
      </div>
    );
  }
  return (
    <>
      <button
        style={{ display: "none" }}
        onClick={reRenderGrid}
        id="multi-grid__rerender"
      ></button>
      <AutoSizer disableHeight>
        {({ width }) => (
          <MultiGrid
            ref={gridRef}
            className="scrollbar"
            fixedRowCount={1}
            scrollToColumn={0}
            scrollToRow={0}
            cellRenderer={_cellRenderer}
            columnWidth={width / columnCount}
            columnCount={columnCount}
            enableFixedColumnScroll
            enableFixedRowScroll
            height={300}
            rowHeight={40}
            rowCount={rowCount}
            style={StyleGrid}
            styleBottomLeftGrid={StyleBottomLeftGrid}
            styleTopLeftGrid={StyleTopLeftGrid}
            styleTopRightGrid={StyleTopRightGrid}
            width={width}
            hideTopRightGridScrollbar
            hideBottomLeftGridScrollbar
          />
        )}
      </AutoSizer>
    </>
  );
};

export default GridComponent;
