async function fetchPosts(callback) {
    try {
      const res = await fetch("http://localhost:5000/api/post");
      const data = await res.json();
      
      if (res.ok) {
        callback(data); // If successful, call the callback with posts data
      } else {
        console.error("Failed to fetch posts");
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  }
  