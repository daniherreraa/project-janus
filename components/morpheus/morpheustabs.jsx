"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function MorpheusTabs({ data, renderSection }) {
  const [activeTab, setActiveTab] = useState("human_risks");

  const tabBase =
    "truncate transition-all duration-300 text-xs sm:text-sm uppercase font-technor font-semibold tracking-wide text-white/70 " +
    "data-[state=active]:text-white data-[state=active]:bg-white/20 " +
    "hover:text-white border border-transparent data-[state=active]:border-white/40 " +
    "rounded-md backdrop-blur-md";

  // Configura el ancho dinámico
  const getWidthClass = (tab) => {
    if (activeTab === tab) return "flex-[2] sm:flex-[1.5] px-3 sm:px-5"; // la activa se expande
    return "flex-1 px-2 sm:px-3"; // las demás más compactas
  };

  return (
    <Tabs
      defaultValue="human_risks"
      value={activeTab}
      onValueChange={setActiveTab}
      className="w-full"
    >
      {/* Tabs header */}
      <TabsList
        className="flex w-full justify-between items-center gap-2 sm:gap-3 mb-6 bg-white/5 backdrop-blur-xl p-1 rounded-lg border border-white/20"
      >
        <TabsTrigger
          value="human_risks"
          className={`${tabBase} ${getWidthClass("human_risks")}`}
        >
          Human Risks
        </TabsTrigger>

        <TabsTrigger
          value="plants"
          className={`${tabBase} ${getWidthClass("plants")}`}
        >
          Plants & Microbes
        </TabsTrigger>

        <TabsTrigger
          value="research"
          className={`${tabBase} ${getWidthClass("research")}`}
        >
          Research
        </TabsTrigger>
      </TabsList>

      {/* Tabs content */}
      <TabsContent value="human_risks">
        {renderSection("Human Risks", data?.human_risks, "human_risks", "risk")}
      </TabsContent>

      <TabsContent value="plants">
        {renderSection(
          "Plants and Microbes",
          data?.plant_and_microbe_factors,
          "plants",
          "plant"
        )}
      </TabsContent>

      <TabsContent value="research">
        {renderSection(
          "Research Opportunities",
          data?.research_opportunities,
          "research",
          "research"
        )}
      </TabsContent>
    </Tabs>
  );
}
