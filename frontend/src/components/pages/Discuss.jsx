import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  fetchPosts, createPost, updatePost, deletePost,
  likePost, dislikePost, addComment as apiAddComment, 
  editComment as apiEditComment, deleteComment as apiDeleteComment,
  setUserContext 
} from '../../services/api';

const Discuss = () => {
  const { user, isLoggedIn } = useAuth();
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({
    title: '',
    content: '',
    images: [] // Change from single image to array of images
  });
  const [editingPost, setEditingPost] = useState(null);
  const [imagePreviews, setImagePreviews] = useState([]); // Change to array for multiple previews
  const [isExpanded, setIsExpanded] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Set user context for API calls
  useEffect(() => {
    if (isLoggedIn && user) {
      setUserContext(user.name, user.profileImage);
    }
  }, [user, isLoggedIn]);

  // Load posts from API on initial render
  useEffect(() => {
    const loadPosts = async () => {
      try {
        setLoading(true);
        const data = await fetchPosts();
        setPosts(data || []);
        setError(null);
      } catch (err) {
        console.error('Error fetching posts:', err);
        setError('Failed to load posts. Please try again later.');
        // Fallback to localStorage if API fails
        const savedPosts = localStorage.getItem('posts');
        if (savedPosts) {
          setPosts(JSON.parse(savedPosts));
        }
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, []);

  // Update handleImageChange to handle multiple files
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          
          const maxWidth = 600;
          const maxHeight = 400;
          
          let width = img.width;
          let height = img.height;
          
          if (width > height) {
            if (width > maxWidth) {
              height = Math.round((height * maxWidth) / width);
              width = maxWidth;
            }
          } else {
            if (height > maxHeight) {
              width = Math.round((width * maxHeight) / height);
              height = maxHeight;
            }
          }
          
          canvas.width = width;
          canvas.height = height;
          ctx.drawImage(img, 0, 0, width, height);
          
          const resizedImage = canvas.toDataURL('image/jpeg', 0.8);
          
          setNewPost(prev => ({
            ...prev,
            images: [...prev.images, file]
          }));
          setImagePreviews(prev => [...prev, resizedImage]);
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    });
  };

  // Edit post handler - updated to use API post structure
  const handleEditPost = (post) => {
    if (post.author !== user?.name) {
      alert('You can only edit your own posts');
      return;
    }
    
    // Set editing state with all required fields
    setEditingPost({
      id: post.id,
      title: post.title,
      content: post.content,
      images: post.images || []
    });

    // Update form state
    setNewPost({
      title: post.title,
      content: post.content,
      images: post.images || []
    });

    // Update image previews
    setImagePreviews(post.images || []);
    setIsExpanded(true);
    
    // Scroll to top smoothly
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Update delete post handler to use API
  const handleDeletePost = async (postId) => {
    if (!isLoggedIn) {
      alert('Please login to delete posts');
      return;
    }

    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await deletePost(postId);
        setPosts(prev => prev.filter(post => post.id !== postId));
      } catch (error) {
        alert('Failed to delete the post. Please try again.');
      }
    }
  };

  // Update handleSubmit to use API
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isLoggedIn) {
      alert('Please login to create a post');
      return;
    }

    try {
      if (editingPost) {
        // Update existing post via API
        const updatedPost = await updatePost(editingPost.id, {
          title: newPost.title,
          content: newPost.content,
          images: imagePreviews
        });
        
        setPosts(prev => prev.map(post => 
          post.id === updatedPost.id ? updatedPost : post
        ));
        setEditingPost(null);
      } else {
        // Create new post via API
        const createdPost = await createPost({
          title: newPost.title,
          content: newPost.content,
          images: imagePreviews
        });
        
        setPosts(prev => [createdPost, ...prev]);
      }

      // Reset form
      setNewPost({ title: '', content: '', images: [] });
      setImagePreviews([]);
      setIsExpanded(false);
    } catch (error) {
      alert('Failed to save your post. Please try again.');
    }
  };

  // Update handleLike to use API
  const handleLike = async (postId) => {
    if (!isLoggedIn) {
      alert('Please login to like posts');
      return;
    }

    try {
      const updatedPost = await likePost(postId);
      setPosts(prev =>
        prev.map(post => post.id === postId ? updatedPost : post)
      );
    } catch (error) {
      alert('Failed to like the post. Please try again.');
    }
  };

  // Update handleDislike to use API
  const handleDislike = async (postId) => {
    if (!isLoggedIn) {
      alert('Please login to dislike posts');
      return;
    }

    try {
      const updatedPost = await dislikePost(postId);
      setPosts(prev =>
        prev.map(post => post.id === postId ? updatedPost : post)
      );
    } catch (error) {
      alert('Failed to dislike the post. Please try again.');
    }
  };

  // Update addComment to use API
  const addComment = async (postId, commentText) => {
    if (!isLoggedIn) {
      alert('Please login to comment');
      return;
    }

    try {
      const updatedPost = await apiAddComment(postId, commentText);
      setPosts(prev =>
        prev.map(post => post.id === postId ? updatedPost : post)
      );
    } catch (error) {
      alert('Failed to add comment. Please try again.');
    }
  };

  // Update handleEditComment to use API
  const handleEditComment = async (postId, commentId) => {
    const post = posts.find(p => p.id === postId);
    const comment = post?.comments.find(c => c.id === commentId);
    
    if (!comment || comment.author !== user?.name) {
      alert('You can only edit your own comments');
      return;
    }

    const newText = prompt('Edit your comment:', comment.text);
    if (newText && newText !== comment.text) {
      try {
        const updatedPost = await apiEditComment(postId, commentId, newText);
        setPosts(prev =>
          prev.map(post => post.id === postId ? updatedPost : post)
        );
      } catch (error) {
        alert('Failed to update comment. Please try again.');
      }
    }
  };

  // Update handleDeleteComment to use API
  const handleDeleteComment = async (postId, commentId) => {
    const post = posts.find(p => p.id === postId);
    const comment = post?.comments.find(c => c.id === commentId);
    
    if (!comment || comment.author !== user?.name) {
      alert('You can only delete your own comments');
      return;
    }

    if (window.confirm('Are you sure you want to delete this comment?')) {
      try {
        const updatedPost = await apiDeleteComment(postId, commentId);
        setPosts(prev =>
          prev.map(post => post.id === postId ? updatedPost : post)
        );
      } catch (error) {
        alert('Failed to delete comment. Please try again.');
      }
    }
  };

  // Add this helper function to generate profile letter image
  const getProfileLetter = (name) => {
    return name?.[0]?.toUpperCase() || '?';
  };

  // Add a ProfileImage component
  const ProfileImage = ({ user, className }) => {
    const firstLetter = getProfileLetter(user?.name);

    return (
      <div className={`${className} bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center text-white font-semibold relative overflow-hidden`}>
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent rotate-45"></div>
        <span className="transform transition-transform duration-200">
          {firstLetter}
        </span>
      </div>
    );
  };

  // Update the renderPostActions with enhanced styling
  const renderPostActions = (post) => (
    <div className="flex items-center gap-2">
      {post.author === user?.name && (
        <>
          <button
            onClick={() => handleEditPost(post)}
            className="text-gray-300 hover:text-green-400 transition-colors p-2 rounded-full hover:bg-gray-700/50
                      transform hover:scale-110 active:scale-95"
            title="Edit post"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
          <button
            onClick={() => handleDeletePost(post.id)}
            className="text-gray-300 hover:text-red-400 transition-colors p-2 rounded-full hover:bg-gray-700/50
                      transform hover:scale-110 active:scale-95"
            title="Delete post"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </>
      )}
    </div>
  );

  // Add image removal function
  const handleRemoveImage = (index) => {
    setNewPost(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
    setImagePreviews(prev => prev.filter((_, i) => i !== index));
  };

  // Add loading state
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center items-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-green-500 border-t-transparent mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading discussions...</p>
        </div>
      </div>
    );
  }

  // Add error state
  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded">
          <p>{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8"> {/* Remove max-w-3xl to allow full width */}
      {/* Create/Edit Post Section */}
      <div className="max-w-3xl mx-auto mb-8"> {/* Keep the form centered with max width */}
        <div 
          className={`bg-gradient-to-br from-green-100 to-blue-100 rounded-xl shadow-sm p-6 mb-8 
                    transition-all duration-300 transform relative overflow-hidden
                    ${isExpanded ? 'scale-102 shadow-lg ring-2 ring-green-500' : 'hover:shadow-md'}`}
        >
          {/* Add subtle pattern overlay */}
          <div className="absolute inset-0 opacity-5">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="absolute text-4xl"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  transform: `rotate(${Math.random() * 360}deg)`,
                  opacity: 0.1
                }}
              >
                🌿
              </div>
            ))}
          </div>

          {/* Header with enhanced styling */}
          <div className="relative z-10">
            <h1 className="text-2xl font-bold mb-6 flex items-center gap-2 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              {editingPost ? 'Edit Post' : 'Community Discussions'}
              <span className="text-sm bg-green-100 text-green-600 px-2 py-1 rounded-full">
                {editingPost ? 'Edit mode' : 'Share your thoughts'}
              </span>
            </h1>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div 
                className="relative border rounded-lg focus-within:ring-2 focus-within:ring-green-500"
                onClick={() => setIsExpanded(true)}
              >
                {/* Profile preview in post box */}
                <div className="absolute left-4 top-4">
                  <ProfileImage 
                    user={user}
                    className="w-8 h-8 rounded-full"
                  />
                </div>

                <input
                  type="text"
                  value={newPost.title}
                  onChange={(e) => setNewPost(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Enter post title"
                  className="w-full p-4 pl-16 rounded-lg border-none focus:ring-0"
                  required
                />
              </div>
              
              <textarea
                value={newPost.content}
                onChange={(e) => setNewPost(prev => ({ ...prev, content: e.target.value }))}
                placeholder="What's on your mind?"
                className="w-full p-4 border rounded-lg focus:ring-2 focus:ring-green-500 resize-none"
                rows="3"
                required
              />
              
              {/* Update the image preview container for multiple images */}
              {imagePreviews.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {imagePreviews.map((preview, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={preview}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(index)}
                        className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 cursor-pointer text-gray-600 hover:text-green-600">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>Add Photo</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    multiple
                    className="hidden"
                  />
                </label>
                <button
                  type="submit"
                  disabled={!newPost.title || !newPost.content}
                  className="ml-auto bg-green-600 text-white px-6 py-2 rounded-full disabled:opacity-50"
                >
                  {editingPost ? 'Update Post' : 'Post'}
                </button>
                {editingPost && (
                  <button
                    type="button"
                    onClick={() => {
                      setEditingPost(null);
                      setNewPost({ title: '', content: '', images: [] });
                      setImagePreviews([]);
                      setIsExpanded(false);
                    }}
                    className="ml-4 bg-gray-500 text-white px-6 py-2 rounded-full"
                  >
                    Cancel Edit
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Posts List with grid layout */}
      {posts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No posts yet. Be the first to share!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"> {/* Changed from space-y-6 to grid */}
          {posts.map(post => (
            <div 
              key={post.id} 
              className="bg-gradient-to-br from-white to-blue-50 rounded-xl shadow-md p-6 
                        hover:shadow-lg transition-all duration-300 border border-gray-200
                        hover:border-green-400" // Updated background and text colors
            >
              {/* Post Header with enhanced styling */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="absolute -inset-1 bg-gradient-to-r from-green-400 to-blue-400 rounded-full blur opacity-30"></div>
                    <ProfileImage 
                      user={{ name: post.author }}
                      className="w-10 h-10 rounded-full relative"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">{post.author}</h3>
                    <p className="text-sm text-gray-500">
                      {new Date(post.timestamp).toLocaleDateString()}
                      {post.edited && (
                        <span className="ml-2 text-xs text-gray-400">
                          • Edited {new Date(post.editedAt).toLocaleDateString()}
                        </span>
                      )}
                    </p>
                  </div>
                </div>
                {renderPostActions(post)}
              </div>

              {/* Post Title with enhanced styling */}
              <h2 className="text-lg font-semibold mb-2 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                {post.title}
              </h2>

              {/* Post Content with enhanced styling */}
              <p className="mb-4 text-gray-700 bg-gray-50 p-4 rounded-lg border border-gray-100">
                {post.content}
              </p>
              
              {/* Update the post image container styles in the posts list */}
              {post.images && post.images.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-4">
                  {post.images.map((image, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={image}
                        alt={`Post image ${index + 1}`}
                        className="w-full h-40 object-cover rounded-lg hover:opacity-90 transition-opacity duration-300"
                      />
                    </div>
                  ))}
                </div>
              )}

              {/* Interactions with enhanced styling */}
              <div className="flex items-center gap-4 border-t border-gray-200 pt-4">
                <button
                  onClick={() => handleLike(post.id)}
                  className="flex items-center gap-1 text-gray-600 hover:text-green-500 transition-all duration-300 
                            transform hover:scale-110 active:scale-95 p-2 rounded-full hover:bg-green-50"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  <span className="font-medium">{post.likes}</span>
                </button>

                <button
                  onClick={() => handleDislike(post.id)}
                  className="flex items-center gap-1 text-gray-600 hover:text-blue-500 transition-all duration-300 
                            transform hover:scale-110 active:scale-95 p-2 rounded-full hover:bg-blue-50"
                >
                  <svg className="w-6 h-6 transform rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  <span className="font-medium">{post.dislikes}</span>
                </button>

                <button
                  onClick={() => {
                    const comment = prompt('Add a comment:');
                    if (comment) addComment(post.id, comment);
                  }}
                  className="flex items-center gap-1 text-gray-600 hover:text-green-500 transition-all duration-300 
                            transform hover:scale-110 active:scale-95 p-2 rounded-full hover:bg-green-50"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9 8s9-3.582 9-8z" />
                  </svg>
                  <span className="font-medium">{post.comments.length}</span>
                </button>
              </div>

              {/* Show edited indicator */}
              {post.edited && (
                <div className="text-xs text-gray-500 mt-2">
                  Edited {new Date(post.editedAt).toLocaleDateString()}
                </div>
              )}

              {/* Comments with enhanced styling */}
              {post.comments && post.comments.length > 0 && (
                <div className="mt-4 space-y-2">
                  {post.comments.map(comment => (
                    <div 
                      key={comment.id} 
                      className="bg-blue-50/50 backdrop-blur-sm p-3 rounded-lg border border-gray-200
                                hover:border-green-400 transition-colors duration-300 group"
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-green-600">{comment.author}</span>
                            {comment.edited && (
                              <span className="text-xs text-gray-500">(edited)</span>
                            )}
                          </div>
                          <p className="text-gray-700 mt-1">{comment.text}</p>
                        </div>
                        
                        {comment.author === user?.name && (
                          <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                              onClick={() => handleEditComment(post.id, comment.id)}
                              className="text-gray-400 hover:text-green-500 transition-colors p-1 rounded-full hover:bg-green-50"
                              title="Edit comment"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                              </svg>
                            </button>
                            <button
                              onClick={() => handleDeleteComment(post.id, comment.id)}
                              className="text-gray-400 hover:text-blue-500 transition-colors p-1 rounded-full hover:bg-blue-50"
                              title="Delete comment"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Discuss;