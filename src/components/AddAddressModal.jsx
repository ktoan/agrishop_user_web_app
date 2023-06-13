import React, {useState} from "react";
import {Button, Form, Modal} from "react-bootstrap";
import {useDispatch} from "react-redux";
import {showToastError, showToastSuccess} from "../utils/toastActions";
import {createNewAddress} from "../redux/actions/userDataActions";

const AddAddressModal = ({show = false, onHide = () => {}}) => {
  const dispatch = useDispatch();

  const [newAddressForm, setNewAddressForm] = useState({
    street: "",
    district: "",
    state: "",
    country: "",
  });
  const [loading, setLoading] = useState(false);

  function clearForm() {
    setNewAddressForm({
      street: "",
      district: "",
      state: "",
      country: "",
    });
  }

  function onChangeFormInput(e) {
    setNewAddressForm({...newAddressForm, [e.target.name]: e.target.value});
  }

  function onSubmitNewAddressForm() {
    setLoading(true);
    let permitSubmit = true;
    if (
      !newAddressForm.street ||
      !newAddressForm.district ||
      !newAddressForm.state ||
      !newAddressForm.country
    ) {
      showToastError("All fields must be filled!");
      permitSubmit = false;
      setLoading(false);
    }
    if (permitSubmit) {
      function next() {
        clearForm();
        onHide();
        showToastSuccess("Create new address successfully!");
        setLoading(false);
      }
      function errorHandle(message) {
        showToastError(message);
        setLoading(false);
      }
      createNewAddress(dispatch, newAddressForm, next, errorHandle);
    }
  }

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title className="fs-4 fw-bold text-primary">Add new address</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Control
            onChange={e => onChangeFormInput(e)}
            name="street"
            value={newAddressForm.street}
            placeholder="Enter new street"
            className="mb-3"
          />
          <Form.Control
            placeholder="Enter new district"
            onChange={e => onChangeFormInput(e)}
            name="district"
            value={newAddressForm.district}
            className="mb-3"
          />
          <Form.Control
            placeholder="Enter new state"
            onChange={e => onChangeFormInput(e)}
            name="state"
            value={newAddressForm.state}
            className="mb-3"
          />
          <Form.Control
            placeholder="Enter new country"
            onChange={e => onChangeFormInput(e)}
            name="country"
            value={newAddressForm.country}
          />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button disabled={loading} variant="primary" onClick={() => onSubmitNewAddressForm()}>
          {loading ? "Loading..." : "Add new one"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddAddressModal;
