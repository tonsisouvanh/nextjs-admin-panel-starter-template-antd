import { Badge, Button, List, Popover, Typography } from "antd";
import { FaBell } from "react-icons/fa6";
import { formatRelativeTime } from "@/lib/utils";
import Link from "next/link";

const NotificationDropdown = () => {
  // Mock data
  const notifications = {
    data: [
      {
        id: 1,
        title: "Order Shipped",
        message: "Your order #1234 has been shipped.",
        is_read: false,
        created_at: new Date(),
        order_id: 1234,
      },
      {
        id: 2,
        title: "Order Delivered",
        message: "Your order #5678 has been delivered.",
        is_read: true,
        created_at: new Date(),
        order_id: 5678,
      },
    ],
  };
  const isLoading = false;
  const isError = false;
  const isMarkAllAsReadPending = false;

  const handleDeleteNotification = async (id: number) => {
    console.log(`Deleted notification with id: ${id}`);
  };

  const markAllAsReadNotification = async () => {
    console.log("Marked all notifications as read");
  };

  if (isLoading) {
    return <Button loading={isLoading} type="primary" shape="circle" />;
  }

  if (isError) {
    return <Button type="primary" shape="circle" />;
  }

  const notificationContent = (
    <div style={{ width: 300 }} className="max-h-[25rem] overflow-y-scroll">
      <div className="flex items-center justify-between">
        <Typography.Title level={4}>Notifications</Typography.Title>
        <Button
          loading={isMarkAllAsReadPending}
          disabled={notifications?.data.length === 0}
          onClick={() => markAllAsReadNotification()}
          type="link"
          className="text-color-2"
        >
          Mark all as read
        </Button>
      </div>
      {notifications?.data.length === 0 ? (
        <Typography.Text type="secondary">No new notifications</Typography.Text>
      ) : (
        <List
          dataSource={notifications?.data}
          renderItem={(notification) => (
            <List.Item
              key={notification?.id}
              className={`hover:bg-color-2/10d group cursor-pointer`}
            >
              <List.Item.Meta
                title={notification?.title}
                className={`${notification.is_read ? "opacity-50" : ""}`}
                description={
                  <>
                    <Link
                      href={`/orders/order-detail/${notification.order_id}`}
                    >
                      <Typography.Text className="group-hover:underline">
                        {notification.message}
                      </Typography.Text>
                    </Link>
                    <br />
                    <Typography.Text type="secondary">
                      {formatRelativeTime(notification.created_at.toString())}
                    </Typography.Text>
                  </>
                }
              />
              <Button
                onClick={() =>
                  handleDeleteNotification(notification.id as number)
                }
                type="link"
                className="text-color-2"
              >
                Clear
              </Button>
            </List.Item>
          )}
        />
      )}

      <Button type="link" className="text-color-2">
        <Link href="/notifications">View all</Link>
      </Button>
    </div>
  );

  return (
    <Popover content={notificationContent} trigger="click">
      <Button loading={isLoading} type="primary" shape="circle">
        <Badge
          className=""
          count={notifications?.data.filter((n) => !n.is_read).length}
        >
          <FaBell
            className="text-white"
            style={{ fontSize: "24px", cursor: "pointer" }}
          />
        </Badge>
      </Button>
    </Popover>
  );
};

export default NotificationDropdown;
