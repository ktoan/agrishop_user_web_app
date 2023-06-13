import React, {useState} from "react";
import {Badge, Card} from "react-bootstrap";
import ReactStars from "react-rating-stars-component";
import {useDispatch} from "react-redux";
import {updateUserCart} from "../redux/actions/userDataActions";
import {calculateProductStar} from "../utils/productUtils";
import {showToastError, showToastSuccess} from "../utils/toastActions";
import {Link} from "react-router-dom";

const ProductItem = ({grid = 3, gridLayout = false, data}) => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const ListLayout = ({children}) => {
    return gridLayout ? <>{children}</> : <div className="row">{children}</div>;
  };

  const ListLayoutItem = ({col, children}) => {
    return gridLayout ? <>{children}</> : <div className={`col-md-${col}`}>{children}</div>;
  };

  const price = {
    normalPrice: data.price.toFixed(2),
    salePrice: (data.price - (data.price / 100) * data.saleOff).toFixed(2),
  };

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
    updateUserCart(dispatch, {productId: data.id, quantity: 1}, next, errorHandle);
  }

  return (
    <div className={grid && gridLayout ? `col-xl-${grid} col-lg-4 col-md-6 mb-3` : "mb-3"}>
      <Card className="overflow-hidden">
        <ListLayout>
          <ListLayoutItem col={4}>
            <Card.Img
              variant={gridLayout ? "top" : "left"}
              src={data.images[0].url}
              alt="Product name"
              className={`w-100 ${!gridLayout && "h-100"}`}
              style={{objectFit: "cover"}}
              height={200}
            />
          </ListLayoutItem>
          <ListLayoutItem col={8}>
            <Card.Body>
              <p className="fw-bold text-primary mb-2">{data.name}</p>
              <p className="text-muted ">
                <small>{data.shortDescription}</small>
              </p>
              {data.saleOff ? (
                <div className="d-flex flex-row align-items-center mb-1">
                  <h4 className="mb-1 me-1">${price.salePrice}</h4>
                  <span className="text-danger">
                    <s>${price.normalPrice}</s>
                  </span>
                </div>
              ) : (
                <div className="d-flex flex-row align-items-center mb-1">
                  <h4 className="mb-1 me-1">${price.normalPrice}</h4>
                </div>
              )}
              <Badge className="mb-2">Free shipping</Badge>
              <ReactStars
                half
                classNames="mb-3"
                count={calculateProductStar(data)}
                color={"#ffd700"}
              />
              <div className="d-flex">
                <Link to={`/product/${data.id}`}>
                  <button className="btn btn-primary btn-md me-2" type="button">
                    View Details
                  </button>
                </Link>
                <button
                  disabled={loading}
                  onClick={() => addToCart()}
                  className="btn btn-outline-primary btn-md"
                  type="button"
                >
                  {loading ? "Loading..." : "Add to cart"}
                </button>
              </div>
            </Card.Body>
          </ListLayoutItem>
        </ListLayout>
      </Card>
    </div>
  );
};

export default ProductItem;
