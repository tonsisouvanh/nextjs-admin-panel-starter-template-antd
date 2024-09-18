import React from "react";
import { Card, Typography } from "antd";
import { cn } from "@/lib/utils";
const { Text } = Typography;
interface StatCardProps {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  details?: { label: string; value: number | string }[];
  colors?: string;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  details,
  colors,
}) => (
  <Card className="relative shadow-md" bordered={true}>
    <div className="p-6 text-right">
      <Text className="font-medium text-base whitespace-nowrap">{title}</Text>
      <h4 className="mt-2 text-3xl font-bold">{value}</h4>
    </div>
    {details && (
      <div className="flex flex-wrap justify-between border-t border-gray-200 p-4">
        {details.map((detail, index) => (
          <Text key={index} className="text-sm">
            {detail.label}:{" "}
            <span className="font-semibold">{detail.value}</span>
          </Text>
        ))}
      </div>
    )}
    <div
      className={cn(
        "absolute left-0 -top-2 mx-4 -mt-4 grid h-16 w-16 place-items-center overflow-hidden rounded-xl",
        colors
      )}
    >
      {icon}
    </div>
  </Card>
);

export default StatCard;
