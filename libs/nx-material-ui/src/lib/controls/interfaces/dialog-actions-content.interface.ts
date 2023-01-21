import { MaterialBtnAlign } from '../enums/enums';

export interface MtDialogActionsContent {
  aling: 'start' | MaterialBtnAlign;
  buttons: { text: string }[];
}
