import React from "react";
import PostOperativeCare_details from "../components/PostOperativeCare_details";
import ScrollToTop from "../components/ScrollTop";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
const PostOperativeCare = () => {
  return (
    <>
      <ScrollToTop />
      <Helmet>
        <title>
          Post Operative Nursing Care at Home Dubai, Post Surgery Home Care
        </title>
        <meta
          name="description"
          content="Experience seamless post-operative care with Carehub Healthcare. Our dedicated nurses offer professional care and monitoring in the comfort of your home in Dubai."
        />
        <meta
          name="keywords"
          content="Post Operative Care at Home in Dubai, Post Operative Nursing Care in Dubai, Post Operative Care Dubai, Post Surgery Home Care in Dubai"
        />
        <link
          rel="canonical"
          href="https://www.carehubuae.com/post-operative-care"
        />
      </Helmet>
      <div className="servicepage_banner">
        <Container>
          <h2 className="fs-2 fw-bold text-white">Post Operative Care</h2>
          <ul class="breadcrumb">
            <li>
              <Link to={"/"}>Home</Link>
            </li>
            <li>Post Operative Care</li>
          </ul>
        </Container>
      </div>
      <PostOperativeCare_details />
    </>
  );
};

export default PostOperativeCare;
