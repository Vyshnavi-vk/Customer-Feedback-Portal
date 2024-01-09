import './App.css'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import FeedbackForm from './pages/FeedbackForm.';
import PrivateRoute from './components/PrivateRoute';
import LandingPage from './pages/Landingpage/LandingPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import MyFeedBacks from './pages/MyFeedbacks/MyFeedBacks';
import Header from './components/Header'
import { useState } from 'react';
import SingleFeed from './pages/SingleFeed';



function App() {
  const [search, setSearch] = useState("");
  return (
    <BrowserRouter >
      <div className='App'>
        <Header setSearch={setSearch} />
        <main>
          <Routes>
            <Route path='/' element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path='/feedback/:id' element={<PrivateRoute element={<SingleFeed />} />} />
            <Route path="/myfeedbacks" element={<PrivateRoute element={<MyFeedBacks search={search} />} />} />
            <Route path="/createfeedback" element={<PrivateRoute element={<FeedbackForm />} />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
