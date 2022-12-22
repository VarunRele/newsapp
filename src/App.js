import './App.css';
import React, { useState } from 'react'
import NavBar from './components/NavBar';
import NewsPage from './components/NewsPage';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import LoadingBar from 'react-top-loading-bar'



function App() {
  let articlesCount = 12

  const [state, setState] = useState(0)

  const setProgress = (progress) => {
    setState(progress)
  }

  return (
    <BrowserRouter>
      <div className="App">
      <LoadingBar
        color='#f11946'
        progress={state}
      />
      <NavBar />
      {/* <NewsPage loadState={setProgress}  articlesCount={5} category='cricket' /> */}
      
        <Routes>
            <Route exact path="/" element={<NewsPage loadState={setProgress}  key='sports' articlesCount={articlesCount} category='sports' />} />
            <Route exact path="/cricket" element={<NewsPage loadState={setProgress}  key='cricket' articlesCount={articlesCount} category='cricket' />} />
            <Route exact path="/football" element={<NewsPage loadState={setProgress}  key='football' articlesCount={articlesCount} category='football' />} />
            <Route exact path="/tennis" element={<NewsPage loadState={setProgress}  key='tennis' articlesCount={articlesCount} category='tennis' />} />
        </Routes>
      
    </div >
      </BrowserRouter>
  );
}

export default App;
