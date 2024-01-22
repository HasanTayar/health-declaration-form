import { ColumnDef } from "@tanstack/react-table";

export interface checkForExistingPDFProps {
  id: string;
}
export type UserType = {
  firstName: string;
  secondName: string;
  id: string;
  expiredAt: string;
};
export type AdminType = {
  firstName: string;
  secondName: string;
  id: string;
};
export type ClientDetails = {
  expiredAt: string;
  firstName: string;
  id: string;
  pdfDownloadUrl: string;
  secondName: string;
  submissionDate: string;
};
export interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}
export type FormSubmission = {
  expiredAt: string;
  firstName: string;
  id: string;
  pdfDownloadUrl: string;
  secondName: string;
  submissionDate: string;
};
