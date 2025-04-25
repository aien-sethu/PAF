import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';

const Skills = () => {
  const { user } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [posts, setPosts] = useState([]);
  const [sortBy, setSortBy] = useState('recent');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPost, setCurrentPost] = useState(null); // For editing
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'organic',
    tags: '',
    media: [] // Changed from single image to media array
  });

  useEffect(() => {
    const mockPosts = [
      {
        id: 1,
        title: 'Organic Pest Control Methods',
        description: 'Natural ways to control pests without chemicals',
        category: 'organic',
        author: 'JohnDoe',
        authorId: '123',
        likes: 24,
        timestamp: Date.now() - 3600000,
        tags: ['pest control', 'organic'],
        media: [
          { url: 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2', type: 'image' }
        ]
      },
      // Add 2-3 more sample posts
    ];
    setPosts(mockPosts);
  }, []);

  const categories = [
    { id: 'all', name: 'All Skills', icon: '🌱' },
    { id: 'organic', name: 'Organic Farming', icon: '🌿' },
    { id: 'hydroponics', name: 'Hydroponics', icon: '💧' },
    { id: 'composting', name: 'Composting', icon: '🍂' },
    { id: 'seasonal', name: 'Seasonal', icon: '📅' }
  ];

  const filteredPosts = posts
    .filter(post => selectedCategory === 'all' || post.category === selectedCategory)
    .sort((a, b) => (sortBy === 'popular' ? b.likes - a.likes : b.timestamp - a.timestamp));

  // Form input change handler
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Create new post
  const handleCreatePost = () => {
    setCurrentPost(null);
    setFormData({
      title: '',
      description: '',
      category: 'organic',
      tags: '',
      media: []
    });
    setIsModalOpen(true);
  };

  // Edit existing post
  const handleEditPost = (post) => {
    // Allow editing for any user (remove permission check for now)
    setCurrentPost({
      ...post,
      originalMedia: [...(post.media || [])]
    });

    setFormData({
      title: post.title,
      description: post.description,
      category: post.category,
      tags: Array.isArray(post.tags) ? post.tags.join(', ') : '',
      media: (post.media || []).map(media => ({
        ...media,
        file: media.url,
        name: media.name || `Existing ${media.type}`,
        isExisting: true
      }))
    });
    setIsModalOpen(true);
  };

  // Delete post
  const handleDeletePost = (postId) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      setPosts(posts.filter(post => post.id !== postId));
    }
  };

  // Like post
  const handleLikePost = (postId) => {
    setPosts(posts.map(post => 
      post.id === postId ? { ...post, likes: post.likes + 1 } : post
    ));
  };

  const validateMediaFile = (file) => {
    const maxSize = 10 * 1024 * 1024; // 10MB
    const validImageTypes = ['image/jpeg', 'image/png', 'image/gif'];
    const validVideoTypes = ['video/mp4', 'video/quicktime'];

    if (!file) return false;
    if (file.size > maxSize) {
      alert('File size should be less than 10MB');
      return false;
    }

    if (validImageTypes.includes(file.type)) return 'image';
    if (validVideoTypes.includes(file.type)) {
      if (file.duration > 30) {
        alert('Video duration should be less than 30 seconds');
        return false;
      }
      return 'video';
    }

    alert('Invalid file type. Please upload images or videos only.');
    return false;
  };

  const handleMediaUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (formData.media.length + files.length > 3) {
      alert('Maximum 3 media files allowed');
      return;
    }

    const newMedia = [];
    for (const file of files) {
      const mediaType = await validateMediaFile(file);
      if (mediaType) {
        newMedia.push({
          file: URL.createObjectURL(file),
          type: mediaType,
          name: file.name // Add filename for display
        });
      }
    }

    setFormData(prev => ({
      ...prev,
      media: [...prev.media, ...newMedia].slice(0, 3)
    }));
  };

  const removeMedia = (index) => {
    setFormData(prev => ({
      ...prev,
      media: prev.media.filter((_, i) => i !== index)
    }));
  };

  // Form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const newPost = {
      ...(currentPost || {}),
      title: formData.title,
      description: formData.description,
      category: formData.category,
      tags: typeof formData.tags === 'string'
        ? formData.tags.split(',').map(tag => tag.trim()).filter(Boolean)
        : [],
      media: formData.media.map(media => ({
        url: media.isExisting ? media.url : media.file,
        type: media.type,
        name: media.name,
        ...(media.id && { id: media.id })
      })),
      lastEditedBy: user?.name,
      lastEditedAt: Date.now(),
      id: currentPost ? currentPost.id : Date.now().toString()
    };

    setPosts(prevPosts =>
      currentPost
        ? prevPosts.map(post => post.id === currentPost.id ? newPost : post)
        : [newPost, ...prevPosts]
    );

    setIsModalOpen(false);
  };

  const renderPostMedia = (media) => (
    <div className="relative w-full h-[300px] bg-gray-100 rounded-lg overflow-hidden">
      <div className={`grid h-full ${
        media.length === 1 ? 'grid-cols-1' : 
        media.length === 2 ? 'grid-cols-2' : 
        'grid-cols-2 grid-rows-2'
      } gap-1`}>
        {media.map((item, index) => (
          <div 
            key={index} 
            className={`relative ${
              media.length === 3 && index === 0 ? 'col-span-2' : ''
            }`}
          >
            {item.type === 'image' ? (
              <img 
                src={item.url || item.file} 
                alt="" 
                className="w-full h-full object-cover"
              />
            ) : (
              <video 
                src={item.url || item.file} 
                className="w-full h-full object-cover" 
                controls
                controlsList="nodownload"
              >
                Your browser does not support the video tag.
              </video>
            )}
            <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-10 transition-opacity duration-300" />
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Agricultural Skills Sharing</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Share and learn farming techniques from the community
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-8 justify-between items-center">
        <div className="flex flex-wrap gap-4">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${
                selectedCategory === category.id
                  ? 'bg-green-600 text-white shadow-lg scale-105'
                  : 'bg-white text-gray-700 hover:bg-green-50 border border-gray-200'
              }`}
            >
              <span>{category.icon}</span>
              <span>{category.name}</span>
            </button>
          ))}
        </div>

        <div className="flex gap-4 items-center">
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
            className="px-4 py-2 rounded-full border border-gray-200 focus:ring-2 focus:ring-green-500"
          >
            <option value="recent">Most Recent</option>
            <option value="popular">Most Popular</option>
          </select>
          
          <button 
            onClick={handleCreatePost}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-full flex items-center gap-2"
          >
            <span>➕</span> Share Skill
          </button>
        </div>
      </div>

      {/* Posts Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts.length > 0 ? (
          filteredPosts.map(post => (
            <div
              key={post.id}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
            >
              {post.media && post.media.length > 0 && (
                <div className="mb-4">
                  {renderPostMedia(post.media)}
                </div>
              )}
              <div className="p-6">
                <div className="mb-2 flex items-center text-xs text-green-600">
                  <span className="bg-green-100 rounded-full px-2 py-1">{post.category}</span>
                  {post.tags && post.tags.map(tag => (
                    <span key={tag} className="ml-2 text-gray-500">#{tag}</span>
                  ))}
                </div>
                <h3 className="font-semibold text-lg mb-2">{post.title}</h3>
                <p className="text-gray-600 mb-4">{post.description}</p>
                <div className="flex justify-between items-center text-sm">
                  <div className="text-gray-500">
                    <div>By {post.author}</div>
                    {post.lastEditedBy && (
                      <div className="text-xs italic">
                        Edited by {post.lastEditedBy}
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-4">
                    <button 
                      onClick={() => handleLikePost(post.id)}
                      className="text-gray-500 hover:text-red-500"
                    >
                      {post.likes} ❤️
                    </button>
                    
                    {(user?.id === post.authorId || user?.role === 'admin') && (
                      <div className="flex gap-2">
                        <button 
                          onClick={() => handleEditPost(post)} 
                          className="text-blue-500 hover:text-blue-700"
                        >
                          ✏️
                        </button>
                        <button 
                          onClick={() => handleDeletePost(post.id)} 
                          className="text-red-500 hover:text-red-700"
                        >
                          🗑️
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-3 text-center py-8 text-gray-500">
            No posts found. Be the first to share your knowledge!
          </div>
        )}
      </div>

      {/* Create/Edit Post Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg w-full max-w-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">
                {currentPost ? 'Edit Skill Post' : 'Share New Skill'}
              </h2>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  rows="4"
                  required
                ></textarea>
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  {categories.filter(cat => cat.id !== 'all').map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Tags (comma separated)</label>
                <input
                  type="text"
                  name="tags"
                  value={formData.tags}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="e.g. organic, beginner, soil"
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Upload Media (Max 3 files)</label>
                <div className="relative">
                  <input
                    type="file"
                    accept="image/*,video/*"
                    multiple
                    onChange={handleMediaUpload}
                    className="hidden"
                    id="media-upload"
                  />
                  <label
                    htmlFor="media-upload"
                    className="cursor-pointer bg-green-50 hover:bg-green-100 text-green-600 font-semibold py-2 px-4 border border-green-300 rounded-lg flex items-center justify-center gap-2 transition-colors duration-300"
                  >
                    <span>📁</span>
                    Choose Files
                    <span className="text-xs text-green-500">(Images or Videos)</span>
                  </label>
                </div>
                
                {/* Preview Grid */}
                {formData.media.length > 0 && (
                  <div className="mt-4">
                    <p className="text-sm text-gray-500 mb-2">Selected files ({formData.media.length}/3):</p>
                    <div className="grid grid-cols-3 gap-2">
                      {formData.media.map((item, index) => (
                        <div key={index} className="relative group">
                          <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden bg-gray-100">
                            {item.type === 'image' ? (
                              <img
                                src={item.file || item.url}
                                alt=""
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <video
                                src={item.file || item.url}
                                className="w-full h-full object-cover"
                              />
                            )}
                            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300" />
                          </div>
                          <button
                            type="button"
                            onClick={() => removeMedia(index)}
                            className="absolute top-1 right-1 bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          >
                            ✕
                          </button>
                          <p className="text-xs text-gray-500 mt-1 truncate">
                            {item.name || 'Uploaded file'}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                >
                  {currentPost ? 'Update' : 'Create'} Post
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Skills;