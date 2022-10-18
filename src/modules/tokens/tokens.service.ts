import { Inject, Injectable } from '@nestjs/common';
import { TOKEN_REPOSITORY } from 'src/constants';
import { TokenDto } from './dto/token.dto';
import { Token } from './token.entity';

@Injectable()
export class TokensService {
  constructor(
    @Inject(TOKEN_REPOSITORY)
    private readonly tokenRepository: typeof Token,
  ) {}

  async updateOrCreate(token: TokenDto): Promise<[Token, boolean]> {
    return await this.tokenRepository.upsert(token);
  }
}
