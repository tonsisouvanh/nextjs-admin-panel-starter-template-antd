import { Axios } from "@/config/axios.config";
import { NotificationType } from "@/types/notification.type";

export type ResponseTypeSingle = {
  status: string;
  message?: string;
  data: NotificationType;
};

export type ResponseTypeMultiple = {
  status: string;
  data: NotificationType[];
  meta: any;
};

// Fetch all notifications with optional pagination
export const fetchAllNotifications = async (page?: number, limit?: number) => {
  const res = await Axios.get<ResponseTypeMultiple>("/notifications", {
    params: {
      page,
      limit,
    },
  });
  return res.data;
};

export const markAsReadNotification = async (id: number) => {
  const res = await Axios.put(`/notifications/${id}/mark-as-read`);
  return res.data;
};

// Fetch a single notification by ID
export const fetchNotificationById = async (id: number) => {
  const res = await Axios.get<ResponseTypeSingle>(`/notifications/${id}`);
  return res.data;
};

// Add a new notification
export const addNotification = async (values: NotificationType) => {
  const res = await Axios.post("/notifications", values, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res.data;
};

// Update an existing notification
export const updateNotification = async (values: NotificationType) => {
  const id = Number(values.id);
  const res = await Axios.put(`/notifications/${id}`, values, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res.data;
};

// Delete a notification by ID
export const deleteNotification = async (id: number) => {
  const res = await Axios.delete(`/notifications/${id}/clear`);
  return res.data;
};

export const markAllAsReadNotification = async () => {
  const res = await Axios.put(`/notifications/mark-all-as-read`);
  return res.data;
};
export const clearAllNotification = async () => {
  const res = await Axios.put(`/notifications/clear-all`);
  return res.data;
};
