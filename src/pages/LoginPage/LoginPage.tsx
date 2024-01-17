import LoginForm from "../../components/LoginForm/LoginForm";

import "./LoginPage.scss";

const LoginPage = () => {
  return (
    <section className="login">
      <div className="login-page__main">
        <h1>Login</h1>
        <LoginForm />
      </div>
    </section>
  );
};

export default LoginPage;
