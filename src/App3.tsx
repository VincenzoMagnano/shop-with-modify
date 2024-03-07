import React, { useState, useEffect, useCallback } from 'react';

interface Post {
  id: number;
  title: string;
  body: string;
}

const App: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  // Funzione callback memorizzata con useCallback
  const fetchPosts = useCallback(async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts');
      const data = await response.json();
      console.log(data);
      setPosts(data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  }, []); // La dipendenza vuota indica che la funzione non dipende da alcuna variabile esterna

  // useEffect che utilizza la funzione callback memorizzata
  useEffect(() => {
    // Chiamiamo la funzione callback memorizzata
    fetchPosts();
  }, [fetchPosts]); // La dipendenza è la funzione callback, non cambierà mai

  return (
    <div>
      <h1>Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;