import { MapPin, Calendar, Settings2, ArrowRight, X } from "lucide-react";
import { useState } from "react";
import { DateRange, DayPicker } from "react-day-picker";
import { format } from "date-fns";
import "react-day-picker/dist/style.css";

interface DestinationAndDateStepProps {
  isGuestsInputOpen: boolean;
  closeGuestsInput: () => void;
  openGuestsInput: () => void;
  setDestination: (destionation: string) => void;
  eventStartAndEndDates: DateRange | undefined;
  setEventStartAndEndDates: (dates: DateRange | undefined) => void;
}

export function DestinationAndDateStep({
  closeGuestsInput,
  isGuestsInputOpen,
  openGuestsInput,
  setDestination,
  eventStartAndEndDates,
  setEventStartAndEndDates,
}: DestinationAndDateStepProps) {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  function openDatePicker() {
    setIsDatePickerOpen(true);
  }

  function closeDatePicker() {
    setIsDatePickerOpen(false);
  }

  const displayedDate =
    eventStartAndEndDates && eventStartAndEndDates.from && eventStartAndEndDates.to
      ? `${format(eventStartAndEndDates.from, "d ' de ' LLL")} até ${format(eventStartAndEndDates.to, "d ' de ' LLL")}`
      : null;

  return (
    <div className="h-16 bg-zinc-900 p-4 rounded-xl flex items-center gap-3 shadow-shape">
      <div className="flex gap-2 items-center flex-1">
        <MapPin className="size-5 text-zinc-400" />
        <input
          disabled={isGuestsInputOpen}
          type="text"
          placeholder="Para onde você vai?"
          className="bg-transparent text-lg placeholder:text-zinc-400 outline-none flex-1"
          onChange={(event) => setDestination(event.target.value)}
        />
      </div>

      <button onClick={openDatePicker} disabled={isGuestsInputOpen} className="flex gap-2 items-center text-left w-[240px]">
        <Calendar className="size-5 text-zinc-400" />
        <span className="text-lg text-zinc-400 w-40 flex-1">{displayedDate || "Quanado?"}</span>
      </button>

      {isDatePickerOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
          <div className="rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Selecione a data</h2>

                <button type="button" onClick={closeDatePicker}>
                  <X className="size-5 text-zinc-400" />
                </button>
              </div>
            </div>

            <DayPicker mode="range" selected={eventStartAndEndDates} onSelect={setEventStartAndEndDates} />
          </div>
        </div>
      )}

      <div className="w-px h-6 bg-zinc-800" />

      {isGuestsInputOpen ? (
        <button
          onClick={closeGuestsInput}
          type="button"
          className="bg-zinc-800 text-zinc-200 rounded-lg py-2 px-5 font-medium flex items-center gap-2 hover:bg-zinc-700 transition-colors"
        >
          Alterar local/data
          <Settings2 />
        </button>
      ) : (
        <button
          onClick={openGuestsInput}
          className="bg-sky-300 text-sky-950 rounded-lg py-2 px-5 font-medium flex items-center gap-2 hover:bg-sky-400 transition-colors"
        >
          Continuar <ArrowRight className="size-5" />
        </button>
      )}
    </div>
  );
}
