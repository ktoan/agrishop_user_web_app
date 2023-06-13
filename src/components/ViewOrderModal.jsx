import React from "react";
import {Modal, Spinner, Table} from "react-bootstrap";
import ReviewForm from "./ReviewForm";

const ViewOrderModal = ({show = true, onHide = () => {}, order = null}) => {
  return (
    <Modal size="xl" show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title className="fs-4 fw-bold text-primary">Review your order</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!order ? (
          <div className="text-center py-3">
            <Spinner animation="border" variant="primary" />
          </div>
        ) : order.orderStatus === "HAVE_DONE" ? (
          <Table striped bordered>
            <thead>
              <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Review Here</th>
              </tr>
            </thead>
            <tbody>
              {order.orderItems.map((item, index) => (
                <tr key={index}>
                  <td>{item.product.name}</td>
                  <td>
                    $
                    {item.product.saleOff > 0
                      ? (
                          (item.product.price - (item.product.price * item.product.saleOff) / 100) *
                          item.quantity
                        ).toFixed(2)
                      : (item.product.price * item.quantity).toFixed(2)}
                  </td>
                  <td>
                    <ReviewForm productId={item.product.id} />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <p className="text-primary text-center">Wait order completed to leave a review</p>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default ViewOrderModal;
