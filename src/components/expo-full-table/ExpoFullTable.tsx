import React from "react";
import { useSelector } from "react-redux";
import { ExpoList, StateType } from "types/props.types";
// import Table from "components/table/Table";


/**
 * Need to add subcollection "containers" for each expo, this way is easier to get the full data for expo full table
 * When searching for a container, we can use this example: https://firebase.google.com/docs/firestore/query-data/queries
 * using db.collectionGroup
 *  
 */



const ExpoFullTable = () => {

  


  return (
    <div>
      {/* <Table
        tableName="containers_table"
        columns={shipmentTableColumns}
        rows={containerList}
      /> */}
    </div>
  );
};

export default ExpoFullTable;
