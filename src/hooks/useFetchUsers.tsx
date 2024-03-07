import { useState, useEffect, useCallback } from 'react';
import { User } from '../types/User';

const useFetchUsers = (url: string) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [users, setUsers] = useState<User[]>([]);

  const putRequest = async (id: string, data: User) => {
    const response = await fetch(`http://localhost:3001/users/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
  
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  
    return response.json();
  };
  

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(url);
      const result = await response.json();
      setUsers(result);
    } catch (error: any) {
      setError(error.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  },[url]);

  useEffect(() => {
    fetchData();
  }, [fetchData, url]);



  const getRequest = () => {
    fetchData();
  };

  const deleteRequest = async (id: string) => {
    setLoading(true);
    try {
      const response = await fetch(`${url}/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
      setLoading(false);
    } catch (error: any) {
      setError(error.message);

    }
  };

  const postRequest = async (formData: User) => {
    setLoading(true);
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }
      const data = await response.json();
      setUsers((prevUsers) => [...prevUsers, data]);
      setLoading(false);
    } catch (error: any) {
      setError(error.message);
    }
  };

  return { loading, error, users, deleteRequest, postRequest, getRequest, putRequest };
};

export default useFetchUsers;

