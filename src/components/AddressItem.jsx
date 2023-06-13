import React from "react";
import {Button} from "react-bootstrap";
import {useDispatch} from "react-redux";
import {deleteUserAddress} from "../redux/actions/userDataActions";
import {showToastError, showToastInfo} from "../utils/toastActions";

const AddressItem = ({data, updateButtonClick}) => {
  const dispatch = useDispatch();

  function onDeleteAddressItem(id) {
    function next(message) {
      showToastInfo(message);
    }
    function errorHandle(message) {
      showToastError(message);
    }
    deleteUserAddress(dispatch, id, next, errorHandle);
  }

  return (
    <div className="shadow rounded px-3 py-2 w-100 d-flex align-items-center justify-content-between mb-3">
      <div>
        <p className="fw-bold text-primary mb-0">{data.street}</p>
        <p className="text-muted mb-0">{data.district}</p>
        <p className="text-muted mb-0">{data.state}</p>
        <p className="text-muted mb-0">{data.country}</p>
      </div>
      <div className="d-flex flex-wrap">
        <Button
          onClick={() => updateButtonClick(data)}
          variant="warning"
          className="text-white me-2"
        >
          Update
        </Button>
        <Button onClick={() => onDeleteAddressItem(data.id)} variant="danger">
          Delete
        </Button>
      </div>
    </div>
  );
};

export default AddressItem;
