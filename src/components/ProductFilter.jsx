import React from "react";
import {Badge, Button} from "react-bootstrap";
import {FaListUl, FaTh} from "react-icons/fa";
import {connect, useDispatch} from "react-redux";
import {changeProductTypeShowing} from "../redux/actions/uiActions";
import Data from "../constants/Data";

const ProductFilter = ({productTypeShowing, changeProductTypeShowing}) => {
  const dispatch = useDispatch();

  return (
    <div className="px-4 py-3 border mb-3 rounded">
      <div className="d-md-flex align-items-md-center">
        <div className="ml-auto d-flex align-items-center views">
          <Button
            onClick={() => changeProductTypeShowing(dispatch, Data.SHOW_LIST_TYPE.GRID)}
            variant={productTypeShowing === Data.SHOW_LIST_TYPE.GRID ? "primary" : "secondary"}
            className="me-2"
          >
            <FaTh className="me-2" /> Grid View (Only Desktop)
          </Button>
          <Button
            onClick={() => changeProductTypeShowing(dispatch, Data.SHOW_LIST_TYPE.LIST)}
            variant={productTypeShowing === Data.SHOW_LIST_TYPE.LIST ? "primary" : "secondary"}
            className="me-2"
          >
            <FaListUl className="me-2" /> List View
          </Button>
          <span className="text-muted">
            Products <Badge className="fw-normal">4</Badge>
          </span>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    productTypeShowing: state.ui.productTypeShowing,
  };
};

const mapActionToProps = () => {
  return {
    changeProductTypeShowing,
  };
};

export default connect(mapStateToProps, mapActionToProps)(ProductFilter);
