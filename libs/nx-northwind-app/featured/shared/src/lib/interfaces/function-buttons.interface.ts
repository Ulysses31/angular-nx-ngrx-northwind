export interface FunctionButtons {
  id: string;
  label?: string | null;
  disabled: boolean;
  command: () => void;
}
