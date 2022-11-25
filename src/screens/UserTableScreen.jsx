import axios from "axios";
import { useEffect, useState } from "react";
import BaseTable, { Column } from "react-base-table";
import "react-base-table/styles.css";
import MoreInfoButton from "../components/MoreInfoButton";
import useWindowDimensions from "../hooks/useWindowsDimensions";

const getDataByURL = async (url) => {
  const { data } = await axios.get(url);
  return data;
};

export default function UserTableScreen() {
  const [users, setUsers] = useState([]);
  const { height, width } = useWindowDimensions();
  const numColums = 7;
  const url = "https://dummyjson.com/users";

  const getUsers = async (url) => {
    const resp = await getDataByURL(url);
    setUsers(resp?.users);
  };

  useEffect(() => {
    getUsers(url);
  }, []);

  return (
    <>
      <BaseTable
        data={users}
        width={width}
        height={height}
        rowHeight={height / numColums}>
        <Column key='firstName' dataKey='firstName' width={width / numColums} />
        <Column key='lastName' dataKey='lastName' width={width / numColums} />
        <Column key='age' dataKey='age' width={width / numColums} />
        <Column
          key='maidenName'
          dataKey='maidenName'
          width={width / numColums}
        />
        <Column key='ip' dataKey='ip' width={width / numColums} />
        <Column
          key='image'
          dataKey='image'
          width={width / numColums}
          cellRenderer={({ cellData }) => <img alt={cellData} src={cellData} />}
        />
        <Column
          key='moreInfo'
          dataKey='moreInfo'
          width={width / numColums}
          cellRenderer={({ rowData }) => {
            return <MoreInfoButton userInfo={rowData} />;
          }}
        />
      </BaseTable>
    </>
  );
}
