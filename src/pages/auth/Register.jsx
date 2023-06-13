import React, {useState} from "react";
import AuthLayout from "../../components/AuthLayout";
import Images from "../../constants/Images";
import {Button, Form} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import DatePicker from "react-datepicker";
import {showToastError, showToastSuccess} from "../../utils/toastActions";
import {registerNewUser} from "../../redux/actions/authActions";

const Register = () => {
  const navigate = useNavigate();
  const [registerForm, setRegisterForm] = useState({
    fullName: "",
    email: "",
    password: "",
    gender: "",
    phone: "",
    dayOfBirth: "",
  });
  const [startDate, setStartDate] = useState();
  const [loading, setLoading] = useState(false);

  function onChangeRegisterFormInput(e) {
    setRegisterForm({...registerForm, [e.target.name]: e.target.value});
  }

  function clearForm() {
    setRegisterForm({fullName: "", email: "", password: "", gender: "", phone: "", dayOfBirth: ""});
    setStartDate(new Date());
  }

  function onSubmitRegisterForm(e) {
    e.preventDefault();
    setLoading(true);
    let permitSubmit = true;
    if (
      !registerForm.email ||
      !registerForm.fullName ||
      !registerForm.gender ||
      !registerForm.dayOfBirth ||
      !registerForm.phone ||
      !registerForm.password
    ) {
      showToastError("All fields must be filled!");
      permitSubmit = false;
      setLoading(false);
    }
    if (permitSubmit) {
      function next(message) {
        showToastSuccess(message);
        setLoading(false);
        clearForm();
        navigate("/login");
      }
      function errorHandle(message) {
        showToastError(message);
        setLoading(false);
      }
      registerNewUser(registerForm, next, errorHandle);
    }
  }

  return (
    <AuthLayout bg={Images.registerBg}>
      <h4 className="text-primary mb-0">Register new account</h4>
      <p className="text-muted">
        <small>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ad, laborum!</small>
      </p>
      <Form onSubmit={e => onSubmitRegisterForm(e)}>
        <Form.Control
          value={registerForm.fullName}
          onChange={e => onChangeRegisterFormInput(e)}
          name="fullName"
          className="mb-3"
          placeholder="Enter your full name"
        />
        <Form.Control
          value={registerForm.email}
          onChange={e => onChangeRegisterFormInput(e)}
          name="email"
          className="mb-3"
          type="email"
          placeholder="Enter your email"
        />
        <Form.Control
          value={registerForm.password}
          onChange={e => onChangeRegisterFormInput(e)}
          name="password"
          className="mb-3"
          type="password"
          placeholder="Enter your password"
        />
        <Form.Control
          value={registerForm.phone}
          onChange={e => onChangeRegisterFormInput(e)}
          name="phone"
          className="mb-3"
          placeholder="Enter your phone number"
        />
        <DatePicker
          selected={startDate}
          onChange={date => {
            setRegisterForm({...registerForm, dayOfBirth: date.toLocaleDateString()});
            setStartDate(date);
          }}
          placeholderText="Day of birth"
          className="form-control mb-3"
        />
        <Form.Select
          onChange={e =>
            setRegisterForm({
              ...registerForm,
              gender: e.target.value,
            })
          }
          aria-label="Select gender"
          className="mb-3"
        >
          <option>Choose your gender</option>
          <option value="MALE">Male</option>
          <option value="FEMALE">Female</option>
          <option value="DISCLOSED">Disclosed</option>
        </Form.Select>
        <Button disabled={loading} type="submit" className="mb-3">
          {loading ? "Loading..." : "Register new account"}
        </Button>
      </Form>
      <Link to={"/login"}>Do you already have account? Login now.</Link>
    </AuthLayout>
  );
};

export default Register;
