import React, {useState} from "react";
import {Form} from "react-bootstrap";
import Cards from "react-credit-cards";
import Data from "../../constants/Data";
import Container from "../Container";

const PaymentMethod = ({
  paymentMethod,
  onChangePaymentMethodSelect,
  cardDetailsForm,
  onChangeCardDetailsForm,
}) => {
  const [paymentMtd, setPaymentMethod] = useState(paymentMethod);
  const [form, setForm] = useState(cardDetailsForm);

  function onChangeSelect(e) {
    onChangePaymentMethodSelect(e.target.value);
    setPaymentMethod(e.target.value);
  }

  function clearPaymentMethod() {
    onChangePaymentMethodSelect("");
    setPaymentMethod("");
  }

  function onChangeCardDetails(e) {
    setForm({...form, [e.target.name]: e.target.value});
    onChangeCardDetailsForm(e.target.name, e.target.value);
  }

  function onExpiryChange(e) {
    let expiryValue = e.target.value;
    const month = expiryValue.split("-")[1];
    const year = expiryValue.split("-")[0];
    setForm({...form, expiry: `${month}/${year}`});
    onChangeCardDetailsForm("expiry", `${month}/${year}`);
  }

  return (
    <Container>
      {!paymentMtd ? (
        <Form>
          <Form.Select onChange={e => onChangeSelect(e)}>
            <option>Choose payment method</option>
            <option value={Data.PAYMENT_METHOD.SHIP_CODE}>Ship code</option>
            <option value={Data.PAYMENT_METHOD.CARD}>Card</option>
            <option value={Data.PAYMENT_METHOD.BANKING}>Banking</option>
          </Form.Select>
        </Form>
      ) : (
        <div>
          {paymentMtd === Data.PAYMENT_METHOD.CARD ? (
            <div className="mb-3">
              <Cards
                cvc={form.cvc}
                expiry={form.expiry}
                focused={form.focus}
                name={form.name}
                number={form.number}
              />
              <Form className="mt-3">
                <Form.Group className="mb-3">
                  <Form.Label>Card number</Form.Label>
                  <Form.Control
                    name="number"
                    type="tel"
                    placeholder="Card number"
                    value={form.number}
                    onChange={e => onChangeCardDetails(e)}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Name of owner</Form.Label>
                  <Form.Control
                    name="name"
                    placeholder="Name of card owner"
                    type="text"
                    value={form.name}
                    onChange={e => onChangeCardDetails(e)}
                  />
                </Form.Group>
                <div className="d-flex gap-3">
                  <Form.Group>
                    <Form.Label>Expiry</Form.Label>
                    <Form.Control type="month" onChange={e => onExpiryChange(e)} />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>CVC</Form.Label>
                    <Form.Control
                      name="cvc"
                      type="text"
                      placeholder="CVC"
                      onChange={e => onChangeCardDetails(e)}
                    />
                  </Form.Group>
                </div>
              </Form>
            </div>
          ) : (
            <>Form</>
          )}
          <p
            onClick={() => clearPaymentMethod()}
            className="text-primary"
            style={{cursor: "pointer"}}
          >
            Back to select payment method
          </p>
        </div>
      )}
    </Container>
  );
};

export default PaymentMethod;
