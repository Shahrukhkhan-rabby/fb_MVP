// API URL
const apiUrl = "http://localhost:5000/api/auth"; // Change to your backend URL if different

// DOM Elements
const profilePicInput = document.getElementById("profilePicInput");
const profilePicPreview = document.getElementById("profilePicPreview");
const saveButton = document.getElementById("saveProfilePic");

// Function to handle profile picture upload
const handleProfilePicChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    // Preview the image
    const reader = new FileReader();
    reader.onload = () => {
      profilePicPreview.src = reader.result;
    };
    reader.readAsDataURL(file);
  }
};

// Function to upload profile picture to Cloudinary
const uploadProfilePic = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "facebookMVP"); // Replace with your Cloudinary upload preset

  try {
    const response = await fetch("https://api.cloudinary.com/v1_1/dshbrth4o/image/upload", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    console.log("Cloudinary response:", data);
    if (data.secure_url) {
    return data.secure_url; // Return the Cloudinary URL of the uploaded image
  } else {
    throw new Error("Failed to upload image to Cloudinary" + JSON.stringify(data));
  }
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
    alert("Failed to upload image to Cloudinary. Please try again.")
    return null;
  }

};

// Function to update the user's profile picture on the backend
const updateProfilePic = async (imageUrl) => {
  const token = localStorage.getItem("authToken"); // Assuming JWT is stored in localStorage after login
  if (!token) {
    alert("You must be logged in to update your profile picture.");
    return;
  }

  try {
    const response = await fetch(`${apiUrl}/updateProfilePic`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({ profilePicUrl: imageUrl }),
    });

    const data = await response.json();
    if (data.success) {
      alert("Profile picture updated successfully!");
    } else {
      alert("Failed to update profile picture.");
    }
  } catch (error) {
    console.error("Error updating profile picture:", error);
  }
};

// Event listener for profile picture change
profilePicInput.addEventListener("change", handleProfilePicChange);

// Event listener for save button
saveButton.addEventListener("click", async () => {
  const file = profilePicInput.files[0];
  if (file) {
    // Upload the image to Cloudinary
    const imageUrl = await uploadProfilePic(file);
    if (imageUrl) {
      // Update the user's profile picture
      updateProfilePic(imageUrl);
    } else {
      alert("Failed to upload image. Please try again.");
    }
  } else {
    alert("Please select a profile picture.");
  }
});
