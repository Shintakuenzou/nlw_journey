import { CheckCircle2, CircleDashed, UserCog } from "lucide-react";
import { Button } from "../../components/button";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../lib/axios";

interface Participant {
  id: string;
  name: string | null;
  email: string;
  is_confirmed: boolean;
}

export function Guest() {
  const { tripId } = useParams();
  const [participants, setParticipants] = useState<Participant[]>([]);

  useEffect(() => {
    api.get(`/trips/${tripId}/participants`).then((response) => setParticipants(response.data.participants));
  }, [tripId]);

  return (
    <div className="space-y-6">
      <h2 className="font-bold text-xl">Convidados</h2>
      <div className="space-y-5">
        {participants?.map((participant, index) => {
          return (
            <div className="flex items-center justify-between gap-4" key={participant.id}>
              <div className="space-y-1.5">
                <span className="block font-medium text-zinc-100">{participant.name ?? `Convidado ${index}`}</span>
                <span className="block text-zinc-400 text-sm truncate">{participant.email}</span>
              </div>

              {participant.is_confirmed ? (
                <CheckCircle2 className="size-5 text-green-300 shrink-0" />
              ) : (
                <CircleDashed className="text-zinc-400 size-5 shrink-0" />
              )}
            </div>
          );
        })}
      </div>
      <Button variant="secondary">
        <UserCog className="size-5" />
        Gerenciar convidados
      </Button>
    </div>
  );
}
