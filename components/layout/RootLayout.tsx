"use client";
import React, { Suspense, useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { RiDashboard3Fill } from "react-icons/ri";

import type { MenuProps } from "antd";
import { Button, Layout, Menu, theme } from "antd";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "../ui/ThemeToggle";
import { FaBoxes } from "react-icons/fa";
import { FaClipboard, FaProductHunt } from "react-icons/fa6";
import Notification from "../ui/NotificationDropdown";
import Loading from "@/app/(main)/loading";
import UserProfileDropdown from "../ui/UserProfileDropdown";
const { Header, Sider, Content } = Layout;
type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}
const items = [
  getItem(<Link href="/">Dashboard</Link>, "/", <RiDashboard3Fill size={20} />),
  getItem("Product", "sub-product", <FaProductHunt size={20} />, [
    getItem(
      <Link href="/product-manage/add-new">Add New Product</Link>,
      "/product-manage/add-new",
    ),
    getItem(
      <Link href="/product-manage">View/Edit Product</Link>,
      "/product-manage",
    ),
  ]),
  getItem("Inventory", "sub-inventory", <FaBoxes size={20} />, [
    getItem(<Link href="/stock-manage">Manage Stock</Link>, "/stock-manage"),
    getItem(
      <Link href="/stock-movement">Stock Movements</Link>,
      "/stock-movement",
    ),
  ]),
  getItem("Orders", "sub-order", <FaClipboard size={20} />, [
    getItem(<Link href="/orders">All Orders</Link>, "/orders"),
  ]),
];

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout>
      <Sider
        style={{
          overflow: "auto",
          height: "100vh",
          position: "sticky",
          left: 0,
          top: 0,
          bottom: 0,
        }}
        trigger={null}
        collapsible
        collapsed={collapsed}
        className="!bg-color-3"
      >
        <div className="flex w-full justify-center p-5">
          {collapsed ? (
            <h1 className="text-2xl font-bold text-color-2">BM</h1>
          ) : (
            <div className="flex flex-col items-center text-2xl font-bold text-color-4">
              {/* BIZ & <span className="text-color-2">Mineral</span> */}
              <span className="text-color-2">Bizgital</span>
              <span className="text-xs text-gray-400">Mineral Inventory</span>
            </div>
          )}
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[pathname]}
          items={items}
          className="!bg-color-3"
        />
      </Sider>
      <Layout>
        <Header
          style={{
            paddingLeft: "10px",
            paddingRight: "10px",
            background: colorBgContainer,
          }}
          className="flex items-center justify-between"
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
          <div className="flex items-center gap-2">
            <Notification />
            <UserProfileDropdown />
            <ThemeToggle />
          </div>
        </Header>
        <Suspense fallback={<Loading />}>
          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {children}
          </Content>
        </Suspense>
      </Layout>
    </Layout>
  );
};

export default RootLayout;
