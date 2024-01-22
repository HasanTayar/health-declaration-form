import { ClientDetails } from "@/constants";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "../ui/button";
import { MoreHorizontal, ArrowUpDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";
import deletePDF from "@/lib/firebase/services/delete-pdf";
export const columns: ColumnDef<ClientDetails>[] = [
  {
    accessorKey: "pdfDownloadUrl",
    header: "קובץ",
    cell: ({ row }) => {
      return (
        <Link to={`${row.original.pdfDownloadUrl}`} target="_blank">
          <Button variant="link">פתח PDF</Button>
        </Link>
      );
    },
  },
  {
    accessorKey: "expiredAt",
    header: "תקף עד",
    cell: ({ getValue }) => {
      const value = getValue() as string;
      const expiredAt = value ? new Date(value as string) : new Date();
      const now = new Date();
      const isExpired = expiredAt < now;

      return <p style={{ color: isExpired ? "red" : "inherit" }}>{value}</p>;
    },
  },
  {
    accessorKey: "submissionDate",
    header: "תאריך שהתקבל",
  },
  {
    accessorFn: (row) => `${row.firstName} ${row.secondName}`,
    id: "name",
    header: "שם מלא",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          ת.ז
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const id = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="text-right">
            <DropdownMenuLabel>פעלות</DropdownMenuLabel>
            <DropdownMenuItem
              className="text-right"
              onClick={() => navigator.clipboard.writeText(id.id)}
            >
              העתק ת.ז
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => deletePDF(row.original.pdfDownloadUrl)}
            >
              למחקת הטופס
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
