
import { NavLink, Link } from "react-router-dom";
import Landing from "./pages/Landing";
import SignUp from "./pages/SignUp";


const API_PARAMS = {
  "key": "4b521b91bbb1e971750809afcf83f32b907f55c3b6f69c61fbf6ac576c32d757",
  "secret": "3cf6bbf26e082368e9c10814e88eee8fe4adfef1bae49272d6959f70c8df36b4"
};

const ACCESS_TOKEN = {
  "token": "e0b8123ec27f579c17eee96d003df3570d897b4f5d9c4d53de95b1c3f51e6fd0",
  "valid_before": "2022-04-14T11:31:21Z",
  "scopes": []
}

function App() {
  return (
    <div>
      <SignUp />
    </div>
  );
}

export default App;
