import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FaBookmark, FaShare, FaClock, FaUser, FaCalendar, FaChartLine, FaCheckCircle, FaLightbulb } from 'react-icons/fa';

const LearningPlanDetails = () => {
  const { planId } = useParams();
  const navigate = useNavigate();
  const { isLoggedIn, user } = useAuth();
  const [activeStep, setActiveStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState(() => {
    const saved = localStorage.getItem(`progress_${planId}`);
    return saved ? JSON.parse(saved) : [];
  });
  
  const learningPlans = JSON.parse(localStorage.getItem('learningPlans') || '[]');
  const plan = learningPlans.find(p => p.id === Number(planId));

  // Add state to track step completion status
  const [stepStatus, setStepStatus] = useState(() => {
    const saved = localStorage.getItem(`stepStatus_${planId}`);
    return saved ? JSON.parse(saved) : plan.steps.map((_, index) => index === 0);
  });

  const handleBookmark = () => {
    // Add bookmark functionality
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }
    // Implement bookmarking logic
  };

  const handleShare = () => {
    // Implement share functionality
    navigator.clipboard.writeText(window.location.href);
    alert('Link copied to clipboard!');
  };

  // Update step completion handler
  const handleStepComplete = (stepIndex) => {
    // Only allow completing current step
    if (stepIndex > 0 && !stepStatus[stepIndex - 1]) {
      alert('Please complete the previous step first!');
      return;
    }

    const newStepStatus = [...stepStatus];
    newStepStatus[stepIndex] = !newStepStatus[stepIndex];
    
    // If unchecking a step, disable all following steps
    if (!newStepStatus[stepIndex]) {
      for (let i = stepIndex + 1; i < newStepStatus.length; i++) {
        newStepStatus[i] = false;
      }
    }
    
    setStepStatus(newStepStatus);
    
    // Calculate progress based on completed steps
    const completedSteps = newStepStatus.filter(status => status).length;
    const progress = Math.round((completedSteps / plan.steps.length) * 100);
    
    // Save progress
    localStorage.setItem(`stepStatus_${planId}`, JSON.stringify(newStepStatus));
    
    // Update plan progress
    const updatedPlans = learningPlans.map(p => 
      p.id === Number(planId) ? { ...p, progress } : p
    );
    localStorage.setItem('learningPlans', JSON.stringify(updatedPlans));
  };

  const handleFinishPlan = () => {
    // Check if all steps are completed before allowing finish
    const allStepsCompleted = stepStatus.every(status => status === true);
    
    if (!allStepsCompleted) {
      alert('Please complete all steps before marking the plan as finished.');
      return;
    }

    const updatedPlans = learningPlans.map(p => 
      p.id === Number(planId) ? { ...p, progress: 100 } : p
    );
    localStorage.setItem('learningPlans', JSON.stringify(updatedPlans));
    alert('Congratulations! You have completed this learning plan.');
  };

  if (!plan) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h2 className="text-2xl font-bold text-gray-800">Plan not found</h2>
        <button 
          onClick={() => navigate('/learn')}
          className="mt-4 px-6 py-2 bg-green-600 text-white rounded-full hover:bg-green-700"
        >
          Back to Learning Center
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section with Background */}
      <div 
        className="relative rounded-xl overflow-hidden mb-8 h-64"
        style={{
          backgroundImage: "url('/src/assets/images/formbg.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 bg-blue/50 backdrop-blur-sm"></div>
        <div className="relative z-10 h-full flex flex-col justify-center p-8 text-black">
          <h1 className="text-4xl font-bold mb-4">{plan.title}</h1>
          <div className="flex items-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <FaClock className="text-green-600" />
              <span>{plan.duration}</span>
            </div>
            <div className="flex items-center gap-2">
              <FaUser className="text-green-600" />
              <span>By {plan.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <FaCalendar className="text-green-600" />
              <span>
                {new Date(plan.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      {/* <div className="flex gap-4 mb-8">
        <button 
          onClick={handleBookmark}
          className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
        >
          <FaBookmark className="text-green-600" />
          <span>Save Plan</span>
        </button>
        <button 
          onClick={handleShare}
          className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
        >
          <FaShare className="text-green-600" />
          <span>Share</span>
        </button>
      </div> */}

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Progress Section - Always visible */}
          <div className="bg-gradient-to-br from-green-50 to-blue-100 rounded-xl p-6 shadow-lg border border-gray-100">
            {stepStatus.every(status => status === true) && plan.progress === 100 ? (
              <div className="text-center py-8">
                <div className="flex justify-center mb-4">
                  <FaCheckCircle className="text-green-600 text-5xl" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  Congratulations!
                </h2>
                <p className="text-gray-600">
                  You have completed this learning plan
                </p>
                <p className="text-sm text-green-600 mt-4">
                  You can always revisit this plan to refresh your knowledge
                </p>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-4 mb-4">
                  <FaChartLine className="text-2xl text-green-600" />
                  <div>
                    <h2 className="text-xl font-bold">Overall Progress</h2>
                    <p className="text-sm text-gray-600">Track your learning journey</p>
                  </div>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Completion Status</span>
                  <span className="text-green-600 font-medium">{plan.progress}%</span>
                </div>
                <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-green-500 to-green-600 rounded-full transition-all duration-500 relative"
                    style={{ width: `${plan.progress}%` }}
                  >
                    <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-3 gap-4 text-center text-sm">
                  <div className="bg-white p-3 rounded-lg shadow-sm">
                    <div className="font-medium text-green-600">Steps</div>
                    <div>{plan.steps.length}</div>
                  </div>
                  <div className="bg-white p-3 rounded-lg shadow-sm">
                    <div className="font-medium text-green-600">Status</div>
                    <div>In Progress</div>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Learning Steps Section - Always visible but with different states */}
          <div className="bg-gradient-to-br from-green-100 to-blue-200 rounded-xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center gap-4">
                <FaCheckCircle className="text-2xl text-green-600" />
                <div>
                  <h2 className="text-xl font-bold">Learning Steps</h2>
                  <p className="text-sm text-gray-600">
                    {plan.progress === 100 
                      ? 'Review your completed learning journey'
                      : 'Interactive guide through your learning journey'
                    }
                  </p>
                </div>
              </div>
            </div>
            <div className="p-6 space-y-8">
              {plan.steps.map((step, index) => (
                <div 
                  key={index}
                  className={`border-l-4 pl-4 pb-6 transition-all duration-300
                    ${stepStatus[index] 
                      ? 'border-green-500 bg-green-50/30' 
                      : index === 0 || stepStatus[index - 1]
                        ? 'border-green-500' 
                        : 'border-gray-200 opacity-50'
                    }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-medium text-lg flex items-center gap-3">
                      <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold
                        ${stepStatus[index]
                          ? 'bg-green-600 text-white' 
                          : 'bg-green-100 text-green-600'
                        }`}>
                        {index + 1}
                      </span>
                      <span className="flex-1">{step.title}</span>
                    </h3>
                    {isLoggedIn && (
                      <button
                        onClick={() => handleStepComplete(index)}
                        disabled={index > 0 && !stepStatus[index - 1]}
                        className={`px-4 py-2 rounded-full text-sm font-medium 
                          ${stepStatus[index]
                            ? 'bg-green-600 text-white hover:bg-green-700'
                            : index === 0 || stepStatus[index - 1]
                              ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          } transition-colors`}
                      >
                        {stepStatus[index] ? 'Completed' : 'Mark Complete'}
                      </button>
                    )}
                  </div>
                  {step.description && (
                    <p className="text-gray-600 mb-4">{step.description}</p>
                  )}
                  {step.images && step.images.length > 0 && (
                    <div className="grid grid-cols-2 gap-4">
                      {step.images.map((image, imageIndex) => (
                        <img
                          key={imageIndex}
                          src={image}
                          alt={`Step ${index + 1} Image ${imageIndex + 1}`}
                          className="w-full h-48 object-cover rounded-lg hover:scale-105 transition-transform cursor-pointer"
                        />
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Only show Start Learning and Steps if not completed */}
          {plan.progress < 100 && (
            <>
              {/* {isLoggedIn && (
                <button className="w-full bg-gradient-to-r from-green-600 to-green-700 
                                 text-white py-4 rounded-xl hover:from-green-700 
                                 hover:to-green-800 transition-all shadow-lg 
                                 hover:shadow-xl flex items-center justify-center gap-2
                                 group">
                  <span>Start Learning</span>
                  <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" 
                       fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                          d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </button>
              )} */}

              {/* Finish Button */}
              {isLoggedIn && (
                <div className="flex gap-4 mt-8">
                  <button
                    onClick={handleFinishPlan}
                    className="flex-1 bg-gradient-to-r from-green-600 to-green-700 
                              text-white py-4 rounded-xl hover:from-green-700 
                              hover:to-green-800 transition-all shadow-lg 
                              hover:shadow-xl flex items-center justify-center gap-2
                              group"
                  >
                    <span>Mark as Finished</span>
                    <FaCheckCircle className="text-xl group-hover:scale-110 transition-transform" />
                  </button>
                </div>
              )}
            </>
          )}
        </div>

        {/* What you'll learn sidebar - always visible */}
        <div className="space-y-8">
          {plan.whatYoullLearn && plan.whatYoullLearn.length > 0 && (
            <div className="bg-gradient-to-br from-green-50 to-blue-100 backdrop-blur-sm rounded-xl shadow-lg 
                            border border-green-100 sticky top-8 overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center gap-4">
                  <FaLightbulb className="text-2xl text-green-600" />
                  <div>
                    <h2 className="text-xl font-bold">What you'll learn</h2>
                    <p className="text-sm text-gray-600">Key learning outcomes</p>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <ul className="space-y-4">
                  {plan.whatYoullLearn.map((point, index) => (
                    <li key={index} className="flex items-start gap-3 group">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 
                                    text-green-600 flex items-center justify-center text-sm
                                    group-hover:bg-green-600 group-hover:text-white
                                    transition-colors duration-300">
                        {index + 1}
                      </span>
                      <span className="text-gray-700 group-hover:text-green-600 transition-colors">
                        {point}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LearningPlanDetails;