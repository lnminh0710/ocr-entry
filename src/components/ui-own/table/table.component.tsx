import React from "react";
import styles from "./table.module.scss";

import {
  AutoSizer,
  List,
  Size,
  CellMeasurerCache
  // InfiniteLoader,
  // InfiniteLoaderChildProps
} from "react-virtualized";

import InputSearch from "./table-search.component";
import Loading from "./table-ajax.component";
import Empty from "./table-empty.component";

import useTableHook from "./table.hook";

const _cache = new CellMeasurerCache({
  fixedWidth: true,
  minHeight: 48
});

const TableOwn: React.FC<any> = ({
  isLoading,
  columns,
  rowCount,
  datas,
  onRowClick,
  renderAdvanceSearch,
  isShowAdvanced,
  indexSelected,
  onSearch,
  onLoadMore,
  order,
  orderBy,
  doCreate,
  ...tableProps
}) => {
  const { _headerRenderer, _rowRenderer } = useTableHook({
    columns,
    datas,
    onRowClick,
    _cache,
    indexSelected,
    order,
    orderBy,
    onSearch
  });

  return (
    <div className={styles.list}>
      {/* <InfiniteLoader
        isRowLoaded={_isRowLoaded}
        loadMoreRows={onLoadMore}
        rowCount={rowCount}
      >
        {({ onRowsRendered, registerChild }: InfiniteLoaderChildProps) => ( */}
      <AutoSizer>
        {({ width, height }: Size) => {
          // 48 : height of header
          // 60 : height of search

          return (
            <div style={{ width, height, position: "relative" }}>
              {isLoading && <Loading style={{ width, height }} />}
              <InputSearch
                doCreate={doCreate}
                onSearch={onSearch}
                isShowAdvanced={isShowAdvanced}
                rowCount={rowCount}
                width={width}
                renderAdvanceSearch={renderAdvanceSearch}
              />
              {_headerRenderer(width)}
              {rowCount === 0 && <Empty style={{ width }} />}
              <List
                // ref={registerChild}
                // onRowsRendered={onRowsRendered}
                deferredMeasurementCache={_cache}
                height={height - 48 - 60}
                width={width}
                rowCount={datas.length}
                rowHeight={48}
                rowRenderer={_rowRenderer}
                {...tableProps}
              />
            </div>
          );
        }}
      </AutoSizer>
      {/* )}
      </InfiniteLoader> */}
    </div>
  );
};

export default TableOwn;
