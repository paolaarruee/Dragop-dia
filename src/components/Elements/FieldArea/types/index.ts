import { ChangeEvent } from "react";

export interface FieldAreaProps {
  label: string;
  type: string;
  value?: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}
