import { useCallback, useState } from "react";
import client from "src/utils/client";

const useApi = () => {
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [isError, setError] = useState("");

  const fetchData = useCallback(async (url) => {
    try {
      setLoading(true);
      const response = await client.get(url);
      setData(response.data.payload);
      setError("");
    } catch (err) {
      setError("Error fetching data");
    } finally {
      setLoading(false);
    }
    return null;
  }, []);

  const post = async (url, newData) => {
    try {
      setLoading(true);
      await client.post(url, newData);
      setError("");
      await fetchData(url);
    } catch (err) {
      setError("Error updating data");
    } finally {
      setLoading(false);
    }
  };

  const update = async (url, id, newData) => {
    try {
      setLoading(true);
      await client.put(`${url}/${id}`, newData);
      setError("");
      await fetchData(url);
    } catch (err) {
      setError("Error updating data");
    } finally {
      setLoading(false);
    }
  };

  const remove = async (url, id) => {
    try {
      setLoading(true);
      await client.delete(`${url}/${id}`);
      setError("");
      await fetchData(url);
    } catch (err) {
      setError("Error deleting data");
    } finally {
      setLoading(false);
    }
  };

  return { isLoading, isError, data, fetchData, post, update, remove };
};

export default useApi;
