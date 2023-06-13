import React, {useState} from "react";
import {Button, Form} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import Images from "../../constants/Images";
import AuthLayout from "../../components/AuthLayout";
import {loginUser} from "../../redux/actions/authActions";
import {useDispatch} from "react-redux";
import {showToastError, showToastSuccess} from "../../utils/toastActions";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  function clearLoginForm() {
    setLoginForm({
      email: "",
      password: "",
    });
  }

  function onChangeFormInput(e) {
    setLoginForm({...loginForm, [e.target.name]: e.target.value});
  }

  function onSubmitLoginForm(e) {
    e.preventDefault();
    setLoading(true);
    let permitSubmit = true;
    if (!loginForm.email || !loginForm.password) {
      permitSubmit = false;
      showToastError("All fields must be filled!");
      setLoading(false);
    }
    if (permitSubmit) {
      function next() {
        clearLoginForm();
        setLoading(false);
        showToastSuccess("Login successfully!");
      }
      function errorHandle(error) {
        setLoading(false);
        showToastError(error.response ? error.response.data.msg : error.message);
        if (error.response.status === 401) {
          navigate("/verify-account", {state: {prevEmail: loginForm.email}});
        }
      }
      loginUser(dispatch, loginForm, next, errorHandle);
    }
  }

  return (
    <AuthLayout>
      <h4 className="text-primary mb-0">Login to your account</h4>
      <p className="text-muted">
        <small>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ad, laborum!</small>
      </p>
      <Form onSubmit={e => onSubmitLoginForm(e)}>
        <Form.Control
          name="email"
          value={loginForm.email}
          onChange={e => onChangeFormInput(e)}
          className="mb-3"
          type="email"
          placeholder="Enter your email"
        />
        <Form.Control
          name="password"
          value={loginForm.password}
          onChange={e => onChangeFormInput(e)}
          className="mb-3"
          type="password"
          placeholder="Enter your password"
        />
        <div className="mb-3 d-flex justify-content-between">
          <Form.Check type="checkbox" label="Remember me" />
          <Link>
            <small>Forgot password?</small>
          </Link>
        </div>
        <Button disabled={loading} type="submit" className="mb-3">
          {loading ? "Loading..." : "Login account"}
        </Button>
      </Form>
      <Link to={"/register"}>You don't have any account? Register now.</Link>
      <Button variant="light" className="d-flex align-items-center my-3">
        <img src={Images.google} width={30} className="me-2" alt="Google icon" /> Sign in with your
        google account
      </Button>
      <Button variant="light" className="d-flex align-items-center">
        <img src={Images.facebook} width={30} className="me-2" alt="Facebook icon" /> Sign in with
        your facebook account
      </Button>
    </AuthLayout>
  );
};

export default Login;
