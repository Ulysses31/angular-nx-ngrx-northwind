import { BaseDto } from './base-dto';

export interface UserDto extends BaseDto {
  username?: null | string;
  password?: null | string;
  email?: null | string;
  is_Active?: boolean;
  sccess_Token?: null | string;
  refresh_Token?: null | string;
}
