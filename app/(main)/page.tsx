import Stats from "@/components/Stats";
import { NextPage } from "next";
import React from "react";

const DashboardPage: NextPage = () => {
  return (
    <div className="min-h-screen space-y-7">
      <Stats />
      <div>Table & Chart</div>
    </div>
  );
};

export default DashboardPage;
