// home.js

// Function to handle post creation
document.getElementById('postBtn').addEventListener('click', async function () {
    const postContent = document.getElementById('postContent').value.trim();
    if (!postContent) {
        alert("⚠️ Post cannot be empty!");
        return;
    }

    try {
        const response = await fetch('http://localhost:5000/api/post/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({ content: postContent })
        });

        const data = await response.json();

        if (response.ok) {
            document.getElementById('postContent').value = '';  // Clear the textarea
            fetchPosts();  // Reload posts after creating a new one
        } else {
            alert(`❌ Failed to create post: ${data?.msg || 'Unknown error'}`);
        }
    } catch (error) {
        console.error("Error:", error);
        alert('⚠️ An error occurred while creating the post.');
    }
});

// Fetch posts
async function fetchPosts() {
    try {
        const response = await fetch('http://localhost:5000/api/post', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });

        const posts = await response.json();
        const postList = document.getElementById('postList');
        postList.innerHTML = '';

        posts.forEach(post => {
            const postItem = document.createElement('div');
            postItem.classList.add('post-item');
            postItem.innerHTML = `
                <div class="post-header">
                    <h3>${post.user.name}</h3>
                    <p>${new Date(post.createdAt).toLocaleString()}</p>
                </div>
                <p class="post-text">${post.content}</p>
                <div class="post-actions">
                    <button>Like</button>
                    <button>Comment</button>
                </div>
            `;
            postList.appendChild(postItem);
        });
    } catch (error) {
        alert('⚠️ Error fetching posts.');
    }
}

// Load posts when the page loads
fetchPosts();

// Logout functionality
document.getElementById('logoutBtn').addEventListener('click', () => {
    localStorage.removeItem('token');
    window.location.href = 'login.html';  // Redirect to login page
});
