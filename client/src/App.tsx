import RegisterScreen from "./screens/RegisterScreen";
import { Link } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store";

function App() {
  return (
    <div>
      <h1>Main screen</h1>
      <Link to = "/register">Sign Up</Link>
      <Link to= "/login">Login</Link>
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
