import React, { useState, useEffect } from 'react';
import { FaBookOpen, FaUsers, FaChartLine, FaEdit, FaTrash } from 'react-icons/fa';
import LearningPlanForm from '../forms/LearningPlanForm';
import AuthPromptModal from '../common/AuthPromptModal';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Learn = () => {
  const { user, isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('featured');
  const [showNewPlanForm, setShowNewPlanForm] = useState(false);
  const [learningPlans, setLearningPlans] = useState(() => {
    const savedPlans = localStorage.getItem('learningPlans');
    return savedPlans ? JSON.parse(savedPlans) : [];
  });

  const [editingPlan, setEditingPlan] = useState(null);
  const [showAuthPrompt, setShowAuthPrompt] = useState(false);

  useEffect(() => {
    localStorage.setItem('learningPlans', JSON.stringify(learningPlans));
  }, [learningPlans]);

  const handleEditPlan = (plan) => {
    // Create a copy of the plan with only the editable fields
    const editablePlan = {
      id: plan.id,
      title: plan.title,
      category: plan.category,
      duration: plan.duration,
      whatYoullLearn: plan.whatYoullLearn || [],
      steps: plan.steps || [],
      images: plan.images || []
    };
    setEditingPlan(editablePlan);
    setShowNewPlanForm(true);
  };

  const handleDeletePlan = (planId) => {
    if (window.confirm('Are you sure you want to delete this learning plan?')) {
      setLearningPlans(plans => plans.filter(p => p.id !== planId));
    }
  };

  // Navigation items with fallback text for icons
  const navigationItems = [
    { id: 'featured', icon: FaBookOpen, label: 'Featured', fallback: '📚' },
    { id: 'my-progress', icon: FaChartLine, label: 'My Progress', fallback: '📈' },
    { id: 'community', icon: FaUsers, label: 'Community', fallback: '👥' }
  ];

  // Update handleNewPlan to include both createdAt and lastUpdatedAt
  const handleNewPlan = (plan) => {
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }

    const newPlan = {
      ...plan,
      id: Date.now(),
      author: user.name,
      authorId: user.id,
      progress: 0,
      createdAt: new Date().toISOString(),
      lastUpdatedAt: new Date().toISOString()
    };
    setLearningPlans([...learningPlans, newPlan]);
    setShowNewPlanForm(false);
  };

  const handleCreatePlanClick = () => {
    if (isLoggedIn) {
      setShowNewPlanForm(true);
    } else {
      setShowAuthPrompt(true);
    }
  };

  // Update renderPlanCard to show both dates
  const renderPlanCard = (plan) => (
    <div 
      key={plan.id} 
      className="bg-gradient-to-r from-green-100 to-blue-50 rounded-lg shadow-md 
                 hover:shadow-lg transition-all duration-300 p-6
                 min-h-[500px] flex flex-col justify-between" // Add fixed height and flex layout
    >
      {/* Header Section */}
      <div className="flex-1"> {/* Make content section flexible */}
        <div className="flex justify-between items-start mb-4">
          <h3 className="font-semibold text-xl text-gray-800 line-clamp-2">{plan.title}</h3>
          <div className="flex items-center gap-2 flex-shrink-0">
            <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm">
              {plan.category}
            </span>
            {isLoggedIn && user.name === plan.author && (
              <div className="flex gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // Add this line
                    handleEditPlan(plan);
                  }}
                  className="text-gray-600 hover:text-green-600 transition-colors"
                  title="Edit plan"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDeletePlan(plan.id)}
                  className="text-gray-600 hover:text-red-600 transition-colors"
                  title="Delete plan"
                >
                  <FaTrash />
                </button>
              </div>
            )}
          </div>
        </div>
        
        {/* Images Section - Fixed Height */}
        {plan.images && plan.images.length > 0 && (
          <div className="mb-4 h-[160px]"> {/* Fixed height for images container */}
            <div className="grid grid-cols-2 gap-2 h-full">
              {plan.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`${plan.title} - Image ${index + 1}`}
                  className="w-full h-full object-cover rounded-lg"
                />
              ))}
            </div>
          </div>
        )}

        {/* Author and Date Info */}
        <p className="text-gray-600 mb-4 text-sm">
          By {plan.author} • {plan.duration}
          <span className="block text-gray-500 mt-1">
            Created: {new Date(plan.createdAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric'
            })}
          </span>
        </p>
        
        {/* Progress Section */}
        <div className="space-y-3 mb-4">
          <div className="flex justify-between text-sm">
            <span>Progress</span>
            <span className="text-green-600">{plan.progress}%</span>
          </div>
          <div className="w-full h-2 bg-gray-400 rounded-full">
            <div 
              className="h-full bg-green-500 rounded-full transition-all"
              style={{ width: `${plan.progress}%` }}
            />
          </div>
        </div>

        {/* Steps Section - Limited Height with Scroll */}
        <div className="mb-4 max-h-[120px] overflow-y-auto">
          <ul className="space-y-2">
            {plan.steps
              .filter(step => step && step.title) // Filter out any null or empty steps
              .map((step, index) => (
                <li key={index} className="flex gap-2 text-sm text-gray-600">
                  <span 
                    className="w-5 h-5 rounded-full bg-green-100 text-green-600 
                             flex items-center justify-center text-xs flex-shrink-0 mt-1"
                  >
                    {index + 1}
                  </span>
                  <div>
                    <h4 className="font-medium line-clamp-1">{step.title}</h4>
                  </div>
                </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Action Button - Always at Bottom */}
      <button 
        onClick={() => navigate(`/learn/plan/${plan.id}`)}
        className="w-full bg-green-600 text-white py-2 rounded-full hover:bg-green-700 
                   transition-all mt-auto"
      >
        Continue Learning
      </button>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-gradient-to-r from-green-900 to-green-700 rounded-xl p-8 mb-8 text-white">
        <h1 className="text-4xl font-bold mb-4">Agricultural Learning Center</h1>
        <p className="text-green-100 mb-6">
          Discover, share, and track your agricultural learning journey
        </p>
        <button 
          onClick={handleCreatePlanClick}
          className="bg-white text-green-800 px-6 py-2 rounded-full hover:bg-green-50 transition-all"
        >
          Create Learning Plan
        </button>
      </div>
{/* 
      <div className="flex justify-center gap-4 mb-8">
        {navigationItems.map(({ id, icon: Icon, label, fallback }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`flex items-center gap-2 px-6 py-2 rounded-full transition-all ${
              activeTab === id 
                ? 'bg-green-600 text-white' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {Icon ? <Icon className="text-sm" /> : <span>{fallback}</span>}
            {label}
          </button>
        ))}
      </div> */}

      {showAuthPrompt && (
        <AuthPromptModal onClose={() => setShowAuthPrompt(false)} />
      )}

      {/* Update the form submission handler to include lastUpdatedAt */}
      {(showNewPlanForm || editingPlan) && (
        <LearningPlanForm 
          onClose={() => {
            setShowNewPlanForm(false);
            setEditingPlan(null);
          }}
          onSubmit={(formData) => {
            if (editingPlan) {
              setLearningPlans(plans =>
                plans.map(p =>
                  p.id === editingPlan.id
                    ? { 
                        ...p,
                        title: formData.title,
                        category: formData.category,
                        duration: formData.duration,
                        whatYoullLearn: formData.whatYoullLearn,
                        steps: formData.steps,
                        images: formData.images,
                        lastUpdatedAt: new Date().toISOString() 
                      }
                    : p
                )
              );
            } else {
              handleNewPlan(formData);
            }
            setEditingPlan(null);
            setShowNewPlanForm(false);
          }}
          initialData={editingPlan}
        />
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {learningPlans.map(renderPlanCard)}
      </div>
    </div>
  );
};

export default Learn;