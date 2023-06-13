import React from "react";
import Container from "../Container";
import {Card} from "react-bootstrap";
import {calculateListCartOrOrderPrice} from "../../utils/productUtils";

const ConfirmOrdersStep = ({orders}) => {
  const {subTotal, saleOff, total} = calculateListCartOrOrderPrice(orders);

  return (
    <Container className="py-2">
      <Card>
        <Card.Body>
          {orders.map((item, index) => {
            const price = {
              normalPrice: item.product.price,
              salePrice: (
                item.product.price -
                (item.product.price * item.product.saleOff) / 100
              ).toFixed(2),
            };
            return (
              <div
                className={`d-flex align-items-center justify-content-between ${
                  !(index === orders.length - 1) && "mb-3"
                }`}
                key={index}
              >
                <div className="d-flex">
                  <img
                    alt={`OrderItem${item.id}`}
                    src={item.product.images[0].url}
                    width={100}
                    height={100}
                    style={{objectFit: "cover"}}
                    className="me-2"
                  />
                  <div>
                    <p className="text-primary fw-bold">{item.product.name}</p>
                    <p>
                      ${item.product.saleOff > 0 ? price.salePrice : price.normalPrice}
                      {item.product.saleOff > 0 && (
                        <span className="text-danger mx-2">${price.normalPrice}</span>
                      )}
                    </p>
                  </div>
                </div>
                <div className="d-flex">
                  <div className="me-2">
                    Quantity: <span className="text-primary fw-bold">{item.quantity}</span>
                  </div>
                  <p className="me-2">||</p>
                  <div>
                    Price:{" "}
                    <span className="text-primary fw-bold">
                      $
                      {item.product.saleOff > 0
                        ? (price.salePrice * item.quantity).toFixed(2)
                        : (price.normalPrice * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </Card.Body>
        <Card.Footer className="bg-primary">
          <p className="text-right text-white">Subtotal : ${subTotal}</p>
          <p className="text-right text-white">Sale off: ${saleOff}</p>
          <h4 className="text-right text-white">Total: ${total}</h4>
        </Card.Footer>
      </Card>
    </Container>
  );
};

export default ConfirmOrdersStep;
