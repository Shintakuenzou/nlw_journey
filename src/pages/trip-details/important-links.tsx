import { Link2, Plus } from "lucide-react";

export function ImportantLinks() {
  return (
    <div className="space-y-6">
      <h2 className="font-bold text-xl">Links importantes</h2>

      <div className="space-y-5">
        <div className="flex items-center justify-between gap-4">
          <div className="space-y-1.5">
            <span className="block font-medium text-zinc-100">Reserva do AirBnB</span>
            <a href="#" className="block text-zinc-400 text-xs truncate hover:text-zinc-300">
              https://www.airbnb.com.br/rooms/104700023123123123123123123123
            </a>
          </div>
          <Link2 className="text-zinc-400 size-5 shrink-0" />
        </div>
        <div className="flex items-center justify-between gap-4">
          <div className="space-y-1.5">
            <span className="block font-medium text-zinc-100">Reserva do AirBnB</span>
            <a href="#" className="block text-zinc-400 text-xs truncate hover:text-zinc-300">
              https://www.airbnb.com.br/rooms/104700023123123123123123123123
            </a>
          </div>
          <Link2 className="text-zinc-400 size-5 shrink-0" />
        </div>
      </div>

      <button
        type="button"
        className="bg-zinc-800 w-full h-11 text-zinc-200 rounded-lg px-5 font-medium flex justify-center items-center gap-2 hover:bg-zinc-700 transition-colors"
      >
        <Plus className="size-5" />
        Alterar local/data
      </button>
    </div>
  );
}
