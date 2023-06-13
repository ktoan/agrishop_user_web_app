import React, {useState} from "react";
import AuthLayout from "../../components/AuthLayout";
import Images from "../../constants/Images";
import {Button, Form} from "react-bootstrap";
import {useLocation, useNavigate} from "react-router-dom";
import {showToastError, showToastSuccess} from "../../utils/toastActions";
import {confirmAccountRegistration, sendVerifyAccountToken} from "../../redux/actions/authActions";

const VerifyAccount = () => {
  const {state} = useLocation();
  const {prevEmail} = state;
  const navigate = useNavigate();

  const [isSendEmail, setSendMail] = useState(false);
  const [email, setEmail] = useState(prevEmail || "");
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);

  function sendVerifyToken() {
    setLoading(true);
    let permitSubmit = true;
    if (!email) {
      showToastError("Fill the email that you wanna verify.");
      permitSubmit = false;
      setLoading(false);
    }
    if (permitSubmit) {
      function next(message) {
        showToastSuccess(message);
        setLoading(false);
        setSendMail(true);
      }
      function errorHandle(message) {
        showToastError(message);
        setLoading(false);
      }
      sendVerifyAccountToken(email, next, errorHandle);
    }
  }

  function confirmRegistration() {
    let permitSubmit = true;
    if (!token) {
      showToastError("Fill the token that sent to your email.");
      permitSubmit = false;
    }
    if (permitSubmit) {
      function next(message) {
        showToastSuccess(message);
        setLoading(false);
        navigate("/login");
      }
      function errorHandle(message) {
        showToastError(message);
        setLoading(false);
      }
      confirmAccountRegistration(token, next, errorHandle);
    }
  }

  return (
    <AuthLayout bg={Images.verifyBg}>
      <h4 className="text-primary mb-0">Verify your account</h4>
      <p className="text-muted">
        <small>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ad, laborum!</small>
      </p>
      <Form>
        {!isSendEmail ? (
          <>
            <Form.Control
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="mb-3"
              type="email"
            />
            <Button disabled={loading} onClick={() => sendVerifyToken()}>
              {loading ? "Loading..." : "Send token"}
            </Button>
          </>
        ) : (
          <>
            <Form.Control
              value={token}
              onChange={e => setToken(e.target.value)}
              placeholder="Enter your token"
              className="mb-3"
            />
            <div className="d-flex align-items-center">
              <Button onClick={() => confirmRegistration()} disabled={loading} className="me-2">
                {loading ? "Loading..." : "Confirm your account"}
              </Button>
              <Button onClick={() => setSendMail(false)} disabled={loading} variant="secondary">
                Back to enter email
              </Button>
            </div>
          </>
        )}
      </Form>
    </AuthLayout>
  );
};

export default VerifyAccount;
