import Images from "./Images";

const Data = {
  NAV_LINKS: [
    {id: 1, route_name: "Home", to: "/home"},
    {id: 2, route_name: "Shop", to: "/shop"},
    {id: 3, route_name: "Blogs", to: "/posts"},
  ],
  SERVICES: [
    {
      id: 1,
      title: "Free Shipping",
      tagline: "From all orders over than 100$",
      image: Images.fastShipping,
    },
    {
      id: 2,
      title: "Free Shipping",
      tagline: "From all orders over than 100$",
      image: Images.fastShipping,
    },
    {
      id: 3,
      title: "Free Shipping",
      tagline: "From all orders over than 100$",
      image: Images.fastShipping,
    },
    {
      id: 4,
      title: "Free Shipping",
      tagline: "From all orders over than 100$",
      image: Images.fastShipping,
    },
  ],
  RESPONSIVE_CAROUSEL_OPTIONS: {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: {max: 4000, min: 1024},
      items: 5,
      slidesToSlide: 2,
    },
    desktop: {
      breakpoint: {max: 1024, min: 800},
      items: 4,
    },
    tablet: {
      breakpoint: {max: 800, min: 464},
      items: 2,
    },
    mobile: {
      breakpoint: {max: 464, min: 0},
      items: 1,
    },
  },
  SHOW_LIST_TYPE: {
    GRID: "grid",
    LIST: "list",
  },
  PAYMENT_METHOD: {
    SHIP_CODE: "SHIP_CODE",
    CARD: "CARD",
    BANKING: "BANKING",
  },
};

export default Data;
