import {
  useGetCatStatsQuery,
  useGetStatsQuery,
} from "../../../redux/api/apiSlice";
import { FiShoppingBag } from "react-icons/fi";
import { AiFillProduct } from "react-icons/ai";
import { LuUsers } from "react-icons/lu";
import { IoMdCart } from "react-icons/io";
import { GiTempleGate } from "react-icons/gi";
import { IoCheckmarkDoneCircleSharp } from "react-icons/io5";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const { data, isLoading } = useGetStatsQuery();
  const stats = data?.data;
  const cardData = [
    {
      id: 1,
      name: "total products",
      value: stats?.totalProduct,
      icon: <AiFillProduct className="text-4xl drop-shadow-lg" />,
      color: "bg-accent-color/80",
    },
    {
      id: 2,
      name: "total orders",
      icon: <IoMdCart className="text-4xl drop-shadow-lg" />,
      value: stats?.totalOrders,
      color: "bg-additional-color/80",
    },
    {
      id: 3,
      name: "total sold",
      icon: <GiTempleGate className="text-4xl drop-shadow-lg" />,
      value: stats?.totalSoldItem,
      color: "bg-red-500/80",
    },
    {
      id: 4,
      name: "total users",
      icon: <LuUsers className="text-4xl drop-shadow-lg" />,
      value: stats?.totalUsers,
      color: "bg-purple-500/80",
    },
    {
      id: 5,
      name: "total sales",
      value: stats?.totalSales.toFixed(2),
      icon: <FiShoppingBag className="text-4xl drop-shadow-lg" />,
      color: "bg-success/80",
    },
    {
      id: 6,
      name: "total completed",
      icon: <IoCheckmarkDoneCircleSharp className="text-4xl drop-shadow-lg" />,
      value: stats?.totalCompletedOrder,
      color: "bg-accent/90",
    },
  ];

  return (
    <div>
      <div className="grid grid-cols-1 gap-2 bg-background-color p-4 px-3 capitalize sm:grid-cols-2 sm:gap-6 sm:gap-y-2 md:grid-cols-2 lg:grid-cols-3">
        {cardData.map((stat) => (
          <div
            key={stat.id}
            className={`flex items-center gap-3 rounded-lg p-5 text-white shadow-md ${stat.color} `}
          >
            {/* icon  */}
            <div>{stat.icon}</div>
            <div>
              {isLoading ? (
                <div className="skeleton my-0.5 h-5 w-20 rounded-sm drop-shadow-lg"></div>
              ) : (
                <p className="font-bold drop-shadow-lg">{stat.name}</p>
              )}
              <div className="text-2xl font-bold xl:text-3xl">
                {isLoading ? (
                  <div className="skeleton mt-2 h-6 w-16 rounded-sm"></div>
                ) : (
                  <p className="drop-shadow-lg">{stat.value}</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mx-auto my-4 flex justify-center">
        <BarChartUI />
      </div>
    </div>
  );
}

function BarChartUI() {
  const [sortedCatStates, setsortedCatStates] = useState("");
  const [rearrangedStat, setRearrangedStat] = useState("");
  const { data: catStatsRes } = useGetCatStatsQuery();
  const catStats = catStatsRes?.data;

  useEffect(() => {
    if (catStats !== undefined) {
      const sortCatStats = [...catStatsRes?.data].sort(
        (a, b) => a.countProduct - b.countProduct,
      );
      setsortedCatStates(sortCatStats);
    }
  }, [catStats]);

  useEffect(() => {
    if (sortedCatStates !== "") {
      const middleIndex = Math.floor(sortedCatStates.length / 2);
      const firstHalf = sortedCatStates.slice(middleIndex);

      const secondHalf = sortedCatStates
        .slice(0, middleIndex)
        .sort((a, b) => b.countProduct - a.countProduct);

      const rearrangedData = [...firstHalf, ...secondHalf];

      setRearrangedStat(rearrangedData);
    }
  }, [sortedCatStates]);

  return (
    <ResponsiveContainer width={"100%"} height={400} className="responsive-bar">
      <BarChart
        data={rearrangedStat}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 80,
        }}
      >
        <XAxis
          dataKey="_id"
          angle={-60}
          textAnchor="end"
          tick={{
            fontSize: 11,
            fill: "#333",
          }}
        />

        <Tooltip />

        <Legend verticalAlign="top" />
        <Bar dataKey="countProduct" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
}
