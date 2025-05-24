import React from "react";
import PostStrokeRecovery_details from "../components/PostStrokeRecovery_details";
import ScrollToTop from "../components/ScrollTop";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
const PostStrokeRecovery = () => {
  return (
    <>
      <ScrollToTop />
      <Helmet>
        <title>
          Post Stroke Rehabilation at Home in Dubai UAE, Post Stroke Recovery
        </title>
        <meta
          name="description"
          content="Carehub offers expert post-stroke rehabilitation at home in Dubai and UAE. Ensure a smooth post-stroke recovery with personalized stroke rehabilitation services in Dubai designed for your comfort and care."
        />
        <meta
          name="keywords"
          content="Post stroke rehabilation at home in dubai, post stroke recovery in dubai uae, stroke rehabilation in dubai"
        />
        <link
          rel="canonical"
          href="https://www.carehubuae.com/post-stroke-recovery"
        />
      </Helmet>
      <div className="servicepage_banner">
        <Container>
          <h2 className="fs-2 fw-bold text-white">Post Stroke Recovery</h2>
          <ul class="breadcrumb">
            <li>
              <Link to={"/"}>Home</Link>
            </li>
            <li>Post Stroke Recovery</li>
          </ul>
        </Container>
      </div>
      <PostStrokeRecovery_details />
    </>
  );
};

export default PostStrokeRecovery;
