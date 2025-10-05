"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const MorpheusCard = ({ item, type }) => {
  const getBadgeStyle = (level) => {
    switch (level) {
      case "high":
        return "border-red-500/60 text-red-200 bg-red-500/30";
      case "medium":
        return "border-yellow-400/60 text-yellow-200 bg-yellow-400/10";
      case "low":
        return "border-green-400/60 text-green-200 bg-green-400/10";
      default:
        return "border-white/40 text-white/70 bg-white/10";
    }
  };

  const shortText = (text, limit = 160) =>
    text?.length > limit ? text.slice(0, limit) + "..." : text;

  let previewText = "";
  if (type === "risk") previewText = item.mechanism || "";
  else if (type === "plant") previewText = item.impact || "";
  else if (type === "research") previewText = item;

  const title = item.category || "Research Topic";
  const badge = getBadgeStyle(item?.risk_level);

  return (
    <Card
      className={`h-fit bg-white/10 border border-white/30 hover:border-white/50 
       backdrop-blur-[150px] rounded-lg overflow-hidden p-3 transition-all hover:scale-[1.02] cursor-pointer`}
    >
      <CardHeader className="p-0">
        <div className="flex items-center justify-between">
          <CardTitle className="font-technor font-semibold text-white text-base">
            {title}
          </CardTitle>

          {type === "risk" && (
            <div
              className={`px-2 py-[2px] text-[10px] font-technor uppercase tracking-wide 
              border rounded-full ${badge}`}
            >
              {item.risk_level}
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className="p-0 -mt-2 font-supreme text-white/80 text-sm leading-relaxed">
        <p>{shortText(previewText)}</p>
      </CardContent>
    </Card>
  );
};
