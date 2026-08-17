"use client";

import { useRouter } from "next/navigation";
import { ArrowUpDown } from "lucide-react";

/**
 * Sort control for listing pages. Sorting is a URL concern, not local state —
 * changing it navigates, so the server re-runs the query and the result is
 * shareable and back-button friendly.
 */
export default function ListingToolbar({ total, sort = "featured", sortOptions = [], basePath, query = "" }) {
  const router = useRouter();

  const handleSort = (value) => {
    const params = new URLSearchParams();
    if (query) params.set("q", query);
    if (value && value !== "featured") params.set("sort", value);
    const qs = params.toString();
    router.push(qs ? `${basePath}?${qs}` : basePath);
  };

  return (
    <div className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3">
      <p className="text-xs font-semibold text-slate-600">
        <span className="font-black text-slate-900">{total}</span>{" "}
        {total === 1 ? "tool" : "tools"} found
        <span className="ml-2 hidden text-slate-400 sm:inline">· every file downloads free</span>
      </p>

      <div className="flex items-center gap-2">
        <label
          htmlFor="listing-sort"
          className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-500"
        >
          <ArrowUpDown className="h-3.5 w-3.5" /> Sort
        </label>
        <select
          id="listing-sort"
          value={sort}
          onChange={(e) => handleSort(e.target.value)}
          className="cursor-pointer rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700 outline-none transition-colors focus:border-amber-500"
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
