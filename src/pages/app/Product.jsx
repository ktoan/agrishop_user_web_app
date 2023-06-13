import React, {useEffect, useState} from "react";
import {Badge, Button, Form, InputGroup, Row, Spinner, Tab, Tabs} from "react-bootstrap";
import Carousel from "react-grid-carousel";
import {FaLongArrowAltLeft, FaMinus, FaPlus, FaShoppingBag} from "react-icons/fa";
import {Link, useParams} from "react-router-dom";
import AppLayout from "../../components/AppLayout";
import CommentItem from "../../components/CommentItem";
import Container from "../../components/Container";
import {fetchProductDetails} from "../../redux/actions/productActions";
import {updateUserCart} from "../../redux/actions/userDataActions";
import {showToastError, showToastSuccess} from "../../utils/toastActions";
import {useDispatch} from "react-redux";

const Product = () => {
  const dispatch = useDispatch();

  const [productDetails, setProductDetails] = useState(null);
  const [limitLoadedComment, setLimitLoadedComment] = useState(2);
  const [loading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(null);
  const params = useParams();
  const {productId} = params;

  useEffect(() => {
    function next(productDetails) {
      setProductDetails(productDetails);
    }
    function errorHandle() {}
    fetchProductDetails(productId, next, errorHandle);
  }, [productId]);

  useEffect(() => {
    setPrice({
      normalPrice: productDetails ? productDetails.price.toFixed(2) : (0).toFixed(2),
      salePrice: productDetails
        ? (productDetails.price - (productDetails.price / 100) * productDetails.saleOff).toFixed(2)
        : (0).toFixed(2),
    });
  }, [productDetails]);

  function onChangeQuantity(dir) {
    if (dir === "minus") {
      setQuantity(quantity === 1 ? 1 : quantity - 1);
    } else if (dir === "plus") {
      setQuantity(quantity === productDetails.amount ? productDetails.amount : quantity + 1);
    } else {
      return;
    }
  }

  function addToCart() {
    setLoading(true);
    function next() {
      setLoading(false);
      showToastSuccess("Add card successfully!");
    }
    function errorHandle(message) {
      setLoading(false);
      showToastError(message);
    }
    updateUserCart(dispatch, {productId: productDetails.id, quantity: quantity}, next, errorHandle);
    setQuantity(1);
  }

  return (
    <AppLayout>
      <Container>
        <Link to={"/shop"}>
          <Button className="mb-3">
            <FaLongArrowAltLeft /> Continue to shopping
          </Button>
        </Link>
        {!productDetails ? (
          <Row>
            <div className="col-12 text-center">
              <Spinner animation="border" variant="primary" />
            </div>
          </Row>
        ) : (
          <>
            <Row className="mb-3">
              {/* Product Images Slider */}
              <div className="col-12 col-md-4">
                <Carousel containerClassName="mb-3">
                  {productDetails.images.map((item, index) => (
                    <Carousel.Item key={index}>
                      <img className="w-100" src={item.url} alt={`Product${productDetails.name}`} />
                    </Carousel.Item>
                  ))}
                </Carousel>
              </div>
              <div className="col-12 col-md-8">
                {/* Product Name */}
                <h4 className="text-primary mb-3">{productDetails.name}</h4>
                {/* Product Categories */}
                <div className="flex-wrap mb-3">
                  {productDetails.categories.map((item, index) => (
                    <Badge className="me-2" key={index}>
                      {item.name}
                    </Badge>
                  ))}
                </div>
                <p className="text-muted mb-3">
                  <small>{productDetails.shortDescription}</small>
                </p>
                <div className="d-flex flex-row align-items-center mb-3">
                  <h4 className="mb-1 me-1">
                    ${productDetails.saleOff > 0 ? price.salePrice : price.normalPrice}
                  </h4>
                  {productDetails.saleOff > 0 && (
                    <span className="text-danger">
                      <s>${price.normalPrice}</s>
                    </span>
                  )}
                </div>
                <div className="d-flex flex-row align-items-center mb-3">
                  <div className="d-flex align-items-center me-3 ">
                    <InputGroup>
                      <Button onClick={() => onChangeQuantity("minus")}>
                        <FaMinus />
                      </Button>
                      <Form.Control
                        type="number"
                        className="text-center"
                        value={quantity}
                        onChange={e =>
                          setQuantity(
                            e.target.value > productDetails.amount
                              ? productDetails.amount
                              : e.target.value <= 0
                              ? 1
                              : e.target.value
                          )
                        }
                      />
                      <Button onClick={() => onChangeQuantity("plus")}>
                        <FaPlus />
                      </Button>
                    </InputGroup>
                  </div>
                  <Button onClick={() => addToCart()} disabled={loading}>
                    {loading ? (
                      "Loading"
                    ) : (
                      <>
                        <FaShoppingBag /> Add to cart
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </Row>
            <div>
              <Tabs defaultActiveKey="information" justify>
                <Tab eventKey="information" title="Information">
                  <Container>
                    <div dangerouslySetInnerHTML={{__html: productDetails.information}}></div>
                  </Container>
                </Tab>
                <Tab eventKey="reviews" title="Reviews">
                  <Container>
                    {productDetails.reviews.length === 0 ? (
                      <p className="text-primary">Have no reviews here!</p>
                    ) : (
                      productDetails.reviews
                        .slice(0, limitLoadedComment)
                        .map((item, index) => (
                          <CommentItem
                            key={index}
                            data={item}
                            isLast={index === productDetails.length - 1}
                          />
                        ))
                    )}
                    <div className="text-center">
                      <Button onClick={() => setLimitLoadedComment(limitLoadedComment + 2)}>
                        Load more
                      </Button>
                    </div>
                  </Container>
                </Tab>
              </Tabs>
            </div>
          </>
        )}
      </Container>
    </AppLayout>
  );
};

export default Product;
