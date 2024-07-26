import { AuthDto } from "./auth.dto";

export class LoginDto extends AuthDto {
  constructor(
    public readonly email: string,
    public readonly password: string,
  ) {
    super(email, password);
  } 
}
