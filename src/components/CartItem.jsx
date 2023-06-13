import React, {useRef, useState} from "react";
import {Button, Card, Form} from "react-bootstrap";
import {FaMinus, FaPlus, FaTrashAlt, FaCircleNotch} from "react-icons/fa";
import {useDispatch} from "react-redux";
import {deleteUserCart} from "../redux/actions/userDataActions";
import {changeCartItemQuantity} from "../redux/slices/userDataSlice";
import {showToastError, showToastInfo} from "../utils/toastActions";

const CartItem = ({data, onSelectCartItem = () => {}}) => {
  const dispatch = useDispatch();

  const [quantity, setQuantity] = useState(data.quantity);
  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState(false);
  const changeQuantityRef = useRef(null);

  function onChangeItemQuantity(dir) {
    let value = quantity;
    if (checked) {
      return;
    }
    if (dir === "minus") {
      setQuantity(quantity <= 1 ? 1 : quantity - 1);
      value = quantity <= 1 ? 1 : value - 1;
    } else if (dir === "plus") {
      setQuantity(quantity + 1);
      value += 1;
    } else {
      return;
    }
    if (changeQuantityRef.current) {
      clearTimeout(changeQuantityRef.current);
    }
    changeQuantityRef.current = setTimeout(() => {
      const payload = {
        cartId: data.id,
        quantity: value,
      };
      dispatch(changeCartItemQuantity(payload));
    }, 200);
  }

  function removeCartItem() {
    setLoading(true);
    function next(message) {
      setLoading(false);
      showToastInfo(message);
    }
    function errorHandle(message) {
      setLoading(false);
      showToastError(message);
    }
    deleteUserCart(dispatch, data.id, next, errorHandle);
  }

  return (
    data && (
      <Card className="mb-3">
        <Card.Body>
          <div className="d-flex justify-content-between">
            <div className="d-flex flex-row align-items-center">
              <Form>
                <Form.Check
                  onChange={() => {
                    onSelectCartItem(data);
                    setChecked(!checked);
                  }}
                  type="checkbox"
                  className="me-3"
                />
              </Form>
              <div>
                <img
                  src={data.product.images[0].url}
                  className="img-fluid rounded-3"
                  alt="Shopping item"
                  style={{width: 80, height: 80, objectFit: "cover"}}
                />
              </div>
              <div className="ms-3">
                <h5>{data.product.name}</h5>
                <div className="d-flex flex-wrap">
                  <p className="small me-2">
                    Price: $
                    {data.product.saleOff > 0
                      ? (
                          data.product.price -
                          (data.product.price / 100) * data.product.saleOff
                        ).toFixed(2)
                      : data.product.price.toFixed(2)}
                  </p>
                  {data.product.saleOff > 0 && (
                    <span className="text-danger small">
                      <s>${data.product.price.toFixed(2)}</s>
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="d-flex flex-row align-items-center">
              <div className="d-flex align-items-center rounded shadow px-2 py-1 me-3">
                <FaMinus onClick={() => onChangeItemQuantity("minus")} />
                <div style={{width: 50}} className="text-center">
                  <h5 className="fw-normal mb-0">{quantity}</h5>
                </div>
                <FaPlus onClick={() => onChangeItemQuantity("plus")} />
              </div>
              <div className="me-3">
                <h5 className="mb-0">${(data.product.price * data.quantity).toFixed(2)}</h5>
              </div>
              <Button onClick={() => removeCartItem()} variant="light" disabled={loading}>
                {loading ? (
                  <FaCircleNotch className="text-primary" />
                ) : (
                  <FaTrashAlt className="text-danger" />
                )}
              </Button>
            </div>
          </div>
        </Card.Body>
      </Card>
    )
  );
};

export default CartItem;
