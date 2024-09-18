import { Prisma } from "@prisma/client";
import { type ClassValue, clsx } from "clsx";
import { formatDistanceToNow } from "date-fns";
import { formatInTimeZone, toZonedTime } from "date-fns-tz";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const parseStringify = (value: any) => JSON.parse(JSON.stringify(value));

export const convertFileToUrl = (file: File) => URL.createObjectURL(file);

export const formatRelativeTime = (
  dateStr: string,
  timeZone: string = "UTC",
): string => {
  try {
    const date = toZonedTime(dateStr, timeZone);
    return formatDistanceToNow(date, { addSuffix: true });
  } catch (error) {
    console.error("Invalid date string or time zone:", error);
    return "Invalid date";
  }
};

export function encryptKey(passkey: string) {
  return btoa(passkey);
}

export function decryptKey(passkey: string) {
  return atob(passkey);
}

export function getLocalDateTime(
  now: Date = new Date(),
  TimeZone: string = "Asia/Bangkok",
) {
  // Format the time in Laos timezone as ISO 8601 with milliseconds
  const laosTime = formatInTimeZone(now, TimeZone, "yyyy-MM-dd'T'HH:mm:ss.sss");

  return laosTime + "Z"; // Already in the correct format
}

export const handlePrismaError = (
  error: Prisma.PrismaClientKnownRequestError,
) => {
  if (error.code) {
    switch (error.code) {
      case "P2002":
        return { status: 409, message: "Unique constraint error" };
      case "P2014":
        return { status: 400, message: "Invalid ID provided" };
      case "P2003":
        return { status: 400, message: "Foreign key constraint failed" };
      case "P2025":
        return { status: 404, message: "Record not found" };
      default:
        return { status: 500, message: `Unexpected error: ${error.code}` };
    }
  }
  return { status: 500, message: "An unexpected error occurred" };
};

export const formatPrice = (price: number, currency?: string) => {
  if (!currency) {
    // Format the price with commas without currency
    return new Intl.NumberFormat("en-US", {
      style: "decimal",
    }).format(price);
  }
  // Format the price with commas to LAK
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency || "LAK",
  }).format(price);
};

export const formatDate = (dateStr: string | undefined): string => {
  if (!dateStr) return "No Date";
  return dateStr
    .replace(/T|Z/g, (match) => (match === "T" ? " " : ""))
    .replace(/\.\d{3}$/, "");
};

export const requestNotificationPermission = async () => {
  if ("Notification" in window) {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      console.log("Notification permission granted.");
    } else {
      console.log("Notification permission denied.");
    }
  }
};

export const showNotification = (title: string, options: any) => {
  if ("Notification" in window && Notification.permission === "granted") {
    new Notification(title, options);
  }
};

// Extract the reorder point from the environment variable
const REORDER_POINT =
  parseInt(process.env.NEXT_PUBLIC_REORDER_POINT as string) || 10;
// Function to determine the status based on quantity
export const getStatus = (
  quantity: number,
): "success" | "warning" | "error" => {
  if (quantity > REORDER_POINT) {
    return "success";
  } else if (quantity <= 10 && quantity > 0) {
    return "warning";
  } else if (quantity <= 0) {
    return "error";
  } else {
    return "error";
  }
};

// Function to determine the text based on quantity
export const getText = (quantity: number): string => {
  if (quantity > REORDER_POINT) {
    return "Normal";
  } else if (quantity <= 10 && quantity > 0) {
    return "Low";
  } else if (quantity <= 0) {
    return "Out of Stock";
  } else {
    return "Unknown";
  }
};
