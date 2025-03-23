// Function to handle post creation
async function createPost(event) {
    event.preventDefault();  // Prevent the default form submission

    const content = document.getElementById('content').value;
    const imageFile = document.getElementById('image').files[0];

    const formData = new FormData();
    formData.append('content', content);

    if (imageFile) {
        formData.append('image', imageFile);
    }

    try {
        const response = await fetch('http://localhost:5000/api/post/create', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`  // Assuming JWT token is stored in localStorage
            },
            body: formData
        });

        const data = await response.json();
        if (response.ok) {
            alert('Post created successfully!');
            document.getElementById('postForm').reset(); // Reset the form after submission
            fetchPosts();  // Re-fetch posts after creating a new one
        } else {
            alert('Error creating post: ' + data.msg);
        }
    } catch (error) {
        console.error('Error:', error)
        alert('An error occurred. Please try again.')
    }
}

// Attach the createPost function to the form's submit event
document.getElementById('postForm').addEventListener('submit', createPost);

// Fetch posts for the home page
async function fetchPosts() {
    const res = await fetch('http://localhost:5000/api/post', {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    });
    const posts = await res.json();
    const postList = document.getElementById('postList');
    postList.innerHTML = '';  // Clear any previous posts before appending new ones
    posts.forEach(post => {
        const postItem = document.createElement('div');
        postItem.classList.add('post');
        postItem.innerHTML = `
            <h3>${post.user.name}</h3>
            <p>${post.content}</p>
            ${post.image ? `<img src="${post.image}" alt="Post Image" />` : ''}
            <p>Likes: ${post.likes.length}</p>
            <h4>Comments:</h4>
            <ul>
                ${post.comments.map(comment => `<li><strong>${comment.user.name}:</strong> ${comment.text}</li>`).join('')}
            </ul>
            <button onclick="likePost('${post._id}')">Like</button>
            <form onsubmit="commentOnPost(event, '${post._id}')">
                <textarea id="commentText-${post._id}" placeholder="Write a comment..." required></textarea><br>
                <button type="submit">Comment</button>
            </form>
        `;
        postList.appendChild(postItem);
    });
}

fetchPosts();

// Like post
async function likePost(postId) {
    const res = await fetch(`http://localhost:5000/api/post/${postId}/like`, {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
    });
    const data = await res.json();
    if (res.ok) {
        alert('Post liked');
        fetchPosts(); // Re-fetch posts after liking
    } else {
        alert(data.msg);
    }
}

// Comment on post
async function commentOnPost(event, postId) {
    event.preventDefault();  // Prevent default form submission

    const commentText = document.getElementById(`commentText-${postId}`).value;
    const res = await fetch(`http://localhost:5000/api/post/${postId}/comment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}` },
        body: JSON.stringify({ text: commentText })
    });
    const data = await res.json();
    if (res.ok) {
        alert('Comment added');
        fetchPosts(); // Re-fetch posts after commenting
    } else {
        alert(data.msg);
    }
}
