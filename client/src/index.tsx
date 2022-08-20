import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from "react-redux";
import App from './App';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import RegisterScreen from './screens/RegisterScreen';
import LoginScreen from './screens/LoginScreen';
import { store } from './store/store';
import PostScreen from './screens/PostScreen';



const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <BrowserRouter>
    <Provider store={store}>
    <Routes>
      <Route path="/" element={<App/>} />
      <Route path="/register" element={<RegisterScreen/>} />
      <Route path="/login" element={<LoginScreen/>} />
      <Route path="/post/:pid" element={<PostScreen/>} />
    </Routes>
    </Provider>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

