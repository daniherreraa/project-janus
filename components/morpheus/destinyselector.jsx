"use client";

import * as React from "react";
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const destinations = [
  {
    value: "mars",
    label: "Mars",
  },
  {
    value: "moon",
    label: "Moon",
  },
];

export function DestinySelector() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("moon");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-fit h-fit justify-between ps-0 pe-0
            font-technor font-semibold text-8xl text-white hover:text-white
            border-0 shadow-none rounded-none 
            bg-0 hover:bg-white/10"
        >
          {value
            ? destinations.find((destination) => destination.value === value)
                ?.label
            : "Select destination..."}
          <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0 border-0 bg-transparent rounded-none shadow-none font-technor font-semibold">
        <Command className="bg-white/20 rounded-none shadown-none">
          <CommandList>
            <CommandEmpty>No destination found.</CommandEmpty>
            <CommandGroup>
              {destinations.map((destination) => (
                <CommandItem
                  className="text-white p-0 rounded-none data-[selected=true]:bg-white/30 data-[selected=true]:text-white"
                  key={destination.value}
                  value={destination.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  <CheckIcon
                    className={cn(
                      "mr-2 h-4 w-4 text-white",
                      value === destination.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {destination.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
