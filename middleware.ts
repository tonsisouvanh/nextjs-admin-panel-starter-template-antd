// Another refactor version
import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { cookies } from "next/headers";

const jwtVerifyApiRoutes = [
  { path: "/api/v1/auth/sign-out", methods: ["POST"] },
  { path: "/api/v1/auth/refresh-token", methods: ["POST"] },
  { path: "/api/v1/auth", methods: ["GET"] },
];

const allowedOrigins = ["*"]; // Add bro mineral domain

const isOriginAllowed = (origin: string) =>
  allowedOrigins.includes(origin) || allowedOrigins.includes("*");
const setCorsHeaders = (response: NextResponse, origin: string) => {
  response.headers.set("Access-Control-Allow-Origin", origin);
  response.headers.set(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS",
  );
  response.headers.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization",
  );
  response.headers.set("Access-Control-Allow-Credentials", "true"); // Ensure credentials are allowed
  return response;
};
// To check if the route path matches the request path
const matchRoute = (incomingPath: string, incomingMethod: string): boolean => {
  const normalizedPath = incomingPath.replace(/\/$/, "").split("?")[0];
  return jwtVerifyApiRoutes.some((route) => {
    const routePath = route.path.replace(/\/$/, "");
    const pathRegex = new RegExp(`^${routePath.replace(/:\w+/g, "\\w+")}$`);
    return (
      pathRegex.test(normalizedPath) && route.methods.includes(incomingMethod)
    );
  });
};

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const origin: string = request.headers.get("Origin") as string;
  const response = NextResponse.next();

  // Handle CORS preflight requests (OPTIONS)
  if (request.method === "OPTIONS") {
    if (isOriginAllowed(origin)) {
      return setCorsHeaders(NextResponse.json({}), origin);
    }
    return NextResponse.json({});
  }

  // Apply CORS headers to all responses if origin is allowed
  if (isOriginAllowed(origin)) {
    setCorsHeaders(response, origin);
  }

  // Get the AccessToken cookie
  const accessTokenCookie = cookies().get("AccessToken");
  // JWT Verification for API routes

  if (matchRoute(pathname, request.method)) {
    if (!accessTokenCookie) {
      return NextResponse.json(
        { message: "Access token is missing" },
        { status: 401 },
      );
    }

    const secret = new TextEncoder().encode(process.env.ACCESS_TOKEN_SECRET);
    const jwt = accessTokenCookie.value;
    try {
      const { payload } = await jwtVerify(jwt, secret, {});
      const headers = new Headers(request.headers);
      headers.set("X-User-Payload", JSON.stringify(payload));
      return NextResponse.next({ request: { headers } });
    } catch (err) {
      return NextResponse.json(
        { status: "Unauthorized", message: "Invalid access token" },
        { status: 403 },
      );
    }
  }

  // Handle protected routes
  // if (pathname === "/") {
  //   if (!accessTokenCookie) {
  //     return NextResponse.redirect(new URL("/sign-in", request.url));
  //   }
  // }

  // // Redirect to admin if logged in and trying to access public pages
  // if (pathname === "/sign-in" || pathname === "/sign-up") {
  //   if (accessTokenCookie) {
  //     return NextResponse.redirect(new URL("/", request.url));
  //   }
  // }
  return response;
}

// export const config = {
//   matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
// };
