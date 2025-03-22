// Fetch posts for the home page
async function fetchPosts() {
    const res = await fetch('http://localhost:5000/api/post', {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    });
    const posts = await res.json();
    const postList = document.getElementById('postList');
    posts.forEach(post => {
        const postItem = document.createElement('div');
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
async function commentOnPost(postId, commentText) {
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
