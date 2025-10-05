"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function MorpheusTabs({ data, renderSection }) {
  const tabTriggerBase =
    "px-3 m-0 rounded-none leading-0 font-technor font-semibold text-white/80 text-sm uppercase tracking-wide " +
    "border-x border-white/40 border-y-0 " +
    "data-[state=active]:text-white data-[state=active]:bg-white/40 backdrop-blur-2xl";

  return (
    <Tabs defaultValue="human_risks" className="w-full">
      {/* Tab headers */}
      <TabsList className="flex justify-start space-x-3 mb-6 border-b border-white/20 bg-transparent rounded-none">
        <TabsTrigger value="human_risks" className={tabTriggerBase}>
          Human Risks
        </TabsTrigger>

        <TabsTrigger value="plants" className={tabTriggerBase}>
          Plants & Microbes
        </TabsTrigger>

        <TabsTrigger value="research" className={tabTriggerBase}>
          Research Opportunities
        </TabsTrigger>
      </TabsList>

      {/* Tab contents */}
      <TabsContent value="human_risks" className="mt-4">
        {renderSection("Human Risks", data?.human_risks, "human_risks", "risk")}
      </TabsContent>

      <TabsContent value="plants" className="mt-4">
        {renderSection(
          "Plants and Microbes",
          data?.plant_and_microbe_factors,
          "plants",
          "plant"
        )}
      </TabsContent>

      <TabsContent value="research" className="mt-4">
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
