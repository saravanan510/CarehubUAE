import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Add authentication or redirect hooks here in the future
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
