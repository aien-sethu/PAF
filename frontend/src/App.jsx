import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './components/Home';
import Skills from './components/pages/Skills';
import Learn from './components/pages/Learn';
import Discuss from './components/pages/Discuss';
import Profile from './components/pages/Profile';
import Products from './components/other/products';
import { AuthProvider } from './context/AuthContext';
import EditProfileForm from './components/pages/EditProfileForm';
import About from './components/other/about';
import Contact from './components/other/contact';
import ScrollToTop from './components/ScrollToTop';
import LearningPlanDetails from './components/pages/LearningPlanDetails';

function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/learn" element={<Learn />} />
            <Route path="/learn/plan/:planId" element={<LearningPlanDetails />} />
            <Route path="/discuss" element={<Discuss />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/other/products" element={<Products />} />
            <Route path="/other/about" element={<About />} />
            <Route path="/other/contact" element={<Contact />} />
            <Route path="/profile/edit" element={<EditProfileForm />} />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  );
}

export default App;
