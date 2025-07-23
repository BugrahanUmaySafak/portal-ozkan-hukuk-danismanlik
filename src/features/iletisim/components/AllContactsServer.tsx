import { useContactMessages } from "../hooks/useContact";
import ClientContactList from "./ClientContactList";

export default async function AllContactsServer() {
  const contacts = await useContactMessages();
  return <ClientContactList contacts={contacts} />;
}
