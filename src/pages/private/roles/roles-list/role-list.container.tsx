import React from "react";

import List from "components/ui-own/grid-card/grid-card.component";

const RoleList: React.FC<any> = ({
  state,
  handleSearch,
  handleClick,
  doCreateData
}) => {
  return (
    <List
      keyValue={"name"}
      datas={state.datas}
      doCreateData={doCreateData}
      onItemClick={handleClick}
      handleSearch={handleSearch}
      isFirstLoad={state.isFirstLoad}
      isLoading={state.isLoading}
    />
  );
};

export default RoleList;
