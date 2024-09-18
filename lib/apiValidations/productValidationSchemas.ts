import { z } from "zod";

// Define the schema for bundle product validation
export const BundleProductSchema = z.object({
  bundle_productId: z
    .number({
      required_error: "Bundle Product ID is required",
    })
    .int()
    .refine((val) => val > 0, {
      message: "Bundle product ID must be a positive integer",
    }),
  code: z
    .string()
    .optional()
    .refine((val) => (val?.length as number) > 0, {
      message: "Code must be a non-empty string",
    }),
  name: z.string().min(1, { message: "Name is required" }),
  price: z.string().refine((val) => !isNaN(Number(val)), {
    message: "Price must be a valid number",
  }),
  storage_type: z
    .string()
    .optional()
    .refine((val) => ["pack", "carton"].includes(val || ""), {
      message: "Storage type must be either 'pack' or 'carton'",
    }),
  quantity: z
    .number()
    .int()
    .optional()
    .default(0)
    .refine((val) => val >= 0, {
      message: "Quantity must be a non-negative integer",
    }),
  pack: z
    .number()
    .int()
    .optional()
    .default(1)
    .refine((val) => val > 0, {
      message: "Pack must be a positive integer",
    }),
  images: z
    .string()
    .optional()
    .refine((val) => (val?.length as number) > 0, {
      message: "Images must be a non-empty string",
    }),
  product_id: z
    .number()
    .int()
    .refine((val) => val > 0, {
      message: "Product ID must be a positive integer",
    }),
});
