export interface MtSidebarMenuItem {
  text?: null | string;
  active?: null | boolean;
  path?: null | string;
  command?: () => void;
}
