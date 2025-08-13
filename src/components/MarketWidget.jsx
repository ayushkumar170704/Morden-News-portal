import { useEffect, useMemo, useState } from "react";

// Utility: format numbers
const fmt = (v) => (typeof v === "number" ? v.toLocaleString() : v);

// Decorative grid background
function GridBG({ width = 200, height = 64 }) {
  return (
    <svg
      className="absolute inset-0"
      width="100%"
      height="100%"
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
    >
      <defs>
        <pattern id="grid" width="20" height="16" patternUnits="userSpaceOnUse">
          <path
            d="M 20 0 L 0 0 0 16"
            fill="none"
            stroke="rgba(0,0,0,0.05)"
            strokeWidth="1"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid)" />
    </svg>
  );
}

function Sparkline({
  data = [],
  width = 220,
  height = 64,
  stroke = "#2563eb",
  fill = "rgba(37, 99, 235, 0.12)",
}) {
  if (!data.length) return null;
  const padding = 8;
  const W = width - padding * 2;
  const H = height - padding * 2;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const norm = data.map((v) => (max === min ? 0.5 : (v - min) / (max - min)));

  const points = norm.map((v, i) => {
    const x = padding + (i / (data.length - 1)) * W;
    const y = padding + (1 - v) * H;
    return [x, y];
  });

  const dStroke = points.reduce((d, [x, y], i, arr) => {
    if (i === 0) return `M ${x} ${y}`;
    const [px, py] = arr[i - 1];
    const cx = (px + x) / 2;
    const cy = (py + y) / 2;
    return d + ` Q ${px} ${py}, ${cx} ${cy}`;
  }, "");

  const dFill = `${dStroke} L ${padding + W} ${padding + H} L ${padding} ${
    padding + H
  } Z`;

  const last = data[data.length - 1];
  const prev = data[data.length - 2] ?? last;
  const up = last >= prev;

  const gradientId = useMemo(
    () => `grad-${Math.random().toString(36).slice(2)}`,
    []
  );

  return (
    <div className="relative flex items-center gap-4">
      <div className="relative w-full">
        <svg
          width="100%"
          height={height}
          viewBox={`0 0 ${width} ${height}`}
          className="block"
        >
          <defs>
            <linearGradient id={gradientId} x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor={fill} />
              <stop offset="100%" stopColor="rgba(0,0,0,0)" />
            </linearGradient>
          </defs>
          <GridBG width={width} height={height} />
          <path d={dFill} fill={`url(#${gradientId})`} />
          <path
            d={dStroke}
            fill="none"
            stroke={stroke}
            strokeWidth="2.2"
            strokeLinecap="round"
          />
        </svg>
      </div>
      <div className="shrink-0 text-right">
        <div
          className={`text-sm font-semibold ${
            up ? "text-green-600" : "text-red-600"
          }`}
        >
          {up ? "▲" : "▼"} {fmt(last)}
        </div>
        <div className="text-[11px] text-gray-500">Prev: {fmt(prev)}</div>
      </div>
    </div>
  );
}

function StatCard({ title, children }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-4">
      <h4 className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-3">
        {title}
      </h4>
      {children}
    </div>
  );
}

export default function MarketWidget() {
  const [gold, setGold] = useState([64650, 64720, 64680, 64840, 64950, 64920, 65010]);
  const [btc, setBtc] = useState([62000, 61850, 62500, 63050, 62800, 63400, 64050]);
  const [usdInr, setUsdInr] = useState([83.1, 83.2, 83.15, 83.22, 83.18, 83.25, 83.27]);
  const [eurUsd, setEurUsd] = useState([1.083, 1.081, 1.085, 1.087, 1.086, 1.089, 1.09]);
  const [gbpUsd, setGbpUsd] = useState([1.274, 1.272, 1.276, 1.278, 1.277, 1.279, 1.281]);

  useEffect(() => {
    const interval = setInterval(() => {
      const next = (arr, amp = 0.3, dec = 2) => {
        const last = arr[arr.length - 1];
        const delta = (Math.random() - 0.5) * amp;
        const val = +(last + delta).toFixed(dec);
        return [...arr.slice(1), val];
      };
      setGold((a) => next(a, 40, 0));
      setBtc((a) => next(a, 450, 0));
      setUsdInr((a) => next(a, 0.05, 2));
      setEurUsd((a) => next(a, 0.0025, 3));
      setGbpUsd((a) => next(a, 0.0025, 3));
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <aside className="space-y-5">
      <StatCard title="Gold (24K) INR/10g">
        <Sparkline data={gold} stroke="#f59e0b" fill="rgba(245, 158, 11, 0.16)" />
      </StatCard>
      <StatCard title="Bitcoin (BTC/USD)">
        <Sparkline data={btc} stroke="#f43f5e" fill="rgba(244, 63, 94, 0.16)" />
      </StatCard>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <StatCard title="USD → INR">
          <Sparkline data={usdInr} stroke="#2563eb" fill="rgba(37, 99, 235, 0.14)" />
        </StatCard>
        <StatCard title="EUR → USD">
          <Sparkline data={eurUsd} stroke="#10b981" fill="rgba(16, 185, 129, 0.14)" />
        </StatCard>
        <StatCard title="GBP → USD">
          <Sparkline data={gbpUsd} stroke="#7c3aed" fill="rgba(124, 58, 237, 0.14)" />
        </StatCard>
      </div>
    </aside>
  );
}
