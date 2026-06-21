import React from "react";
import PostOperativeCare_details from "../components/PostOperativeCare_details";
import Container from "react-bootstrap/Container";
import Link from "next/link";

const PostOperativeCare = () => {
  return (
    <>
      <div className="servicepage_banner">
        <Container>
          <h2 className="fs-2 fw-bold text-white">Post Operative Care</h2>
          <ul className="breadcrumb">
            <li>
              <Link href="/">Home</Link>
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