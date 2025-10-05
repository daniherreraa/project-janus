"use client";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";

export function MorpheusCollapsibles({ data, renderSection }) {
  return (
    <div className="pb-10 space-y-3">
      {/* Human Risks - open by default */}
      <Collapsible defaultOpen={true}>
        <CollapsibleTrigger className="group w-full flex justify-between items-center bg-white/10 hover:bg-white/20 transition rounded-lg px-4 py-2 cursor-pointer">
          <h2 className="font-technor font-semibold text-lg text-white">
            Human Risks
          </h2>
          <ChevronDown
            className="text-white/70 transition-transform duration-300 group-data-[state=open]:rotate-180"
            size={18}
          />
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-4">
          {renderSection(
            "Human Risks",
            data?.human_risks,
            "human_risks",
            "risk"
          )}
        </CollapsibleContent>
      </Collapsible>

      {/* Plants and Microbes */}
      <Collapsible>
        <CollapsibleTrigger className="group w-full flex justify-between items-center bg-white/10 hover:bg-white/20 transition rounded-lg px-4 py-2 cursor-pointer">
          <h2 className="font-technor font-semibold text-lg text-white">
            Plants and Microbes
          </h2>
          <ChevronDown
            className="text-white/70 transition-transform duration-300 group-data-[state=open]:rotate-180"
            size={18}
          />
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-4">
          {renderSection(
            "Plants and Microbes",
            data?.plant_and_microbe_factors,
            "plants",
            "plant"
          )}
        </CollapsibleContent>
      </Collapsible>

      {/* Research Opportunities */}
      <Collapsible>
        <CollapsibleTrigger className="group w-full flex justify-between items-center bg-white/10 hover:bg-white/20 transition rounded-lg px-4 py-2 cursor-pointer">
          <h2 className="font-technor font-semibold text-lg text-white">
            Research Opportunities
          </h2>
          <ChevronDown
            className="text-white/70 transition-transform duration-300 group-data-[state=open]:rotate-180"
            size={18}
          />
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-4">
          {renderSection(
            "Research Opportunities",
            data?.research_opportunities,
            "research",
            "research"
          )}
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
