import React, {useState} from "react";
import {Button, Form, Tab, Table, Tabs} from "react-bootstrap";
import DatePicker from "react-datepicker";
import {FaEdit, FaPlus} from "react-icons/fa";
import {connect, useDispatch} from "react-redux";
import AddAddressModal from "../../components/AddAddressModal";
import AddressItem from "../../components/AddressItem";
import AppLayout from "../../components/AppLayout";
import ChangePasswordModal from "../../components/ChangePasswordModal";
import Container from "../../components/Container";
import OrderItem from "../../components/OrderItem";
import Pagination from "../../components/Pagination";
import UpdateAddressModal from "../../components/UpdateAddressModal";
import {changeOrderFilters, updateUserInformation} from "../../redux/actions/userDataActions";
import {showToastError, showToastSuccess} from "../../utils/toastActions";
import InputFormLayout from "../../components/InputFormLayout";
import ChangeAvatarModal from "../../components/ChangeAvatarModal";
import ViewOrderModal from "../../components/ViewOrderModal";

const Profile = ({user = null, addresses = [], orders = [], orderFilters = null}) => {
  const dispatch = useDispatch();

  const [informationForm, setInformationForm] = useState({
    fullName: user.fullName,
    email: user.email,
    phone: user.phone,
    dayOfBirth: user.dayOfBirth,
    gender: user.gender,
  });
  const [startDate, setStartDate] = useState(new Date(user.dayOfBirth));
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const [showViewOrderModal, setShowViewOrderModal] = useState(false);
  const [showChangeAvatarModal, setShowChangeAvatarModal] = useState(false);
  const [selectedAddressToUpdate, setSelectedAddressToUpdate] = useState(null);
  const [selectedOrderToView, setSelectedOrderToView] = useState(null);
  const [showAddAddressModal, setShowAddAddressModal] = useState(false);
  const [showUpdateAddressModal, setShowUpdateAddressModal] = useState(false);
  const [loading, setLoading] = useState(false);

  function showAddressUpdateModal(data) {
    setSelectedAddressToUpdate(data);
    setShowUpdateAddressModal(true);
  }

  function onHideUpdateAddressModal() {
    setSelectedAddressToUpdate(null);
    setShowUpdateAddressModal(false);
  }

  function onChangeInformationInput(e) {
    setInformationForm({...informationForm, [e.target.name]: e.target.value});
  }

  function onSubmitInformationForm() {
    setLoading(true);
    let permitSubmit = true;
    if (
      !informationForm.fullName ||
      !informationForm.phone ||
      !informationForm.gender ||
      !informationForm.dayOfBirth
    ) {
      showToastError("All fields must be filled!");
      permitSubmit = false;
      setLoading(false);
    }
    if (permitSubmit) {
      function next() {
        showToastSuccess("Update information successfully!");
        setLoading(false);
      }
      function errorHandle(message) {
        showToastError(message);
      }
      updateUserInformation(dispatch, user.id, informationForm, next, errorHandle);
    }
  }

  function onChangePage(page) {
    changeOrderFilters(dispatch, {page});
  }

  function handleOpenViewOrderModal(data) {
    setSelectedOrderToView(data);
    setShowViewOrderModal(true);
  }

  function handleCloseViewOrderModal() {
    setSelectedOrderToView(null);
    setShowViewOrderModal(false);
  }

  const AddressTab = () => {
    return addresses.length <= 0 ? (
      <>
        <h4 className="fw-bold text-primary text-center">Have no addresses to showing</h4>
        <Button
          onClick={() => setShowAddAddressModal(true)}
          className="d-flex align-items-center justify-content-center"
        >
          <FaPlus className="me-2" /> Add new address
        </Button>
        <AddAddressModal show={showAddAddressModal} onHide={() => setShowAddAddressModal(false)} />
      </>
    ) : (
      <div>
        {addresses.map((item, index) => (
          <AddressItem updateButtonClick={showAddressUpdateModal} key={index} data={item} />
        ))}
        <UpdateAddressModal
          show={showUpdateAddressModal && selectedAddressToUpdate}
          data={selectedAddressToUpdate}
          onHide={() => onHideUpdateAddressModal()}
        />
        {addresses.length < 3 && (
          <>
            <Button
              onClick={() => setShowAddAddressModal(true)}
              className="d-flex align-items-center justify-content-center"
            >
              <FaPlus className="me-2" /> Add new address
            </Button>
            <AddAddressModal
              show={showAddAddressModal}
              onHide={() => setShowAddAddressModal(false)}
            />
          </>
        )}
      </div>
    );
  };

  const OrderTab = () => {
    return orders.length === 0 ? (
      <h4 className="fw-bold text-primary text-center">Have no orders to showing</h4>
    ) : (
      <>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Products</th>
              <th>Price</th>
              <th>To address</th>
              <th>Payment method</th>
              <th>Payment Status</th>
              <th>Order Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((item, index) => (
              <OrderItem
                key={index}
                data={item}
                onViewOrder={data => handleOpenViewOrderModal(data)}
              />
            ))}
          </tbody>
        </Table>
        <Pagination
          onChangePage={onChangePage}
          pages={orderFilters.totalPages}
          activePage={orderFilters.page}
        />
        {selectedOrderToView && showViewOrderModal && (
          <ViewOrderModal
            onHide={() => handleCloseViewOrderModal()}
            show={showViewOrderModal}
            order={selectedOrderToView}
          />
        )}
      </>
    );
  };

  return (
    <AppLayout>
      <Container>
        <div className="row">
          <div className="col-sm-3 mb-3">
            <div className="text-center">
              <img
                src={user.avatar}
                width={100}
                height={100}
                style={{objectFit: "cover", cursor: "pointer"}}
                className="img-fluid rounded-3 mb-3"
                alt={user.fullName}
                onClick={() => setShowChangeAvatarModal(true)}
              />
              <ChangeAvatarModal
                show={showChangeAvatarModal}
                onHide={() => setShowChangeAvatarModal(false)}
              />
              <div className="d-flex justify-content-center flex-wrap">
                <Button
                  variant="warning"
                  onClick={() => setShowChangePasswordModal(true)}
                  className="text-white d-flex align-items-center justify-content-center"
                >
                  <FaEdit className="me-2" />
                  Change password
                </Button>
                <ChangePasswordModal
                  show={showChangePasswordModal}
                  onHide={() => setShowChangePasswordModal(false)}
                />
              </div>
            </div>
          </div>
          <div className="col-sm-9">
            <Tabs className="mb-3">
              <Tab eventKey="information" title="My information">
                <Form className="row mb-3">
                  <InputFormLayout label="Email">
                    <Form.Control
                      className="mb-3"
                      disabled
                      readOnly
                      value={informationForm.email}
                    />
                  </InputFormLayout>
                  <InputFormLayout label="Full name">
                    <Form.Control
                      name="fullName"
                      onChange={e => onChangeInformationInput(e)}
                      className="mb-3"
                      value={informationForm.fullName}
                      placeholder="Enter your full name"
                    />
                  </InputFormLayout>
                  <InputFormLayout label="Phone number">
                    <Form.Control
                      name="phone"
                      onChange={e => onChangeInformationInput(e)}
                      className="mb-3"
                      value={informationForm.phone}
                      placeholder="Enter your phone number"
                    />
                  </InputFormLayout>
                  <InputFormLayout label="Gender">
                    <Form.Select
                      aria-label="Select gender"
                      onChange={e => {
                        setInformationForm({...informationForm, gender: e.target.value});
                      }}
                      value={informationForm.gender}
                      className="mb-3"
                    >
                      <option value="MALE">Male</option>
                      <option value="FEMALE">Female</option>
                      <option value="DISCLOSED">Disclosed</option>
                    </Form.Select>
                  </InputFormLayout>
                  <InputFormLayout label="Day of birth">
                    <DatePicker
                      placeholderText="Day of birth"
                      className="form-control"
                      selected={startDate}
                      onChange={date => {
                        let dateString = date.toISOString().split("T")[0];
                        setInformationForm({...informationForm, dayOfBirth: dateString});
                        setStartDate(date);
                      }}
                    />
                  </InputFormLayout>
                </Form>
                <Button disabled={loading} onClick={() => onSubmitInformationForm()}>
                  {loading ? "Loading..." : "Save changes"}
                </Button>
              </Tab>
              <Tab eventKey="address" title="My addresses">
                <AddressTab />
              </Tab>
              <Tab eventKey="order" title="My orders">
                <OrderTab />
              </Tab>
            </Tabs>
          </div>
        </div>
      </Container>
    </AppLayout>
  );
};

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    addresses: state.userData.addresses,
    orders: state.userData.orders,
    orderFilters: state.userData.orderFilters,
  };
};

export default connect(mapStateToProps, {})(Profile);
