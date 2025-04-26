import axios from 'axios';

const API_URL = 'http://localhost:8082/api';

const api = axios.create({
  baseURL: API_URL
});

// Set user context for API calls
export const setUserContext = (username, userImage = null) => {
  if (username) {
    api.defaults.headers.common['X-User-Name'] = username;
    if (userImage) {
      api.defaults.headers.common['X-User-Image'] = userImage;
    }
    console.log("User context set:", username); // Add logging
  } else {
    console.warn("Attempted to set empty username in API context");
  }
};

// Make sure this is called when your app initializes
export const initializeApiWithUser = () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  if (user && user.name) {
    setUserContext(user.name, user.profileImage);
  } else {
    console.warn("No user found in localStorage");
  }
};

// Posts
export const fetchPosts = async () => {
  const response = await api.get('/posts');
  return response.data;
};

export const createPost = async (postData) => {
  const response = await api.post('/posts', postData);
  return response.data;
};

export const updatePost = async (id, postData) => {
  const response = await api.put(`/posts/${id}`, postData);
  return response.data;
};

export const deletePost = async (id) => {
  await api.delete(`/posts/${id}`);
  return true;
};

// Likes and Dislikes
export const likePost = async (id) => {
  const response = await api.post(`/posts/${id}/like`);
  return response.data;
};

export const dislikePost = async (id) => {
  const response = await api.post(`/posts/${id}/dislike`);
  return response.data;
};

// Comments
export const addComment = async (postId, comment) => {
  const response = await api.post(`/posts/${postId}/comments`, { text: comment });
  return response.data;
};

export const editComment = async (postId, commentId, comment) => {
  const response = await api.put(`/posts/${postId}/comments/${commentId}`, { text: comment });
  return response.data;
};

export const deleteComment = async (postId, commentId) => {
  const response = await api.delete(`/posts/${postId}/comments/${commentId}`);
  return response.data;
};

export default api;