/* eslint-disable @typescript-eslint/no-explicit-any */
import { MaterialColor } from "@nx-northwind/nx-material-ui";

export interface FunctionButtons {
  id: string;
  label: string;
  color: MaterialColor;
  icon: string;
  disabled: boolean;
  toolTipMessage: string;
  command: (args: any) => void;
}
