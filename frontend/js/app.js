document.addEventListener("DOMContentLoaded", function() {
    const postsContainer = document.getElementById("posts-container");
  
    // Function to display posts on the page
    function displayPosts(posts) {
      if (posts.length === 0) {
        postsContainer.innerHTML = "<p>No posts available.</p>";
        return;
      }
  
      postsContainer.innerHTML = ""; // Clear the loading text
  
      posts.forEach((post) => {
        const postElement = document.createElement("div");
        postElement.classList.add("post");
  
        const postUser = document.createElement("h3");
        postUser.textContent = post.user.name;
        postElement.appendChild(postUser);
  
        const postContent = document.createElement("p");
        postContent.textContent = post.content;
        postElement.appendChild(postContent);
  
        // Display image if available
        if (post.image) {
          const postImage = document.createElement("img");
          postImage.src = post.image;
          postElement.appendChild(postImage);
        }
  
        const postLikes = document.createElement("p");
        postLikes.textContent = `Likes: ${post.likes.length}`;
        postElement.appendChild(postLikes);
  
        // Add comments
        const commentsTitle = document.createElement("h4");
        commentsTitle.textContent = "Comments:";
        postElement.appendChild(commentsTitle);
  
        const commentsList = document.createElement("ul");
        post.comments.forEach((comment) => {
          const commentItem = document.createElement("li");
          commentItem.innerHTML = `<strong>${comment.user.name}:</strong> ${comment.text}`;
          commentsList.appendChild(commentItem);
        });
        postElement.appendChild(commentsList);
  
        postsContainer.appendChild(postElement);
      });
    }
  
    // Fetch posts from the server
    fetchPosts(displayPosts);
  });
  