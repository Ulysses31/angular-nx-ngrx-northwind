import { MtListItem } from './list-item.interface';

export interface MtListSection {
  id?: null | string;
  subheader?: null | string;
  items?: null | MtListItem[];
}
