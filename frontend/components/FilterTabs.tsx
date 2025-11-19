import { FILTER_TABS } from "@/utils/constants";
import { Dispatch, SetStateAction } from "react";

export default function FilterTabs({
  activeFilter,
  onFilterChange,
  taskCounts,
}: {
  activeFilter: "all" | "pending" | "in-progress" | "completed";
  onFilterChange: Dispatch<
    SetStateAction<"all" | "pending" | "in-progress" | "completed">
  >;
  taskCounts: { [key: string]: number };
}) {
  return (
    <div className="border-b border-gray-200">
      <nav className="flex space-x-4 overflow-x-auto" aria-label="Tabs">
        {FILTER_TABS.map((tab) => {
          const isActive = activeFilter === tab.id;
          const count = taskCounts[tab.id] || 0;

          return (
            <button
              key={tab.id}
              onClick={() =>
                onFilterChange(
                  tab.id as "all" | "pending" | "in-progress" | "completed"
                )
              }
              className={`
                whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors
                ${
                  isActive
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }
              `}
            >
              {tab.label}
              <span
                className={`
                  ml-2 py-0.5 px-2 rounded-full text-xs font-medium
                  ${
                    isActive
                      ? "bg-blue-100 text-blue-600"
                      : "bg-gray-100 text-gray-600"
                  }
                `}
              >
                {count}
              </span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
