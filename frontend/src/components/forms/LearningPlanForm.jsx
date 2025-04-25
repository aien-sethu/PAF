import React, { useState, useRef } from 'react';

const LearningPlanForm = ({ onClose, onSubmit, initialData }) => {
  const fileInputRef = useRef(null);
  const fileInputRefs = useRef([]);
  
  const [formData, setFormData] = useState(initialData || {
    title: '',
    category: '',
    duration: '',
    whatYoullLearn: [], // Changed from requirements
    steps: [{ title: '', description: '', images: [] }],
    images: []
  });
  const [imagePreviews, setImagePreviews] = useState(initialData?.images || []);
  const [newLearningPoint, setNewLearningPoint] = useState(''); // Changed from newRequirement

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          
          // Set maximum dimensions
          const maxWidth = 800;
          const maxHeight = 600;
          
          let width = img.width;
          let height = img.height;
          
          // Calculate new dimensions
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
          setImagePreviews(prev => [...prev, resizedImage]);
          setFormData(prev => ({
            ...prev,
            images: [...prev.images, resizedImage]
          }));
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    });
  };

  const handleStepImageUpload = (stepIndex, e) => {
    const files = Array.from(e.target.files);
    
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          
          const maxWidth = 800;
          const maxHeight = 600;
          
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
          
          // Update step images
          const newSteps = [...formData.steps];
          if (!newSteps[stepIndex].images) {
            newSteps[stepIndex].images = [];
          }
          newSteps[stepIndex].images.push(resizedImage);
          setFormData(prev => ({
            ...prev,
            steps: newSteps
          }));
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    });
  };

  const handleRemoveImage = (index) => {
    setImagePreviews(prev => prev.filter((_, i) => i !== index));
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleRemoveStepImage = (stepIndex, imageIndex) => {
    const newSteps = [...formData.steps];
    newSteps[stepIndex].images = newSteps[stepIndex].images.filter((_, i) => i !== imageIndex);
    setFormData(prev => ({
      ...prev,
      steps: newSteps
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  const addStep = () => {
    setFormData({
      ...formData,
      steps: [...formData.steps, { title: '', description: '', images: [] }]
    });
  };

  // Add after the addStep function
  const removeStep = (stepIndex) => {
    if (formData.steps.length > 1) {
      setFormData({
        ...formData,
        steps: formData.steps.filter((_, index) => index !== stepIndex)
      });
    }
  };

  // Update handler names and references
  const handleLearningPointAdd = (e) => {
    e.preventDefault();
    if (newLearningPoint.trim()) {
      setFormData(prev => ({
        ...prev,
        whatYoullLearn: [...prev.whatYoullLearn, newLearningPoint.trim()]
      }));
      setNewLearningPoint('');
    }
  };

  const handleRemoveLearningPoint = (index) => {
    setFormData(prev => ({
      ...prev,
      whatYoullLearn: prev.whatYoullLearn.filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-start justify-center overflow-y-auto pt-20 p-4 z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-2xl mb-20">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">
            {initialData ? 'Edit Learning Plan' : 'Create Learning Plan'}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                className="w-full rounded-lg border p-2"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                className="w-full rounded-lg border p-2"
              >
                <option value="">Select a category</option>
                <option value="organic">Organic Farming</option>
                <option value="seasonal">Seasonal Planning</option>
                <option value="composting">Composting</option>
                <option value="irrigation">Irrigation</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Duration</label>
            <input
              type="text"
              value={formData.duration}
              onChange={(e) => setFormData({...formData, duration: e.target.value})}
              className="w-full rounded-lg border p-2"
              placeholder="e.g., 4 weeks"
            />
          </div>

          {/* Update the Requirements section in the form */}
          <div className="space-y-4">
            <label className="text-sm font-medium">What you'll learn</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={newLearningPoint}
                onChange={(e) => setNewLearningPoint(e.target.value)}
                className="flex-1 rounded-lg border p-2"
                placeholder="Add learning points..."
              />
              <button
                type="button"
                onClick={handleLearningPointAdd}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Add
              </button>
            </div>
            {formData.whatYoullLearn.length > 0 && (
              <ul className="space-y-2 bg-gray-50 rounded-lg p-4">
                {formData.whatYoullLearn.map((point, index) => (
                  <li key={index} className="flex items-center gap-2 group">
                    <span className="flex-shrink-0 w-2 h-2 bg-green-600 rounded-full"></span>
                    <span className="text-gray-700">{point}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveLearningPoint(index)}
                      className="ml-auto text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      ×
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <label className="text-sm font-medium">Learning Steps</label>
              <button
                type="button"
                onClick={addStep}
                className="text-green-600 hover:text-green-700 text-sm"
              >
                + Add Step
              </button>
            </div>
            
            <div className="space-y-4">
              {formData.steps.map((step, stepIndex) => (
                <div key={stepIndex} className="p-4 border rounded-lg relative">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2 flex-1">
                      <span className="bg-green-100 text-green-600 w-6 h-6 rounded-full flex items-center justify-center text-sm">
                        {stepIndex + 1}
                      </span>
                      <input
                        type="text"
                        value={step.title}
                        onChange={(e) => {
                          const newSteps = [...formData.steps];
                          newSteps[stepIndex].title = e.target.value;
                          setFormData({...formData, steps: newSteps});
                        }}
                        className="w-full rounded-lg border p-2"
                        placeholder="Step title"
                      />
                    </div>
                    {formData.steps.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeStep(stepIndex)}
                        className="ml-2 text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-50 transition-colors"
                        title="Remove step"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    )}
                  </div>
                  {/* Rest of the step content remains the same */}
                  <textarea
                    value={step.description}
                    onChange={(e) => {
                      const newSteps = [...formData.steps];
                      newSteps[stepIndex].description = e.target.value;
                      setFormData({...formData, steps: newSteps});
                    }}
                    className="w-full rounded-lg border p-2 h-20 resize-none mb-4"
                    placeholder="Step description"
                  />
                  {/* ... rest of the existing step content ... */}
                  {/* Step Images Section */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => fileInputRefs.current[stepIndex]?.click()}
                        className="px-3 py-1 text-sm rounded-lg border border-gray-300 hover:bg-gray-50 flex items-center gap-2"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        Add Step Photos
                      </button>
                      <input
                        type="file"
                        ref={el => fileInputRefs.current[stepIndex] = el}
                        className="hidden"
                        accept="image/*"
                        multiple
                        onChange={(e) => handleStepImageUpload(stepIndex, e)}
                      />
                    </div>

                    {step.images && step.images.length > 0 && (
                      <div className="grid grid-cols-3 gap-2">
                        {step.images.map((image, imageIndex) => (
                          <div key={imageIndex} className="relative group">
                            <img
                              src={image}
                              alt={`Step ${stepIndex + 1} Image ${imageIndex + 1}`}
                              className="w-full h-24 object-cover rounded-lg"
                            />
                            <button
                              type="button"
                              onClick={() => handleRemoveStepImage(stepIndex, imageIndex)}
                              className="absolute top-1 right-1 bg-red-500 text-white w-5 h-5 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Image Upload Section */}
          <div className="space-y-4">
            
            {/* <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Add Photos
              </button>
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
              />
            </div> */}

            {/* Image Previews */}
            {imagePreviews.length > 0 && (
              <div className="grid grid-cols-3 gap-4">
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
                      className="absolute top-2 right-2 bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex gap-4 justify-end pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 rounded-full border hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-full bg-green-600 text-white hover:bg-green-700"
            >
              {initialData ? 'Save Changes' : 'Create Plan'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LearningPlanForm;