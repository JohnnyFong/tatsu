import { Token } from './token.entity';
import { TOKEN_REPOSITORY } from '../../constants';

export const tokensProviders = [
  {
    provide: TOKEN_REPOSITORY,
    useValue: Token,
  },
];
