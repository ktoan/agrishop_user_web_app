import React from "react";
import {useState} from "react";
import {Button, Form, InputGroup} from "react-bootstrap";

import ReactStars from "react-rating-stars-component";
import {useDispatch} from "react-redux";
import {showToastError, showToastSuccess} from "../utils/toastActions";
import {createProductReview} from "../redux/actions/userDataActions";

const ReviewForm = ({productId}) => {
  const dispatch = useDispatch();

  const [reviewForm, setReviewForm] = useState({comment: "", value: 0});
  const [loading, setLoading] = useState(false);

  const ratingChanged = newRating => {
    setReviewForm(prev => ({...prev, value: newRating}));
  };

  function clearForm() {
    setReviewForm({comment: "", value: 0});
  }

  function onSubmitReviewForm() {
    setLoading(true);
    let permitSubmit = true;
    if (!reviewForm.comment || reviewForm.value < 1) {
      showToastError("Enter your comment and the rate more than 1");
      permitSubmit = false;
      setLoading(false);
    }
    if (permitSubmit) {
      function next() {
        setLoading(false);
        showToastSuccess("Add new comment successfully!");
        clearForm();
      }
      function errorHandle(message) {
        setLoading(false);
        showToastError(message);
      }
      createProductReview(dispatch, productId, reviewForm, next, errorHandle);
    }
  }

  return (
    <>
      <ReactStars
        count={5}
        onChange={ratingChanged}
        size={24}
        isHalf={true}
        emptyIcon={<i className="far fa-star"></i>}
        halfIcon={<i className="fa fa-star-half-alt"></i>}
        fullIcon={<i className="fa fa-star"></i>}
        activeColor="#ffd700"
      />
      <InputGroup>
        <Form.Control
          value={reviewForm.comment}
          onChange={e => setReviewForm({...reviewForm, comment: e.target.value})}
        />
        <Button disabled={loading} onClick={() => onSubmitReviewForm()}>
          {loading ? "Loading..." : "Send"}
        </Button>
      </InputGroup>
    </>
  );
};

export default ReviewForm;
