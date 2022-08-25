import RegisterScreen from "./screens/RegisterScreen";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import "./main.css";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { useAppSelector, useAppDispatch } from "./store/hooks";
import { logoutUser } from "./store/userSlice";
import HomeScreen from "./screens/HomeScreen";
import { resetState } from "./store/postSlice";
import { useEffect } from "react";
import { autoLogin } from "./store/userSlice";
import Header from "./components/Header";
import LoginScreen from "./screens/LoginScreen";
import PostScreen from "./screens/PostScreen";
import Footer from "./screens/Footer";
import AdminScreen from "./screens/AdminScreen";
function App() {
  return (
    <div>
      <Header />
      <BrowserRouter>
        <Routes>
          { <Route path="/" element={<HomeScreen />} /> }
          <Route path="/register" element={<RegisterScreen />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/post/:pid" element={<PostScreen />} />
          <Route path="/admin" element={<AdminScreen/>} />
        </Routes>
      </BrowserRouter>
      <Footer />
      
    </div>
  );
}
const AppWrapper = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

export default AppWrapper;
