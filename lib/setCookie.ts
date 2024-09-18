import { cookies } from "next/headers";

const setCookie = (accessToken: string, refreshToken: string) => {
  const accessTokenExpiry = 12 * 60 * 60 * 1000; // 12 hours
  const refreshTokenExpiry = 7 * 24 * 60 * 60 * 1000; // 7 days

  const setSingleCookie = (name: string, value: string, expiry: number) => {
    cookies().set(name, value, {
      secure: process.env.NEXT_NODE_ENV === "production",
      httpOnly: true,
      expires: new Date(Date.now() + expiry),
      // expires: new Date(getLocalDateTime() + expiry),
      // maxAge: expiry,
      path: "/",
      sameSite: "lax",
    });
  };

  setSingleCookie("AccessToken", accessToken, accessTokenExpiry);
  setSingleCookie("RefreshToken", refreshToken, refreshTokenExpiry);
};

export default setCookie;
