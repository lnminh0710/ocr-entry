import React from "react";
// import { useTranslation } from "react-i18next";

import GridComponent from "./grid.component";

interface IGridProps {
  onRowClick: Function;
  rowRender: any;
  scrollToRow?: number;
  columnCount: number;
  rowCount: number;
}

const GridContainer: React.FC<IGridProps> = ({
  onRowClick,
  columnCount,
  rowCount,
  rowRender,
  scrollToRow = 0
}) => {
  // const { t } = useTranslation(["common"]);

  return (
    <GridComponent
      rowCount={rowCount}
      columnCount={columnCount}
      rowRender={rowRender}
    ></GridComponent>
  );
};

export default GridContainer;
