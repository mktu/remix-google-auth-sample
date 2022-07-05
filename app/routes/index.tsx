import { Link } from "react-router-dom";

const Index: React.FC = () => {
  return (
    <div>
      <h1>Welcome to Google login sample</h1>
      <ul>
        <li>
          <Link to='/login'>Login</Link>
        </li>
        <li>
          <Link to='/app'>App(ログインユーザのみアクセス可能)</Link>
        </li>
      </ul>
    </div>
  );
}

export default Index
