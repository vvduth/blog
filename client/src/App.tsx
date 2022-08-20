import RegisterScreen from "./screens/RegisterScreen";
import { Link } from "react-router-dom";
import './main.css'
import { Provider } from "react-redux";
import { store } from "./store/store";
import { useAppSelector, useAppDispatch } from "./store/hooks";
import { logoutUser } from "./store/userSlice";
import HomeScreen from "./screens/HomeScreen";
import { resetState } from "./store/postSlice";
import { useEffect } from "react";
import { autoLogin } from "./store/userSlice";
import Header from "./components/Header";


function App() {
  const user = useAppSelector((state: any) => state.user.user);
  
  const dispatch = useAppDispatch();

  useEffect(()=> {
    dispatch(autoLogin())
  },[dispatch])
  const logoutHandler = (e: any) => {
    e.preventDefault();
    dispatch(logoutUser());
  };

  
  
  

  const state = useAppSelector(state => state)
  //console.log("from app.tsx",state)
  return (
    <div>
      <Header/>
      <h1 className="text-3xl font-bold underline">Main screen</h1>
      <HomeScreen />
      {(user?.username && user) ? (
        <>
          {" "}
          <h1>hello {user.username}</h1> <br />{" "}
          <button onClick={logoutHandler}>Log out real quick</button>
        </>
      ) : (
        <>
          <Link to="/register">Sign Up</Link>
          <Link to="/login">Login</Link>
        </>
      )}
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
