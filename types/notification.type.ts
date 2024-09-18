export type NotificationType = {
  id?: number;
  user_email?: string | null;
  title: string;
  message: string;
  order_code: string;
  order_id: string;
  is_read: boolean;
  trash: boolean;
  created_at: Date;
  updated_at: Date;
  user_id?: number | null;
};
