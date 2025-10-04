"use client"

import * as React from "react"
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

const destinations = [
  {
    value: "mars",
    label: "Mars",
  },
  {
    value: "moon",
    label: "Moon",
  },
]

export function DestinySelector() {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("moon")

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] h-fit justify-between
            font-technor font-semibold text-white hover:text-white
            border-0 shadow-none rounded-none p-0 
            bg-0 hover:bg-white/30"
        >
          {value
            ? destinations.find((destination) => destination.value === value)?.label
            : "Select destination..."}
          <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-[200px] p-0 border-0 bg-transparent rounded-none shadow-none font-technor font-semibold">
        <Command className="bg-white/40 rounded-none shadown-none">
          <CommandList>
            <CommandEmpty>No destination found.</CommandEmpty>
            <CommandGroup>
              {destinations.map((destination) => (
                <CommandItem
                  className="text-white hover:text-white hover:bg-white/30 active:bg-white/30"
                  key={destination.value}
                  value={destination.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue)
                    setOpen(false)
                  }}
                >
                  <CheckIcon
                    className={cn(
                      "mr-2 h-4 w-4",
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
  )
}