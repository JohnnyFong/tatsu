import { IsNotEmpty } from 'class-validator';

export class TokenDto {
  @IsNotEmpty()
  readonly tokenMint: string;

  @IsNotEmpty()
  readonly metadata: string;
}
