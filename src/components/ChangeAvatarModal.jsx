import React, {useState} from "react";
import {Button, Form, Modal} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import Images from "../constants/Images";
import {changeUserAvatar} from "../redux/actions/authActions";
import {showToastError, showToastSuccess} from "../utils/toastActions";

const ChangeAvatarModal = ({show = false, onHide = () => {}}) => {
  const dispatch = useDispatch();
  const {user} = useSelector(state => state.auth);

  const [avatar, setAvatar] = useState(null);
  const [loading, setLoading] = useState(false);

  function onChangeAvatarPicker(e) {
    let file = e.target.files[0];
    setAvatar(file);
  }

  function onCloseModal() {
    onHide();
    setAvatar(null);
  }

  function onSubmitChangeAvatar() {
    setLoading(true);
    let permitSubmit = true;
    if (!avatar) {
      showToastError("New avatar is required to update!");
      permitSubmit = false;
      setLoading(false);
    }
    if (permitSubmit) {
      const submitForm = new FormData();
      submitForm.append("file", avatar);
      function next() {
        onCloseModal();
        showToastSuccess("Update avatar successfully!");
        setLoading(false);
      }
      function errorHandle(message) {
        showToastError(message);
        setLoading(false);
      }
      changeUserAvatar(dispatch, user.id, submitForm, next, errorHandle);
    }
  }

  return (
    <Modal show={show} onHide={() => onCloseModal()}>
      <Modal.Header closeButton>
        <Modal.Title className="fs-4 fw-bold text-primary">Change user own avatar</Modal.Title>
      </Modal.Header>
      <Modal.Body className="justify-content-center text-center">
        <Form>
          <img
            src={!avatar ? Images.noAvatar : URL.createObjectURL(avatar)}
            width={300}
            height={300}
            style={{objectFit: "cover"}}
            className="mb-3 rounded"
            alt="Preview new avatar"
          />
          <Form.Control type="file" onChange={onChangeAvatarPicker} />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button disabled={loading} onClick={() => onSubmitChangeAvatar()}>
          {loading ? "Loading..." : "Save changes"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ChangeAvatarModal;
