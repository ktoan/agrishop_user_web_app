import React, {useState} from "react";
import {Button, Form, Modal} from "react-bootstrap";
import {showToastError, showToastSuccess} from "../utils/toastActions";
import {updateUserAddress} from "../redux/actions/userDataActions";
import {useDispatch} from "react-redux";

const UpdateAddressModal = ({show = false, onHide = () => {}, data}) => {
  const dispatch = useDispatch();

  const [updateAddressForm, setUpdateAddressForm] = useState(
    data || {
      id: 0,
      street: "",
      district: "",
      state: "",
      country: "",
    }
  );
  const [loading, setLoading] = useState(false);

  function clearForm() {
    setUpdateAddressForm(
      data || {
        street: "",
        district: "",
        state: "",
        country: "",
      }
    );
  }

  function onChangeFormInput(e) {
    setUpdateAddressForm({...updateAddressForm, [e.target.name]: e.target.value});
  }

  function onSubmitUpdateAddressForm() {
    setLoading(true);
    let permitSubmit = true;
    if (
      !updateAddressForm.street ||
      !updateAddressForm.district ||
      !updateAddressForm.state ||
      !updateAddressForm.country
    ) {
      showToastError("All fields must be filled!");
      permitSubmit = false;
      setLoading(false);
    }
    if (permitSubmit) {
      function next() {
        clearForm();
        onHide();
        setLoading(false);
        showToastSuccess("Update address successfully!");
      }
      function errorHandle(message) {
        setLoading(false);
        showToastError(message);
      }
      updateUserAddress(dispatch, updateAddressForm.id, updateAddressForm, next, errorHandle);
    }
  }

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title className="fs-4 fw-bold text-primary">
          Update "{updateAddressForm.street}"
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Control
            onChange={e => onChangeFormInput(e)}
            name="street"
            value={updateAddressForm.street}
            placeholder="Enter new street"
            className="mb-3"
          />
          <Form.Control
            placeholder="Enter new district"
            onChange={e => onChangeFormInput(e)}
            name="district"
            value={updateAddressForm.district}
            className="mb-3"
          />
          <Form.Control
            placeholder="Enter new state"
            onChange={e => onChangeFormInput(e)}
            name="state"
            value={updateAddressForm.state}
            className="mb-3"
          />
          <Form.Control
            placeholder="Enter new country"
            onChange={e => onChangeFormInput(e)}
            name="country"
            value={updateAddressForm.country}
          />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button disabled={loading} variant="primary" onClick={() => onSubmitUpdateAddressForm()}>
          {loading ? "Loading..." : "Save changes"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UpdateAddressModal;
