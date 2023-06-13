import React from "react";
import Container from "../Container";
import {Form} from "react-bootstrap";
import {useSelector} from "react-redux";

const ChooseAddressStep = ({addressId, onChangeAddressSelect}) => {
  const {addresses} = useSelector(state => state.userData);

  return (
    <Container>
      <Form>
        <Form.Select
          value={addressId}
          onChange={e => {
            onChangeAddressSelect(e.target.value);
          }}
        >
          <option>Select shipping address</option>
          {addresses.map((item, index) => (
            <option
              key={index}
              value={item.id}
            >{`${item.street}, ${item.district}, ${item.state}, ${item.country}`}</option>
          ))}
        </Form.Select>
      </Form>
    </Container>
  );
};

export default ChooseAddressStep;
