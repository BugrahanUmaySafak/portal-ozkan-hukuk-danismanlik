import { Calendar, Mail, Phone, Trash2 } from "lucide-react";
import type { Messages } from "../types";
import { useContactMessages } from "../hooks/useContact";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default async function AllContacts() {
  const contacts: Messages[] = await useContactMessages();

  const formatDate = (date: string) => {
    return new Intl.DateTimeFormat("tr-TR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(date));
  };

  return (
    <div className="container mx-auto py-8 max-w-7xl">
      <div className="space-y-6">
        {contacts.length === 0 ? (
          <Card className="text-center py-20">
            <CardHeader>
              <Mail className="h-12 w-12 mx-auto text-muted-foreground" />
              <CardTitle>Henüz mesaj yok</CardTitle>
              <CardDescription>
                İlk mesaj geldiğinde burada görünecek.
              </CardDescription>
            </CardHeader>
          </Card>
        ) : (
          <div className="space-y-6">
            {contacts.map((contact) => (
              <Card
                key={contact._id}
                className="rounded-xl shadow-sm border hover:shadow-md transition-shadow w-full"
              >
                <CardHeader className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-lg truncate">
                      {contact.title}
                    </CardTitle>
                    <CardDescription className="text-md font-medium truncate">
                      {contact.name}
                    </CardDescription>
                  </div>
                  <Button
                    size="icon"
                    variant="destructive"
                    disabled
                    className="cursor-not-allowed shrink-0"
                    title="Silme devre dışı"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </CardHeader>

                <CardContent className="space-y-4">
                  {contact.email && (
                    <div className="flex items-center gap-2 text-sm min-w-0">
                      <Mail className="h-4 w-4 text-muted-foreground shrink-0" />
                      <span className="text-muted-foreground shrink-0">
                        Email:
                      </span>
                      <a
                        href={`mailto:${contact.email}`}
                        className="text-blue-600 hover:underline truncate min-w-0"
                        title={contact.email}
                      >
                        {contact.email}
                      </a>
                    </div>
                  )}

                  {contact.phone && (
                    <div className="flex items-center gap-2 text-sm min-w-0">
                      <Phone className="h-4 w-4 text-muted-foreground shrink-0" />
                      <span className="text-muted-foreground shrink-0">
                        Telefon:
                      </span>
                      <a
                        href={`tel:${contact.phone}`}
                        className="text-blue-600 hover:underline truncate min-w-0"
                        title={contact.phone}
                      >
                        {contact.phone}
                      </a>
                    </div>
                  )}

                  <Separator />

                  <div className="min-w-0">
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">
                      Mesaj:
                    </h3>
                    <p className="text-sm text-gray-800 whitespace-pre-wrap break-words overflow-wrap-anywhere">
                      {contact.content}
                    </p>
                  </div>
                </CardContent>

                <CardFooter className="text-sm text-muted-foreground pt-2 border-t">
                  <div className="flex items-center gap-2 min-w-0">
                    <Calendar className="h-4 w-4 shrink-0" />
                    <time dateTime={contact.date} className="truncate">
                      {formatDate(contact.date)}
                    </time>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
