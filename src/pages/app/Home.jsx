import React from "react";
import {Button} from "react-bootstrap";
import Carousel from "react-grid-carousel";
import AppLayout from "../../components/AppLayout";
import Container from "../../components/Container";
import PostItem from "../../components/PostItem";
import ProductItem from "../../components/ProductItem";
import ServiceItem from "../../components/ServiceItem";
import Data from "../../constants/Data";
import {useSelector} from "react-redux";

const Home = () => {
  const {products} = useSelector(state => state.product);
  const {posts} = useSelector(state => state.post);

  return (
    <AppLayout>
      {/* Hero Section */}
      <section
        className="text-center"
        style={{
          backgroundImage: `url("https://images.pexels.com/photos/5528986/pexels-photo-5528986.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")`,
          height: "100vh",
        }}
      >
        <div className="mask" style={{backgroundColor: "rgba(0, 0, 0, 0.7)", height: "100%"}}>
          <div className="d-flex justify-content-center align-items-center h-100">
            <div className="text-white">
              <h1 className="mb-3">AgriShop</h1>
              <h5 className="mb-4">Bringing fresh agricultural products to you.</h5>
              <Button className="btn-lg m-2" href="/#">
                Shop now
              </Button>
            </div>
          </div>
        </div>
      </section>
      {/* Services Section */}
      <Container>
        <div className="row">
          {Data.SERVICES.map((item, index) => (
            <ServiceItem key={index} data={item} />
          ))}
        </div>
      </Container>
      {/* Featured Products Section */}
      <Container className={"bg-primary"}>
        <h4 className="fw-bold text-white mb-3">Featured Products</h4>
        <Carousel cols={4} rows={1} gap={5} autoplay={1500} loop>
          {products.map((item, index) => (
            <Carousel.Item key={index}>
              <ProductItem grid={12} gridLayout data={item} />
            </Carousel.Item>
          ))}
        </Carousel>
      </Container>
      {/* Latest Posts Section */}
      <Container>
        <h4 className="fw-bold text-primary mb-3">Latest Blogs</h4>
        <div className="row">
          {posts.slice(0, 4).map((item, index) => (
            <PostItem grid={3} data={item} gridLayout key={index} />
          ))}
        </div>
      </Container>
    </AppLayout>
  );
};

export default Home;
