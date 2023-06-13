import React, {useState} from "react";
import {Button, Card} from "react-bootstrap";
import {FaLongArrowAltLeft} from "react-icons/fa";
import {useSelector} from "react-redux";
import AppLayout from "../../components/AppLayout";
import CartItem from "../../components/CartItem";
import Container from "../../components/Container";
import {calculateListCartOrOrderPrice} from "../../utils/productUtils";
import {Link, useNavigate} from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();
  const {cart} = useSelector(state => state.userData);

  const [selectedOrders, setSelectedOrders] = useState([]);

  const {subTotal, saleOff, total} = calculateListCartOrOrderPrice(selectedOrders);

  function onSelectCartItem(data) {
    let isExist = selectedOrders.some(o => o.id === data.id);
    if (!isExist) {
      setSelectedOrders([...selectedOrders, data]);
    } else {
      const newData = [...selectedOrders];
      let removedIndex = newData.findIndex(o => o.id === data.id);
      newData.splice(removedIndex, 1);
      setSelectedOrders([...newData]);
    }
  }

  function proceedToCheckOut() {
    navigate("/checkout", {state: {orders: selectedOrders}});
  }

  return (
    <AppLayout>
      <Container>
        <Card>
          <Card.Header className="bg-primary text-white fs-4 fw-bold">My Cart</Card.Header>
          <Card.Body>
            {cart.length <= 0 ? (
              <h4 className="fw-bold text-primary mb-0 text-center">
                Have no item for showing to you!
              </h4>
            ) : (
              cart.map((item, index) => (
                <CartItem onSelectCartItem={onSelectCartItem} data={item} key={index} />
              ))
            )}
          </Card.Body>
          <Card.Footer className="bg-primary text-white">
            <p className="text-right">Subtotal : ${subTotal}</p>
            <p className="text-right">Sale off: ${saleOff}</p>
            <h4 className="text-right">Total: ${total}</h4>
          </Card.Footer>
          <Card.Footer>
            <Button onClick={() => proceedToCheckOut()} variant="primary" className="me-2">
              Proceed to check out
            </Button>
            <Link to="/shop">
              <Button variant="secondary">
                <FaLongArrowAltLeft className="me-2" /> Continue to shopping
              </Button>
            </Link>
          </Card.Footer>
        </Card>
      </Container>
    </AppLayout>
  );
};

export default Cart;
