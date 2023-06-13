import React from "react";
import {Card} from "react-bootstrap";
import {convertSQLDateTimeToDateTimeString} from "../utils/stringUtils";

const PostItem = ({grid = 3, gridLayout = false, data}) => {
  const ListLayout = ({children}) => {
    return gridLayout ? <>{children}</> : <div className="row">{children}</div>;
  };

  const ListLayoutItem = ({col, children}) => {
    return gridLayout ? <>{children}</> : <div className={`col-md-${col}`}>{children}</div>;
  };

  return (
    <div className={grid && gridLayout ? `col-xl-${grid} col-lg-4 col-md-6 mb-3` : "mb-3"}>
      <Card className="overflow-hidden">
        <ListLayout>
          <ListLayoutItem col={4}>
            <Card.Img
              variant={gridLayout ? "top" : "left"}
              src={data.image.url}
              alt="Product name"
              className="w-100 h-100"
            />
          </ListLayoutItem>
          <ListLayoutItem col={8}>
            <Card.Body>
              <p className="fw-bold text-primary mb-2">{data.title}</p>
              <p className="text-muted">
                <small>{data.shortDescription}</small>
              </p>
              <p className="text-muted">
                <small>
                  Author: <strong>{data.author.fullName}</strong>
                </small>
              </p>
              <p className="text-muted">
                <small>
                  Created Date:{" "}
                  <strong>{convertSQLDateTimeToDateTimeString(data.createdDate)}</strong>
                </small>
              </p>
              <p className="text-muted">
                <small>{`${data.comments.length} comment${
                  data.comments.length > 0 ? "s" : ""
                }`}</small>
              </p>
              <div className="d-flex">
                <button className="btn btn-primary btn-md me-2" type="button">
                  View Details
                </button>
              </div>
            </Card.Body>
          </ListLayoutItem>
        </ListLayout>
      </Card>
    </div>
  );
};

export default PostItem;
