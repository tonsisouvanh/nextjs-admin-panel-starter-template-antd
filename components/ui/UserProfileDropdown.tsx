import React, { useState } from "react";
import type { MenuProps } from "antd";
import { Button, Dropdown } from "antd";
import { FaUserCircle } from "react-icons/fa";
import ModalConfirmSignOut from "./ModalConfirmSignOut";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";

const UserProfileDropdown = () => {
  const [open, setOpen] = useState(false);

  const showModal = () => {
    setOpen(true);
  };
  const { useSignout } = useAuth();
  const { mutate: signOutMutate, isPending } = useSignout();

  const handleLogout = () => {
    signOutMutate();
  };
  const items: MenuProps["items"] = [
    {
      key: "0",
      label: <Link href="/user/user-profile">Profile</Link>,
    },
    {
      key: "1",
      label: <a href="/settings">Settings</a>,
    },
    {
      type: "divider",
    },
    {
      key: "3",
      danger: true,
      label: <span onClick={showModal}>Logout</span>,
    },
  ];

  return (
    <>
      <ModalConfirmSignOut
        open={open}
        setOpen={setOpen}
        handleLogout={handleLogout}
        isPending={isPending}
      />
      <Dropdown menu={{ items }} className="" trigger={["click"]}>
        <Button
          icon={<FaUserCircle className="dtext-color-2 text-2xl" />}
          type="primary"
          shape="circle"
          onClick={(e) => e.preventDefault()}
        ></Button>
      </Dropdown>
    </>
  );
};

export default UserProfileDropdown;
