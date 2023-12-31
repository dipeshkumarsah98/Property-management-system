import React from "react";
import { useQuery } from "react-query";
import { getAllProperties } from "../utils/api";
import useApi from "./useApi";

const useProperties = () => {
  const { isLoading, isError, data, fetchData } = useApi();

  React.useEffect(() => {
    fetchData("/property");
  }, []);

  return {
    data,
    isError,
    isLoading,
  };
};

export default useProperties;
