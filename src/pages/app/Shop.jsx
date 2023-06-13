import React from "react";
import {connect, useDispatch, useSelector} from "react-redux";
import Container from "../../components/Container";
import Pagination from "../../components/Pagination";
import ProductFilter from "../../components/ProductFilter";
import ProductFilterOptions from "../../components/ProductFilterOptions";
import ProductItem from "../../components/ProductItem";
import Data from "../../constants/Data";
import AppLayout from "../../components/AppLayout";
import {changeProductFilters} from "../../redux/actions/productActions";

const Shop = ({productTypeShowing}) => {
  const dispatch = useDispatch();

  const {filteredProducts, productFilters} = useSelector(state => state.product);

  function onChangePage(page) {
    changeProductFilters(dispatch, {page});
  }

  return (
    <AppLayout>
      <Container>
        <h4 className="fw-bold text-primary mb-3">Our Store</h4>
        <ProductFilter />
        <div className="row">
          <div className="col-12 col-md-3">
            <ProductFilterOptions />
          </div>
          <div className="col-12 col-md-9">
            <div className={productTypeShowing !== Data.SHOW_LIST_TYPE.GRID ? "d-block" : "row"}>
              {filteredProducts.length > 0 ? (
                filteredProducts.map((item, index) => (
                  <ProductItem
                    key={index}
                    data={item}
                    grid={4}
                    gridLayout={productTypeShowing === Data.SHOW_LIST_TYPE.GRID}
                  />
                ))
              ) : (
                <h4 className="fw-bold text-primary text-center mb-3">
                  Have no product mapping with your filters
                </h4>
              )}
            </div>
            <Pagination
              pages={productFilters.totalPages}
              activePage={productFilters.page}
              onChangePage={onChangePage}
            />
          </div>
        </div>
      </Container>
    </AppLayout>
  );
};

const mapStateToProps = state => {
  return {
    productTypeShowing: state.ui.productTypeShowing,
  };
};

const mapActionToProps = () => {
  return {};
};

export default connect(mapStateToProps, mapActionToProps)(Shop);
