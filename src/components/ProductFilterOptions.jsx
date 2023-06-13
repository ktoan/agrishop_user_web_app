import MultiRangeSlider from "multi-range-slider-react";
import React, {useRef, useState} from "react";
import {Button, Card, Form, InputGroup} from "react-bootstrap";
import {FaLongArrowAltDown, FaLongArrowAltUp} from "react-icons/fa";
import {useDispatch, useSelector} from "react-redux";
import {changeProductFilters} from "../redux/actions/productActions";

const ProductFilterOptions = () => {
  const dispatch = useDispatch();

  const {categories} = useSelector(state => state.category);

  const [key, setKey] = useState("");

  const [minValue, setMinValue] = useState(25);
  const [maxValue, setMaxValue] = useState(75);

  const timeoutKeyTyping = useRef();

  function handlePriceRangeSlider(e) {
    setMaxValue(e.maxValue);
    setMinValue(e.minValue);
  }

  function onChangeKey(e) {
    const value = e.target.value;
    setKey(value);

    if (timeoutKeyTyping) clearTimeout(timeoutKeyTyping.current);

    timeoutKeyTyping.current = setTimeout(() => {
      changeProductFilters(dispatch, {nameLike: value});
    }, 300);
  }

  function setSort(sortBy, sortDir) {
    changeProductFilters(dispatch, {sortBy, sortDir});
  }

  return (
    <div>
      {/* Search Input Section */}
      <InputGroup className="mb-3">
        <Form.Control value={key} onChange={e => onChangeKey(e)} placeholder="Search keyword..." />
        <Button>Search</Button>
      </InputGroup>
      {/* Categories Section */}
      <Card className="mb-3">
        <Card.Header className="bg-primary fw-bold text-white">Categories</Card.Header>
        <Card.Body>
          {categories.map((item, index) => (
            <Form.Check type="checkbox" label={item.name} key={index} />
          ))}
        </Card.Body>
      </Card>
      {/* Sort Section */}
      <Card className="mb-3">
        <Card.Header className="bg-primary fw-bold text-white">Sort by</Card.Header>
        <Card.Body>
          <Form.Check
            onChange={e => setSort("price", "desc")}
            type="radio"
            name="productSort"
            label={
              <span>
                Price <FaLongArrowAltUp />
              </span>
            }
          />
          <Form.Check
            onChange={e => setSort("price", "asc")}
            type="radio"
            name="productSort"
            label={
              <span>
                Price <FaLongArrowAltDown />
              </span>
            }
          />
          <Form.Check
            type="radio"
            name="productSort"
            label={"Latest"}
            onChange={e => setSort("id", "desc")}
          />
          <Form.Check
            type="radio"
            onChange={e => setSort("id", "asc")}
            name="productSort"
            label={"Oldest"}
          />
        </Card.Body>
      </Card>
      {/* Price Range Section */}
      <Card className="mb-3">
        <Card.Header className="bg-primary fw-bold text-white">Price</Card.Header>
        <Card.Body>
          <MultiRangeSlider
            min={0}
            max={100}
            step={5}
            minValue={minValue}
            maxValue={maxValue}
            onInput={handlePriceRangeSlider}
            ruler={false}
            barInnerColor="#12b886"
            thumbLeftColor="#12b886"
            thumbRightColor="#12b886"
          />
        </Card.Body>
      </Card>
    </div>
  );
};

export default ProductFilterOptions;
