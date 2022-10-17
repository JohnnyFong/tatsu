import { IsNotEmpty } from 'class-validator';

export class BookmarkDto {
  @IsNotEmpty()
  readonly tokenMint: string;
}
