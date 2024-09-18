// Mock data for jwtVerifyApiRoutes
const jwtVerifyApiRoutes = [
  { path: "/api/v1/auth/sign-out", methods: ["POST"] },
  { path: "/api/v1/auth/refresh-token", methods: ["POST"] },
  { path: "/api/v1/auth", methods: ["GET"] },
  { path: "/api/v1/stocks", methods: ["GET", "POST", "DELETE", "PUT"] },
  { path: "/api/v1/stocks/stockId", methods: ["GET", "POST", "DELETE", "PUT"] },
  {
    path: "/api/v1/products/product-stocks/:productId",
    methods: ["GET", "POST", "DELETE", "PUT"],
  },
  {
    path: "/api/v1/products/:productId",
    methods: ["GET", "POST", "DELETE", "PUT"],
  },
  { path: "/api/v1/products", methods: ["GET", "POST", "DELETE", "PUT"] },
  {
    path: "/api/v1/products/bulk-create",
    methods: ["GET", "POST", "DELETE", "PUT"],
  },
  {
    path: "/api/v1/orders/bulk-create",
    methods: ["GET", "POST", "DELETE", "PUT"],
  },
  { path: "/api/v1/orders", methods: ["GET", "POST", "DELETE", "PUT"] },
  {
    path: "/api/v1/orders/:orderId",
    methods: ["GET", "POST", "DELETE", "PUT"],
  },
];

// Function to test
const matchRoute = (incomingPath, incomingMethod) => {
  const normalizedPath = incomingPath.replace(/\/$/, "").split("?")[0];
  return jwtVerifyApiRoutes.some((route) => {
    const routePath = route.path.replace(/\/$/, "");
    const pathRegex = new RegExp(`^${routePath.replace(/:\w+/g, "\\w+")}$`);
    return (
      pathRegex.test(normalizedPath) && route.methods.includes(incomingMethod)
    );
  });
};

// Test cases
const testCases = [
  { path: "/api/v1/auth/sign-out", method: "POST", expected: true },
  { path: "/api/v1/auth/refresh-token", method: "POST", expected: true },
  { path: "/api/v1/auth", method: "GET", expected: true },
  { path: "/api/v1/stocks", method: "GET", expected: true },
  { path: "/api/v1/stocks/stockId", method: "PUT", expected: true },
  {
    path: "/api/v1/products/product-stocks/123",
    method: "DELETE",
    expected: true,
  },
  { path: "/api/v1/products/456", method: "POST", expected: true },
  { path: "/api/v1/products", method: "DELETE", expected: true },
  { path: "/api/v1/products/bulk-create", method: "PUT", expected: true },
  { path: "/api/v1/orders/bulk-create", method: "GET", expected: true },
  { path: "/api/v1/orders", method: "POST", expected: true },
  { path: "/api/v1/orders/789", method: "DELETE", expected: true },
  { path: "/api/v1/non-existent", method: "GET", expected: false },
  { path: "/api/v1/auth/sign-out", method: "GET", expected: false },
  { path: "/api/v1/orders/save-order", method: "POST", expected: false },
];

// Run tests
testCases.forEach(({ path, method, expected }) => {
  const result = matchRoute(path, method);
  console.log(
    `Path: ${path}, Method: ${method}, Expected: ${expected}, Result: ${result}, Passed: ${
      result === expected
    }`
  );
});
