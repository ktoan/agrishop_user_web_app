import React from "react";
import {Badge, Button} from "react-bootstrap";
import {FaListUl, FaTh} from "react-icons/fa";
import {useDispatch, useSelector} from "react-redux";
import Data from "../constants/Data";
import {changePostTypeShowing} from "../redux/actions/uiActions";

const PostFilter = () => {
  const dispatch = useDispatch();

  const {postTypeShowing} = useSelector(state => state.ui);

  return (
    <div className="px-4 py-3 border mb-3 rounded">
      <div className="d-md-flex align-items-md-center">
        <div className="ml-auto d-flex align-items-center views">
          <Button
            onClick={() => changePostTypeShowing(dispatch, Data.SHOW_LIST_TYPE.GRID)}
            variant={postTypeShowing === Data.SHOW_LIST_TYPE.GRID ? "primary" : "secondary"}
            className="me-2"
          >
            <FaTh className="me-2" /> Grid View (Only Desktop)
          </Button>
          <Button
            onClick={() => changePostTypeShowing(dispatch, Data.SHOW_LIST_TYPE.LIST)}
            variant={postTypeShowing === Data.SHOW_LIST_TYPE.LIST ? "primary" : "secondary"}
            className="me-2"
          >
            <FaListUl className="me-2" /> List View
          </Button>
          <span className="text-muted">
            Posts <Badge className="fw-normal">4</Badge>
          </span>
        </div>
      </div>
    </div>
  );
};

export default PostFilter;
