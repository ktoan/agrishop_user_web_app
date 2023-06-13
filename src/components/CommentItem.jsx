import React from "react";
import {Dropdown, DropdownButton} from "react-bootstrap";
import ReactStars from "react-rating-stars-component";
import {useSelector} from "react-redux";

const CommentItem = ({data = null, isLast = false}) => {
  const {user} = useSelector(state => state.auth);

  const Section = () => {
    return (
      <div className="p-2 rounded shadow d-flex justify-content-center align-items-center">
        <div className="me-3">
          <img
            width={80}
            height={80}
            style={{objectFit: "contain"}}
            className="border mr-3 rounded-circle"
            alt={data.user.fullName}
            src={data.user.avatar}
          />
        </div>
        <div style={{flex: 1}}>
          <h6 className="text-primary mb-0">{data.user.fullName}</h6>
          <p className="text-muted mb-0">
            <small>{data.comment}</small>
          </p>
          <ReactStars
            classNames="mb-3"
            halfIcon={<i className="fa fa-star-half-alt"></i>}
            count={data.value}
            color={"#ffd700"}
          />
        </div>
        {user.id === data.user.id && (
          <DropdownButton id="dropdown-item-button" title="Actions">
            <Dropdown.Item as="button">Update</Dropdown.Item>
            <Dropdown.Item as="button">Delete</Dropdown.Item>
          </DropdownButton>
        )}
      </div>
    );
  };

  return (
    data && (
      <div className={`px-4 py-2 ${!isLast && "mb-2"}`}>
        <Section />
      </div>
    )
  );
};

export default CommentItem;
