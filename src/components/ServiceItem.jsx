import React from "react";

const ServiceItem = ({data}) => {
  return (
    <div className="col-6 col-md-3 align-items-center justify-content-center d-flex">
      <div>
        <div className="d-flex align-items-center justify-content-center">
          <img src={data.image} width={30} alt={data.title} />
          <h5 className="text-primary mx-3">{data.title}</h5>
        </div>
        <p className="text-muted mb-0">{data.tagline}</p>
      </div>
    </div>
  );
};

export default ServiceItem;
