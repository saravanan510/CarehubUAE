import React from "react";
import PostStrokeRecovery_details from "../components/PostStrokeRecovery_details";
import Container from "react-bootstrap/Container";
import Link from "next/link";

const PostStrokeRecovery = () => {
  return (
    <>
      <div className="servicepage_banner">
        <Container>
          <h2 className="fs-2 fw-bold text-white">Post Stroke Recovery</h2>
          <ul className="breadcrumb">
            <li>
              <Link href="/">Home</Link>
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