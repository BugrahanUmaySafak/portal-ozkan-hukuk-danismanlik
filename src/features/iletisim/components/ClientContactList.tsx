"use client";

import { useTransition } from "react";
import { toast } from "sonner";
import { Trash2, Mail, Phone, Calendar } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import { deleteContactAction } from "../actions/deleteContactAction";
import type { Messages } from "../types";
import { useRouter } from "next/navigation";

export default function ClientContactList({
  contacts,
}: {
  contacts: Messages[];
}) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleDelete = (id: string, name: string) => {
    toast(`“${name}” silinsin mi?`, {
      action: {
        label: "Evet, sil",
        onClick: async () => {
          const res = await deleteContactAction(id);
          if (res.success) {
            toast.success(`${name} silindi.`);
            router.refresh();
          } else {
            toast.error(res.error || "Silme başarısız.");
          }
        },
      },
      cancel: {
        label: "İptal",
        onClick: () => {
          toast.info("Silme iptal edildi.");
        },
      },
      duration: 10000,
    });
  };

  const formatDate = (date: string) =>
    new Intl.DateTimeFormat("tr-TR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(date));

  return (
    <div className="max-w-full overflow-x-auto space-y-6 p-12">
      {contacts.map((contact) => (
        <Card
          key={contact._id}
          className="rounded-xl shadow-sm border hover:shadow-md transition-shadow"
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
              onClick={() => handleDelete(contact._id, contact.name)}
              disabled={isPending}
              className="shrink-0"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </CardHeader>

          <CardContent className="space-y-4">
            {contact.email && (
              <div className="flex items-center gap-2 text-sm min-w-0">
                <Mail className="h-4 w-4 text-muted-foreground shrink-0" />
                <span className="text-muted-foreground shrink-0">Email:</span>
                <a
                  href={`mailto:${contact.email}`}
                  className="text-blue-600 hover:underline truncate"
                  title={contact.email}
                >
                  {contact.email}
                </a>
              </div>
            )}

            {contact.phone && (
              <div className="flex items-center gap-2 text-sm min-w-0">
                <Phone className="h-4 w-4 text-muted-foreground shrink-0" />
                <span className="text-muted-foreground shrink-0">Telefon:</span>
                <a
                  href={`tel:${contact.phone}`}
                  className="text-blue-600 hover:underline truncate"
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

          <CardFooter className="text-sm text-muted-foreground border-t py-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 shrink-0" />
              <time dateTime={contact.date} className="truncate">
                {formatDate(contact.date)}
              </time>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
