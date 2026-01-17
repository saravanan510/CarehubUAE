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
          content="Professional post-operative care in Dubai. DHA-licensed nurses for wound care, pain management, and 24/7 recovery support. Ensure a safe and fast recovery at home."
        />
        <meta
          name="keywords"
          content="Post-operative care Dubai, Home nursing after surgery, Surgical wound care UAE, Post-surgical recovery services, Licensed private nurses Dubai."
        />
        <link
          rel="canonical"
          href="https://www.carehubuae.com/post-operative-care-dubai"
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
