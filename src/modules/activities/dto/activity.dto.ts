import { IsNotEmpty } from 'class-validator';

export class ActivityDto {
  @IsNotEmpty()
  readonly tokenMint: string;

  @IsNotEmpty()
  readonly metadata: string;
}
