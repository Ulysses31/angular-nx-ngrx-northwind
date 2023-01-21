/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  MaterialBtnAlign,
  MaterialButtonType,
  MaterialColor
} from '../enums/enums';

export interface MtCardActionsContent {
  aling: 'start' | MaterialBtnAlign;
  buttonsType: 'basic' | MaterialButtonType;
  buttons: {
    disabled: boolean;
    color: MaterialColor;
    icon: string;
    text: string;
    command: () => any;
  }[];
}
