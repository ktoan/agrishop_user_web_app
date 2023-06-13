import React from "react";
import {Form} from "react-bootstrap";

const InputFormLayout = ({label, children}) => {
  return (
    <Form.Group className="col-12 col-md-6">
      {label && <Form.Label>{label}</Form.Label>}
      {children}
    </Form.Group>
  );
};

export default InputFormLayout;
