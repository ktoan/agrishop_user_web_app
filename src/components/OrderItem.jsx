import React from "react";
import {calculateListCartOrOrderPrice} from "../utils/productUtils";
import {Badge, Button} from "react-bootstrap";

const OrderItem = ({data, onViewOrder = () => {}}) => {
  const {subTotal, saleOff, total} = calculateListCartOrOrderPrice(data.orderItems);
  return (
    <tr>
      {/* ID */}
      <td>{data.id}</td>
      {/* List Products */}
      <td>
        {data.orderItems.map((item, index) => (
          <p key={index} className="mb-0">
            <strong className="text-primary">{item.product.name}</strong> x{" "}
            <strong className="text-primary">{item.quantity}</strong>
          </p>
        ))}
      </td>
      {/* Price */}
      <td>
        <p className="mb-0">
          Sub Total: <strong className="text-primary">${subTotal}</strong>
        </p>
        <p className="mb-0">
          Sale off: <strong className="text-primary">${saleOff}</strong>
        </p>
        <p className="mb-0">
          Total: <strong className="text-primary">${total}</strong>
        </p>
      </td>
      {/* To Address */}
      <td>
        <p className="mb-0 text-primary fw-bold">{data.address.street}</p>
        <p className="mb-0">{data.address.district}</p>
        <p className="mb-0">{data.address.state}</p>
        <p className="mb-0">{data.address.country}</p>
      </td>
      {/* Payment method */}
      <td>
        <Badge bg="info">{data.paymentMethod}</Badge>
      </td>
      {/* Payment status */}
      <td>
        <Badge bg={data.paymentStatus === "NOT_YET" ? "danger" : "primary"}>
          {data.paymentStatus}
        </Badge>
      </td>
      {/* Order status */}
      <td>
        <Badge
          bg={
            data.orderStatus === "CONFIRMING"
              ? "danger"
              : data.orderStatus === "SHIPPING"
              ? "warning"
              : data.orderStatus === "HAVE_DONE"
              ? "primary"
              : "info"
          }
        >
          {data.orderStatus}
        </Badge>
      </td>
      <td>
        <Button variant="outline-primary" onClick={() => onViewOrder(data)}>
          View Order
        </Button>
      </td>
    </tr>
  );
};

export default OrderItem;
