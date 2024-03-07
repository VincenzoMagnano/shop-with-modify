import { useState, useEffect, useCallback } from 'react';
import { FormValues } from '../components/SignupForm/SignupForm';
type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';



const useApi = (apiUrl: string) => {
  const [data, setData] = useState<FormValues[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(apiUrl);
      const result: FormValues[] = await response.json();
      setData(result);
    } catch (error: any) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, [apiUrl]);

  const sendRequest = async (
    method: HttpMethod,
    id?: string | number,
    formData?: FormValues
  ) => {
    const url = id ? `${apiUrl}/${id}` : apiUrl;
    const requestOptions: RequestInit = {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: formData ? JSON.stringify(formData) : undefined,
    };

    try {
      const response = await fetch(url, requestOptions);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      if (method === 'DELETE') {
        setData((prevData) => prevData.filter((item) => item.id !== id));
      } 
      
      else {
        const result: FormValues[] = await response.json();

        if (method === 'POST') {
          setData((prevData) => [...prevData, ...result]);
        } 
        
        else if (method === 'PUT') {
          setData((prevData) =>
            prevData.map((item) => (item.id === id ? result[0] : item))
          );
        }
      }
    } catch (error:any) {
      setError(error);
    }
  };

  const postData = (formData: FormValues) => sendRequest('POST', undefined, formData);
  const updateData = (id: string , formData: FormValues) =>
    sendRequest('PUT', id, formData);
  const deleteData = (id: string ) => sendRequest('DELETE', id);

  useEffect(() => {
    fetchData();
  }, [apiUrl, fetchData]);

  return {
    data,
    loading,
    error,
    postData,
    updateData,
    deleteData,
  };
};

export default useApi;
