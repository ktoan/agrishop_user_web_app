import React, {useState} from "react";
import {Button, Form, Modal} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {showToastError, showToastSuccess} from "../utils/toastActions";
import {changeUserPassword} from "../redux/actions/authActions";

const ChangePasswordModal = ({show = false, onHide = () => {}}) => {
  const dispatch = useDispatch();
  const {user} = useSelector(state => state.auth);

  const [changePasswordForm, setChangePasswordForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [loading, setLoading] = useState(false);

  function onChangePasswordInput(e) {
    setChangePasswordForm({...changePasswordForm, [e.target.name]: e.target.value});
  }

  function onSubmitChangePasswordForm() {
    setLoading(true);
    let permitSubmit = true;
    if (
      !changePasswordForm.newPassword ||
      !changePasswordForm.oldPassword ||
      !changePasswordForm.confirmNewPassword
    ) {
      showToastError("All fields must be filled!");
      permitSubmit = false;
      setLoading(false);
    }
    if (changePasswordForm.newPassword !== changePasswordForm.confirmNewPassword) {
      showToastError("Password is not match!");
      permitSubmit = false;
      setLoading(false);
    }
    if (permitSubmit) {
      function next(message) {
        showToastSuccess(message);
        setLoading(false);
        onHide();
      }
      function errorHandle(message) {
        showToastError(message);
        setLoading(false);
      }
      changeUserPassword(dispatch, user.id, changePasswordForm, next, errorHandle);
    }
  }

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title className="fs-4 fw-bold text-primary">Change your password</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Control
            type="password"
            name="oldPassword"
            value={changePasswordForm.oldPassword}
            onChange={e => onChangePasswordInput(e)}
            placeholder="Enter old password"
            className="mb-3"
          />
          <Form.Control
            type="password"
            name="newPassword"
            value={changePasswordForm.newPassword}
            onChange={e => onChangePasswordInput(e)}
            placeholder="Enter new password"
            className="mb-3"
          />
          <Form.Control
            type="password"
            name="confirmNewPassword"
            value={changePasswordForm.confirmNewPassword}
            onChange={e => onChangePasswordInput(e)}
            placeholder="Enter confirm new password"
          />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button disabled={loading} onClick={() => onSubmitChangePasswordForm()} variant="primary">
          {loading ? "Loading..." : "Save Changes"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ChangePasswordModal;
