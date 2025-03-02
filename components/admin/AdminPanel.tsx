"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type AnalyticsData = {
  month: string;
  visits: number;
};

export default function AnalyticsPanel() {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/api/analytics");

        if (!response.ok) {
          throw new Error("Failed to fetch analytics data");
        }

        const data = await response.json();
        setAnalyticsData(data);
      } catch (error) {
        console.error("Error fetching analytics:", error);
        setError("Failed to load analytics data. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  const totalVisits = analyticsData.reduce((sum, item) => sum + item.visits, 0);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Monthly User Visits</CardTitle>
          <CardDescription>
            Track website traffic over the last 6 months
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center items-center h-80">
              <p>Loading analytics data...</p>
            </div>
          ) : error ? (
            <div className="flex justify-center items-center h-80">
              <p className="text-destructive">{error}</p>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={400}>
              <BarChart
                data={analyticsData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="visits" fill="#318CE7" />
              </BarChart>
            </ResponsiveContainer>
          )}
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Visits</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalVisits}</div>
            <p className="text-xs text-muted-foreground">
              Across all pages in the last 6 months
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Month</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {analyticsData.length > 0
                ? analyticsData[analyticsData.length - 1].visits
                : 0}
            </div>
            <p className="text-xs text-muted-foreground">
              Visits in{" "}
              {analyticsData.length > 0
                ? analyticsData[analyticsData.length - 1].month
                : "current month"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Average Monthly
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {analyticsData.length > 0
                ? Math.round(totalVisits / analyticsData.length)
                : 0}
            </div>
            <p className="text-xs text-muted-foreground">
              Average visits per month
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
