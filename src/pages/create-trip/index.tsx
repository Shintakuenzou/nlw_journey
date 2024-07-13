import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { InviteGuestsModal } from "./invite-guests-modal";
import { ConfirmTripModal } from "./confirm-trip-modal";
import { DestinationAndDateStep } from "./steps/destination-and-date-step";
import { InviteGuestsStep } from "./steps/invite-guests-step";
import { DateRange } from "react-day-picker";
import { api } from "../../lib/axios";

export function CreateTripPage() {
  const navigate = useNavigate();
  const [isGuestsInputOpen, setIsGuestsInputOpen] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isConfirmTripModalOpen, setIsConfirmTripModalOpen] = useState(false);

  const [destination, setDestination] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [ownerEmail, setOwnerEmail] = useState("");
  const [eventStartAndEndDates, setEventStartAndEndDates] = useState<DateRange | undefined>();

  const [emailsToInvite, setEmailsToinvite] = useState(["felipe.enzou@gmail.com"]);

  function openGuestsInput() {
    setIsGuestsInputOpen(true);
  }

  function closeGuestsInput() {
    setIsGuestsInputOpen(false);
  }

  function openGuestsModal() {
    setIsOpenModal(true);
  }

  function closeGuestModal() {
    setIsOpenModal(false);
  }

  function openConfirmTripModal() {
    setIsConfirmTripModalOpen(true);
  }

  function closeConfirmTripModal() {
    setIsConfirmTripModalOpen(false);
  }

  function addNewEmailToInvite(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const email = data.get("email")?.toString();
    if (!email) {
      return;
    }

    if (emailsToInvite.includes(email)) {
      return;
    }
    setEmailsToinvite([...emailsToInvite, email]);

    event.currentTarget.reset();
  }

  function removeEmailsToInvites(emailToRemove: string) {
    const newEmailList = emailsToInvite.filter((email) => email !== emailToRemove);
    setEmailsToinvite(newEmailList);
  }

  async function createTrip(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log(destination, ownerName, ownerEmail, emailsToInvite, eventStartAndEndDates);

    if (!destination) {
      return;
    }

    if (!eventStartAndEndDates?.from || !eventStartAndEndDates?.to) {
      return;
    }

    if (emailsToInvite.length === 0) {
      return;
    }

    if (!ownerName || !ownerEmail) {
      return;
    }
    console.log("Passou");

    const response = await api.post("/trips", {
      destination,
      starts_at: eventStartAndEndDates.from,
      ends_at: eventStartAndEndDates.to,
      emails_to_invite: emailsToInvite,
      owner_name: ownerName,
      owner_email: ownerEmail,
    });
    console.log(response);

    const { tripId } = response.data;
    navigate(`/trips/${tripId}`);
  }

  return (
    <div className="w-full h-screen flex justify-center items-center bg-pattern bg-no-repeat bg-center">
      <div className="max-w-3xl w-full px-6 text-center space-y-10">
        <div className="flex flex-col items-center gap-3">
          <img src="/logo.svg" alt="Plann.er" />
          <p className="text-zinc-300 text-lg">Convide seus amigos e planeje sua próxima viagem!</p>
        </div>

        <div className="space-y-4">
          <DestinationAndDateStep
            closeGuestsInput={closeGuestsInput}
            isGuestsInputOpen={isGuestsInputOpen}
            openGuestsInput={openGuestsInput}
            setDestination={setDestination}
            eventStartAndEndDates={eventStartAndEndDates}
            setEventStartAndEndDates={setEventStartAndEndDates}
          />

          {isGuestsInputOpen && (
            <InviteGuestsStep emailsToInvite={emailsToInvite} openConfirmTripModal={openConfirmTripModal} openGuestsModal={openGuestsModal} />
          )}
        </div>

        <p className="text-zinc-500 text-sm">
          Ao planejar sua viagem pela plann.er você automaticamente concorda <br />
          com nossos{" "}
          <a className="text-zinc-300 underline" href="#">
            {" "}
            termos de uso
          </a>{" "}
          e{" "}
          <a className="text-zinc-300 underline" href="#">
            políticas de privacidade
          </a>{" "}
          .
        </p>
      </div>

      {isOpenModal && (
        <InviteGuestsModal
          addNewEmailToInvite={addNewEmailToInvite}
          closeGuestModal={closeGuestModal}
          emailsToInvite={emailsToInvite}
          removeEmailsToInvites={removeEmailsToInvites}
        />
      )}

      {isConfirmTripModalOpen && (
        <ConfirmTripModal closeConfirmTripModal={closeConfirmTripModal} createTrip={createTrip} setOwnerName={setOwnerName} setOwnerEmail={setOwnerEmail} />
      )}
    </div>
  );
}
