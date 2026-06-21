"use client";
import React from "react";
import NextLink from "next/link";
import { useRouter, usePathname, useParams, useSearchParams } from "next/navigation";

// Custom Link wrapper that maps `to` to `href`
export const Link = React.forwardRef(({ to, href, ...props }, ref) => {
  const targetHref = to || href || "#";
  
  // Handle external or hash links if needed
  return <NextLink ref={ref} href={targetHref} {...props} />;
});
Link.displayName = "Link";

// Mock Navigate component
export const Navigate = ({ to }) => {
  const router = useRouter();
  React.useEffect(() => {
    router.push(to);
  }, [to, router]);
  return null;
};

// useNavigate mock mapping to Next.js useRouter
export function useNavigate() {
  const router = useRouter();
  return (to, options) => {
    if (options && options.replace) {
      router.replace(to);
    } else {
      router.push(to);
    }
  };
}

// useLocation mock mapping to Next.js usePathname / useSearchParams
export function useLocation() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  return {
    pathname: pathname || "/",
    search: searchParams ? `?${searchParams.toString()}` : "",
    hash: typeof window !== "undefined" ? window.location.hash : "",
    state: null,
  };
}

export { useParams, useSearchParams };

// Mock Helmet component to prevent errors
export const Helmet = ({ children }) => null;
