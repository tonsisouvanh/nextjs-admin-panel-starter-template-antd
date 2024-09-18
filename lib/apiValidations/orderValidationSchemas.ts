import { z } from "zod";

export const OrderSchema = z.object({
  id: z.string(), // Assuming id is a UUID
  order_code: z.string(),
  order_amount: z.number().positive(),
  payment_status: z.string(),
  shipping_phone: z.string().optional().nullable(),
  shipping_amount: z.number().optional().nullable(),
  shipping_name: z.string().optional().nullable(),
  shipping_province: z.string().optional().nullable(),
  shipping_district: z.string().optional().nullable(),
  shipping_village: z.string().optional().nullable(),
  created_at: z.string().optional().nullable(),
  orderDetails: z.array(
    z.object({
      shop_order_id: z.string(), // Assuming order_id is a UUID
      shop_product_id: z.number().int().positive(),
      quantity: z.number().int().positive(),
      price: z.number(),
      type: z.string().optional().nullable(),
      pack: z.number(),
      gift: z.object({
        normal_250ml_pack: z.number().int().nonnegative(),
        normal_600ml_pack: z.number().int().nonnegative(),
        normal_1500ml_pack: z.number().int().nonnegative(),
        premium_500ml_pack: z.number().int().nonnegative(),
        premium_500ml_carton: z.number().int().nonnegative(),
      }),
    })
  ),
});
