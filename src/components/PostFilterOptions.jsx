import React from "react";
import {Button, Card, Form, InputGroup} from "react-bootstrap";
import {changePostFilters} from "../redux/actions/postActions";
import {useDispatch} from "react-redux";

const PostFilterOptions = () => {
  const dispatch = useDispatch();

  function setSort(sortBy, sortDir) {
    changePostFilters(dispatch, {sortBy, sortDir});
  }

  return (
    <div>
      {/* Search Input Section */}
      <InputGroup className="mb-3">
        <Form.Control placeholder="Search keyword..." />
        <Button>Search</Button>
      </InputGroup>
      {/* Sort Section */}
      <Card className="mb-3">
        <Card.Header className="bg-primary fw-bold text-white">Sort by</Card.Header>
        <Card.Body>
          <Form.Check
            onChange={e => setSort("id", "desc")}
            type="radio"
            label={"Latest"}
            name="postSort"
          />
          <Form.Check
            onChange={e => setSort("id", "asc")}
            type="radio"
            label={"Oldest"}
            name="postSort"
          />
        </Card.Body>
      </Card>
    </div>
  );
};

export default PostFilterOptions;
