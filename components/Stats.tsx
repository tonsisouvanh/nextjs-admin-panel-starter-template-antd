"use client";
import React, { useMemo } from "react";
import {
  FaProductHunt,
  FaBoxesStacked,
  FaClipboardList,
} from "react-icons/fa6";
import { FaShippingFast } from "react-icons/fa";
import StatCard from "./StatCard";
import { formatPrice } from "@/lib/utils";
import { Skeleton } from "antd";
import ErrorLoadingData from "./ui/ErrorLoadingData";

const Stats = () => {
  // Mock data
  const productQuery = {
    isLoading: false,
    isError: false,
    data: {
      meta: { totalElements: 100 },
      data: [
        { quantity: 5 },
        { quantity: 15 },
        { quantity: 0 },
        { quantity: 20 },
        { quantity: 8 },
      ],
    },
  };

  const productStockQuery = {
    isLoading: false,
    isError: false,
    data: {
      totalStockMovements: 50,
      inStockCount: 30,
      outStockCount: 20,
    },
  };

  const orderQuery = {
    isLoading: false,
    isError: false,
    data: {
      meta: { totalElements: 200 },
      data: [
        { order_amount: "100" },
        { order_amount: "200" },
        { order_amount: "150" },
      ],
    },
  };

  const productStockDataCount = {
    data: {
      totalStockMovements: 50,
      inStockCount: 30,
      outStockCount: 20,
    },
  };

  const isLoading =
    productQuery.isLoading ||
    productStockQuery.isLoading ||
    orderQuery.isLoading;
  const isError =
    productQuery.isError || productStockQuery.isError || orderQuery.isError;

  const { totalProduct, lowStock, normalStock, outOfStock } = useMemo(() => {
    const totalProduct = productQuery.data?.meta.totalElements || 0;
    const lowStock =
      productQuery.data?.data.filter(
        (product: any) =>
          product.quantity <=
            (parseInt(process.env.NEXT_PUBLIC_REORDER_POINT as string) || 10) &&
          product.quantity > 0,
      ).length || 0;
    const normalStock =
      productQuery.data?.data.filter(
        (product: any) =>
          product.quantity >
          (parseInt(process.env.NEXT_PUBLIC_REORDER_POINT as string) || 10),
      ).length || 0;
    const outOfStock =
      productQuery.data?.data.filter(
        (product) => (product.quantity as number) <= 0,
      ).length || 0;

    return { totalProduct, lowStock, normalStock, outOfStock };
  }, [productQuery.data]);

  const totalOrders = orderQuery.data?.meta.totalElements || 0;
  const totalRevenue = useMemo(() => {
    return (
      orderQuery.data?.data.reduce(
        (acc: number, order: any) => acc + parseInt(order.order_amount),
        0,
      ) || 0
    );
  }, [orderQuery.data]);

  if (isLoading) {
    return (
      <div className="grid grid-cols-4 gap-4">
        <Skeleton active />
        <Skeleton active />
        <Skeleton active />
        <Skeleton active />
      </div>
    );
  }

  if (isError) {
    return <ErrorLoadingData />;
  }

  return (
    <div className="">
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Products"
          value={totalProduct}
          icon={<FaProductHunt size={40} />}
          details={[
            { label: "Low", value: lowStock },
            { label: "Normal", value: normalStock },
            { label: "Out of stock", value: outOfStock },
          ]}
          colors="bg-gradient-to-tr from-blue-600 to-blue-400 bg-clip-border text-white shadow-lg shadow-blue-500/40"
        />
        <StatCard
          title="Stock Movement"
          value={productStockDataCount?.data.totalStockMovements}
          icon={<FaBoxesStacked size={40} />}
          details={[
            { label: "IN", value: productStockDataCount?.data.inStockCount },
            { label: "OUT", value: productStockDataCount?.data.outStockCount },
          ]}
          colors="bg-gradient-to-tr from-pink-600 to-pink-400 bg-clip-border text-white shadow-lg shadow-pink-500/40"
        />
        <StatCard
          title="Delivery"
          value={0}
          icon={<FaShippingFast size={40} />}
          details={[
            { label: "Shipped", value: 0 },
            { label: "Pending", value: 0 },
          ]}
          colors="bg-gradient-to-tr from-orange-600 to-orange-400 bg-clip-border text-white shadow-lg shadow-orange-500/40"
        />
        <StatCard
          title="Orders"
          value={totalOrders}
          icon={<FaClipboardList size={40} />}
          details={[{ label: "Revenue", value: formatPrice(totalRevenue) }]}
          colors="bg-gradient-to-tr from-green-600 to-green-400 bg-clip-border text-white shadow-lg shadow-green-500/40"
        />
      </div>
    </div>
  );
};

export default React.memo(Stats);
