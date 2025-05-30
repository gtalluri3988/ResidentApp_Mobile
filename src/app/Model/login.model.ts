export class LoginModel {
  constructor(
    public Username: string = '',
    public Password: string = '',
    public roleId: number = 0,
    public ErrorMessage: string = ''
  ) { }
}