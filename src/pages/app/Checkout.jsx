import React, {useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import StepProgressBar from "react-step-progress";
import AppLayout from "../../components/AppLayout";
import Container from "../../components/Container";
import ChooseAddressStep from "../../components/progress_steps/ChooseAddressStep";
import ConfirmOrdersStep from "../../components/progress_steps/ConfirmOrdersStep";
import PaymentMethod from "../../components/progress_steps/PaymentMethod";
import {useDispatch} from "react-redux";
import {createNewOrder} from "../../redux/actions/userDataActions";
import {showToastError, showToastSuccess} from "../../utils/toastActions";

const Checkout = () => {
  const dispatch = useDispatch();
  const {state} = useLocation();
  const {orders} = state;
  const [addressId, setAddressId] = useState();
  const [paymentMethod, setPaymentMethod] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [cardDetailsForm, setCardDetailsForm] = useState({
    number: "",
    cvc: "",
    expiry: "",
    name: "",
  });

  function onChangeAddressSelect(value) {
    setAddressId(value);
  }

  function onChangePaymentMethodSelect(value) {
    setPaymentMethod(value);
  }

  function onChangeCardDetailsForm(name, value) {
    setCardDetailsForm(cardDetailsForm => ({...cardDetailsForm, [name]: value}));
  }

  function onSubmitForm() {
    const orderItems = orders.reduce((newArr, order) => {
      newArr.push({productId: order.product.id, quantity: order.quantity});
      return newArr;
    }, []);

    const orderRequest = {
      addressId,
      paymentMethod,
      description: `The payment created at ${new Date()}`,
      items: orderItems,
      stripeRequest: {
        number: cardDetailsForm.number,
        expMonth: cardDetailsForm.expiry.split("/")[0],
        expYear: cardDetailsForm.expiry.split("/")[1],
        cvc: cardDetailsForm.cvc,
      },
    };
    setLoading(true);
    let permitSubmit = true;
    if (addressId === undefined) {
      showToastError("Please choose shipping address!");
      permitSubmit = false;
    }
    if (permitSubmit) {
      function next() {
        setLoading(false);
        showToastSuccess("Create order successfully!");
        navigate("/profile");
      }
      function errorHandle(message) {
        setLoading(false);
        showToastError(message);
      }
      createNewOrder(dispatch, orderRequest, next, errorHandle);
    }
  }

  return (
    <AppLayout>
      <Container>
        <StepProgressBar
          onSubmit={onSubmitForm}
          startingStep={0}
          primaryBtnClass={`text-decoration-none text-white btn ${loading ? "disabled" : ""}`}
          secondaryBtnClass={`text-decoration-none text-primary btn ${loading ? "disabled" : ""}`}
          steps={[
            {label: "Confirm your orders", content: <ConfirmOrdersStep orders={orders} />},
            {
              label: "Choose address",
              content: (
                <ChooseAddressStep
                  addressId={addressId}
                  onChangeAddressSelect={onChangeAddressSelect}
                />
              ),
            },
            {
              label: "Choose payment method",
              content: (
                <PaymentMethod
                  cardDetailsForm={cardDetailsForm}
                  onChangeCardDetailsForm={onChangeCardDetailsForm}
                  paymentMethod={paymentMethod}
                  onChangePaymentMethodSelect={onChangePaymentMethodSelect}
                />
              ),
            },
          ]}
        />
      </Container>
    </AppLayout>
  );
};

export default Checkout;
