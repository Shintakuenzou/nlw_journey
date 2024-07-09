import { MapPin, Calendar, ArrowRight, UserRoundPlus, Settings2, X, AtSign, Plus } from "lucide-react";
import { FormEvent, useState } from "react";

export function App() {
  const [isGuestsInputOpen, setIsGuestsInputOpen] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);

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

  return (
    <div className="w-full h-screen flex justify-center items-center bg-pattern bg-no-repeat bg-center">
      <div className="max-w-3xl w-full px-6 text-center space-y-10">
        <div className="flex flex-col items-center gap-3">
          <img src="/logo.svg" alt="Plann.er" />
          <p className="text-zinc-300 text-lg">Convide seus amigos e planeje sua próxima viagem!</p>
        </div>

        <div className="space-y-4">
          <div className="h-16 bg-zinc-900 p-4 rounded-xl flex items-center gap-3 shadow-shape">
            <div className="flex gap-2 items-center flex-1">
              <MapPin className="size-5 text-zinc-400" />
              <input disabled={isGuestsInputOpen} type="text" placeholder="Para onde você vai?" className="bg-transparent text-lg placeholder:text-zinc-400 outline-none flex-1" />
            </div>

            <div className="flex gap-2 items-center">
              <Calendar className="size-5 text-zinc-400" />
              <input disabled={isGuestsInputOpen} type="text" placeholder="Quando?" className="bg-transparent text-lg placeholder:text-zinc-400 w-40 outline-none" />
            </div>

            <div className="w-px h-6 bg-zinc-800" />

            {isGuestsInputOpen ? (
              <button onClick={closeGuestsInput} type="button" className="bg-zinc-800 text-zinc-200 rounded-lg py-2 px-5 font-medium flex items-center gap-2 hover:bg-zinc-700 transition-colors">
                Alterar local/data
                <Settings2 />
              </button>
            ) : (
              <button onClick={openGuestsInput} className="bg-sky-300 text-sky-950 rounded-lg py-2 px-5 font-medium flex items-center gap-2 hover:bg-sky-400 transition-colors">
                Continuar <ArrowRight className="size-5" />
              </button>
            )}
          </div>

          {isGuestsInputOpen && (
            <div className="h-16 bg-zinc-900 p-4 rounded-xl flex items-center gap-3 shadow-shape">
              <button type="button" onClick={openGuestsModal} className="flex gap-2 items-center flex-1 text-left">
                <UserRoundPlus className="size-5 text-zinc-400" />
                <span className="text-zinc-400 text-lg flex-1">Quem estrá va viagem?</span>
              </button>

              <div className="w-px h-6 bg-zinc-800" />

              <button className="bg-sky-300 text-sky-950 rounded-lg py-2 px-5 font-medium flex items-center gap-2 hover:bg-sky-400 transition-colors">
                Confirmar viagem <ArrowRight className="size-5" />
              </button>
            </div>
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
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
          <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Selecionar convidados</h2>

                <button type="button" onClick={closeGuestModal}>
                  <X className="size-5 text-zinc-400" />
                </button>
              </div>

              <p className="text-sm text-zinc-400">Os convidados irão receber e-mails para confirmar a participação na viagem.</p>
            </div>

            <div className="flex flex-wrap gap-2">
              {emailsToInvite.map((email) => {
                return (
                  <div key={email} className="py-1.5 px-2.5 rounded-md bg-zinc-800 flex items-center gap-2">
                    <span className="text-zinc-300">{email}</span>

                    <button type="button">
                      <X className="size-4 text-zinc-400" onClick={() => removeEmailsToInvites(email)} />
                    </button>
                  </div>
                );
              })}
            </div>

            <div className="w-full h-px bg-zinc-800" />

            <form onSubmit={addNewEmailToInvite} className="p-2.5 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
              <div className="px-2 flex items-center flex-1 gap-2">
                <AtSign className="size-5 text-zinc-400" />
                <input type="email" name="email" placeholder="Digite o email do convidado." className="bg-transparent text-lg placeholder:text-zinc-400 outline-none flex-1" />
              </div>

              <button type="submit" onClick={openGuestsInput} className="bg-sky-300 text-sky-950 rounded-lg py-2 px-5 font-medium flex items-center gap-2 hover:bg-sky-400 transition-colors">
                Convidar <Plus className="size-5" />
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
