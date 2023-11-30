import React from "react";
import useApi from "./useApi";

const usePropertyType = () => {
  const { isLoading, isError, data, fetchData } = useApi();

  React.useEffect(() => {
    fetchData("/property-type");
  }, []);

  return {
    data,
    isError,
    isLoading,
  };
};

export default usePropertyType;
