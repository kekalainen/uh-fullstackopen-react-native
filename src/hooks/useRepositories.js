import { useState, useEffect } from 'react';
import Constants from 'expo-constants';

const { API_HOSTNAME, REST_API_PORT } = Constants.manifest.extra;

const useRepositories = () => {
  const [repositories, setRepositories] = useState();
  const [loading, setLoading] = useState(false);

  const fetchRepositories = async () => {
    setLoading(true);

    const response = await fetch(
      `http://${API_HOSTNAME}:${REST_API_PORT}/api/repositories`
    );

    const json = await response.json();

    setLoading(false);
    setRepositories(json);
  };

  useEffect(() => {
    fetchRepositories();
  }, []);

  return { repositories, loading, refetch: fetchRepositories };
};

export default useRepositories;
