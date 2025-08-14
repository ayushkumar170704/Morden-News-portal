import { useEffect, useState } from "react";
import { fetchCurrentWeather } from "../services/weatherAPI";

export default function WeatherWidget() {
  const [city, setCity] = useState(() => localStorage.getItem("wx_city") || "Delhi");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  const load = async (q) => {
    try {
      setLoading(true);
      setErr("");
      const res = await fetchCurrentWeather(q);
      setData(res);
    } catch (e) {
      setErr("City not found or API error");
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load(city);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    const trimmed = city.trim();
    if (!trimmed) return;
    localStorage.setItem("wx_city", trimmed);
    load(trimmed);
  };

  const kph = (ms) => Math.round((ms || 0) * 3.6);
  const iconUrl = data?.weather?.[0]?.icon
    ? `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
    : "";

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 mt-4">
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-200">Weather</h4>
      </div>

      <form onSubmit={onSubmit} className="flex gap-2 mb-3">
        <input
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city (e.g., Delhi)"
          className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 rounded-md text-sm outline-none focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-900"
          aria-label="Weather city input"
        />
        <button
          type="submit"
          className="px-3 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700"
        >
          Search
        </button>
      </form>

      {loading ? (
        <p className="text-sm text-gray-500">Loading weather...</p>
      ) : err ? (
        <p className="text-sm text-red-600">{err}</p>
      ) : data ? (
        <div>
          <div className="flex items-center gap-3 mb-2">
            {iconUrl && <img src={iconUrl} alt="icon" className="w-12 h-12" />}
            <div>
              <div className="text-base font-semibold text-gray-900 dark:text-gray-100">
                {data.name}, {data.sys?.country}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400 capitalize">
                {data.weather?.[0]?.description || "-"}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mt-3">
            <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-3">
              <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {Math.round(data.main?.temp ?? 0)}°C
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                Feels like {Math.round(data.main?.feels_like ?? 0)}°C
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-3">
              <div className="text-sm text-gray-600 dark:text-gray-300">Humidity</div>
              <div className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                {data.main?.humidity ?? 0}%
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-3">
              <div className="text-sm text-gray-600 dark:text-gray-300">Wind</div>
              <div className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                {kph(data.wind?.speed)} km/h
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-3">
              <div className="text-sm text-gray-600 dark:text-gray-300">Visibility</div>
              <div className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                {((data.visibility ?? 0) / 1000).toFixed(1)} km
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-sm text-gray-500">No data</p>
      )}
    </div>
  );
}
