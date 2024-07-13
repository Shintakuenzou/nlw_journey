import { UserRoundPlus, ArrowRight } from "lucide-react";

interface InviteGuestsStepProps {
  openGuestsModal: () => void;
  openConfirmTripModal: () => void;
  emailsToInvite: string[];
}

export function InviteGuestsStep({ emailsToInvite, openConfirmTripModal, openGuestsModal }: InviteGuestsStepProps) {
  return (
    <div className="h-16 bg-zinc-900 p-4 rounded-xl flex items-center gap-3 shadow-shape">
      <button type="button" onClick={openGuestsModal} className="flex gap-2 items-center flex-1 text-left">
        <UserRoundPlus className="size-5 text-zinc-400" />
        {emailsToInvite.length > 0 ? (
          <span className="text-zinc-100 text-lg flex-1">{emailsToInvite.length} pessoa(s) convidada(s)</span>
        ) : (
          <span className="text-zinc-400 text-lg flex-1">Quem estrá na viagem?</span>
        )}
      </button>

      <div className="w-px h-6 bg-zinc-800" />

      <button
        onClick={openConfirmTripModal}
        className="bg-sky-300 text-sky-950 rounded-lg py-2 px-5 font-medium flex items-center gap-2 hover:bg-sky-400 transition-colors"
      >
        Confirmar viagem <ArrowRight className="size-5" />
      </button>
    </div>
  );
}
