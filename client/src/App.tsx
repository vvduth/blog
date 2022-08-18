import RegisterScreen from "./screens/RegisterScreen";
import { Link } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { useAppSelector, useAppDispatch } from "./store/hooks";
import { logoutUser } from "./store/userSlice";

function App() {
  const user = useAppSelector((state: any) => state.user.user);

  const dispatch = useAppDispatch();

  const logoutHandler = (e: any) => {
    e.preventDefault();
    dispatch(logoutUser());
  };
  return (
    <div>
      <h1>Main screen</h1>
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
