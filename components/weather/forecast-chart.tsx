"use client";

import { memo, useMemo } from "react";
import dynamic from "next/dynamic";
import type { HourlyForecast } from "@/types/weather";
import { formatHour, celsiusToFahrenheit } from "@/lib/utils";
import GlassCard from "@/components/ui/glass-card";
import AnimatedContainer from "@/components/ui/animated-container";

const LineChart = dynamic(
  () => import("recharts").then((mod) => mod.LineChart),
  { ssr: false }
);

const Line = dynamic(
  () => import("recharts").then((mod) => mod.Line),
  { ssr: false }
);

const XAxis = dynamic(
  () => import("recharts").then((mod) => mod.XAxis),
  { ssr: false }
);

const YAxis = dynamic(
  () => import("recharts").then((mod) => mod.YAxis),
  { ssr: false }
);

const Tooltip = dynamic(
  () => import("recharts").then((mod) => mod.Tooltip),
  { ssr: false }
);

const ResponsiveContainer = dynamic(
  () => import("recharts").then((mod) => mod.ResponsiveContainer),
  { ssr: false }
);

const CartesianGrid = dynamic(
  () => import("recharts").then((mod) => mod.CartesianGrid),
  { ssr: false }
);

const ReferenceLine = dynamic(
  () => import("recharts").then((mod) => mod.ReferenceLine),
  { ssr: false }
);

interface ForecastChartProps {
  data: HourlyForecast;
}

interface ChartDataPoint {
  originalTime: string;
  date: string;
  hour: number;
  time: string;
  temp: number;
  precip: number;
  wind: number;
}

const ForecastChart = memo(function ForecastChart({ data }: ForecastChartProps) {
  const chartData: ChartDataPoint[] = useMemo(() => {
    const today = new Date().toISOString().split("T")[0];

    return data.time
      .map((t, i) => ({
        originalTime: t,
        date: t.split("T")[0],
        hour: new Date(t).getHours(),
        time: formatHour(t),
        temp: Math.round(celsiusToFahrenheit(data.temperature2m[i])),
        precip: data.precipitationProbability[i],
        wind: data.windSpeed10m[i],
      }))
      .filter((item) => item.date === today)
      .slice(0, 24);
  }, [data]);

  const currentHour = new Date().getHours();

  const currentHourIndex = chartData.findIndex(
    (item) => item.hour === currentHour
  );

  return (
    <AnimatedContainer delay={0.5}>
      <GlassCard className="p-4 md:p-6">
        <p className="text-xs font-medium text-white/50 uppercase tracking-widest mb-4">
          Today&apos;s Hourly Forecast
        </p>

        <div className="h-64">
          <ResponsiveContainer width="100%" height={260}>
            <LineChart
              data={chartData}
              margin={{ top: 8, right: 8, left: 8, bottom: 0 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(255,255,255,0.06)"
                vertical={false}
              />

              <XAxis
                dataKey="time"
                tick={{
                  fill: "rgba(255,255,255,0.4)",
                  fontSize: 10,
                }}
                axisLine={false}
                tickLine={false}
                interval={2}
              />

              <YAxis
                tick={{
                  fill: "rgba(255,255,255,0.4)",
                  fontSize: 11,
                }}
                axisLine={false}
                tickLine={false}
                domain={["dataMin - 3", "dataMax + 3"]}
                tickFormatter={(v: number) => `${v}°F`}
                width={45}
              />

              <Tooltip
                contentStyle={{
                  background: "rgba(15,23,42,0.9)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "12px",
                  backdropFilter: "blur(12px)",
                  color: "#fff",
                  fontSize: "12px",
                }}
                formatter={(value, name) => {
                  if (name === "temp") {
                    return [`${Number(value)}°F`, "Temperature"];
                  }

                  return [value, name];
                }}
                labelStyle={{
                  color: "rgba(255,255,255,0.6)",
                }}
              />

              {/* Current Time Indicator */}
              {currentHourIndex !== -1 && (
                <ReferenceLine
                  x={chartData[currentHourIndex]?.time}
                  stroke="rgba(255,255,255,0.35)"
                  strokeDasharray="4 4"
                  label={{
                    value: "Now",
                    position: "insideTop",
                    fill: "rgba(255,255,255,0.7)",
                    fontSize: 11,
                  }}
                />
              )}

              <Line
                type="monotone"
                dataKey="temp"
                stroke="rgba(250,250,250,0.9)"
                strokeWidth={2}
                activeDot={{
                  r: 4,
                  fill: "#fff",
                  stroke: "rgba(250,250,250,0.3)",
                  strokeWidth: 6,
                }}
                dot={(props: any) => {
                  const isCurrentHour =
                    props.payload.hour === currentHour;

                  if (!isCurrentHour) return <></>;

                  return (
                    <circle
                      cx={props.cx}
                      cy={props.cy}
                      r={6}
                      fill="#fff"
                      stroke="rgba(255,255,255,0.25)"
                      strokeWidth={10}
                    />
                  );
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </GlassCard>
    </AnimatedContainer>
  );
});

export default ForecastChart;