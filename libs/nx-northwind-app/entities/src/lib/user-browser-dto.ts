export interface UserBrowserDto {
  Id: string;
  Username?: null | string;
  Password?: null | string;
  Email?: null | string;
  Is_Active?: boolean;
  Success_Token?: null | string;
  Refresh_Token?: null | string;
}
