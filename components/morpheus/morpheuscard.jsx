"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export const MorpheusCard = ({ risk }) => {
  if (!risk) return null;

  const [expanded, setExpanded] = useState(false);

  const {
    category,
    risk_level,
    mechanism,
    observed_effects,
    countermeasures = [],
  } = risk;

  const levelColor = {
    high: "bg-red-500/40 text-red-300 border-red-500/40",
    medium: "bg-yellow-500/30 text-yellow-200 border-yellow-500/30",
    low: "bg-green-500/30 text-green-200 border-green-500/30",
  }[risk_level] || "bg-gray-500/30 text-gray-200 border-gray-500/30";

  return (
    <div
      onClick={() => setExpanded(!expanded)}
      className={`
        relative cursor-pointer w-full h-fit
        bg-white/5 border border-white/20 backdrop-blur-xl rounded-xl p-4
        transition-all duration-300
        hover:border-white/40 hover:scale-[1.01]
      `}
    >
      <div className="mb-2 flex flex-col gap-1">
        <div className="flex items-center justify-between">
          <h3 className="font-technor text-lg text-white tracking-wide">
            {category}
          </h3>
          <span
            className={`px-2 py-0.5 text-xs font-supreme uppercase tracking-wide border rounded-md ${levelColor}`}
          >
            {risk_level}
          </span>
        </div>
        <p className="font-supreme text-sm text-white/70 ">
          {mechanism}
        </p>
      </div>

      {/* Contenido expandible */}
      <div
        className={`transition-all duration-500 ease-in-out overflow-hidden ${
          expanded ? "max-h-[1000px] opacity-100 mt-2" : "max-h-0 opacity-0"
        }`}
      >
        <div>
          <p className="text-sm text-white/90 leading-relaxed font-supreme">
            {observed_effects}
          </p>

          {countermeasures.length > 0 && (
            <ul className="mt-3 space-y-1 text-xs text-white/80 font-supreme list-disc list-inside">
              {countermeasures.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="mt-3 flex justify-end text-white/60 text-xs font-supreme">
        {expanded ? (
          <div className="flex items-center gap-1">
            <ChevronUp size={14} /> Hide details
          </div>
        ) : (
          <div className="flex items-center gap-1">
            <ChevronDown size={14} /> Show details
          </div>
        )}
      </div>
    </div>
  );
};