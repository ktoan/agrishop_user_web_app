import React from "react";
import Container from "../../components/Container";
import PostFilter from "../../components/PostFilter";
import PostFilterOptions from "../../components/PostFilterOptions";
import PostItem from "../../components/PostItem";
import Pagination from "../../components/Pagination";
import {connect, useDispatch, useSelector} from "react-redux";
import Data from "../../constants/Data";
import AppLayout from "../../components/AppLayout";
import {changePostFilters} from "../../redux/actions/postActions";

const Posts = ({postTypeShowing}) => {
  const dispatch = useDispatch();

  const {filteredPosts, postFilters} = useSelector(state => state.post);

  function onChangePage(page) {
    changePostFilters(dispatch, {page});
  }

  return (
    <AppLayout>
      <Container>
        <h4 className="fw-bold text-primary mb-3">Posts</h4>
        <PostFilter />
        <div className="row">
          <div className="col-12 col-md-3">
            <PostFilterOptions />
          </div>
          <div className="col-12 col-md-9">
            <div className={"row"}>
              {filteredPosts.map((item, index) => (
                <PostItem
                  key={index}
                  data={item}
                  grid={4}
                  gridLayout={postTypeShowing === Data.SHOW_LIST_TYPE.GRID}
                />
              ))}
            </div>
            <Pagination
              pages={postFilters.totalPages}
              activePage={postFilters.page}
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
    postTypeShowing: state.ui.postTypeShowing,
  };
};

const mapActionToProps = () => {
  return {};
};

export default connect(mapStateToProps, mapActionToProps)(Posts);
