import { BaseDto } from './base-dto';

export interface UserLoaderDto extends BaseDto {
  Id: string;
  Username?: null | string;
  Password?: null | string;
  Email?: null | string;
  Is_Active?: boolean;
  Success_Token?: null | string;
  Refresh_Token?: null | string;
}
