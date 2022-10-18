import { Injectable, Inject } from '@nestjs/common';
import { Bookmark } from './bookmark.entity';
import { BookmarkDto } from './dto/bookmark.dto';
import { BOOKMARK_REPOSITORY } from '../../constants';
import { Sequelize } from 'sequelize-typescript';
import { Token } from '../tokens/token.entity';
import { HasMany } from 'sequelize';

@Injectable()
export class BookmarksService {
  constructor(
    @Inject(BOOKMARK_REPOSITORY)
    private readonly bookmarkRepository: typeof Bookmark,
  ) {}

  async create(bookmark: BookmarkDto, userId): Promise<Bookmark> {
    return await this.bookmarkRepository.create<Bookmark>({
      ...bookmark,
      userId,
    });
  }

  async findAll(): Promise<Bookmark[]> {
    return await this.bookmarkRepository.findAll<Bookmark>({
      attributes: [
        [Sequelize.fn('DISTINCT', Sequelize.col('tokenMint')), 'tokenMint'],
      ],
    });
  }

  async delete(id: number, userId: number) {
    return await this.bookmarkRepository.destroy({
      where: { id, userId },
    });
  }

  async findByUserId(userId: number): Promise<Bookmark[]> {
    return await this.bookmarkRepository.findAll<Bookmark>({
      where: {
        userId,
      },
      include: [
        {
          model: Token,
          association: new HasMany(Bookmark, Token, {
            foreignKey: 'tokenMint',
            sourceKey: 'tokenMint',
          }),
        },
      ],
    });
  }

  async findByIdAndTokenMint(
    bookmark: BookmarkDto,
    userId: number,
  ): Promise<Bookmark> {
    return await this.bookmarkRepository.findOne({
      where: {
        tokenMint: bookmark.tokenMint,
        userId,
      },
    });
  }

  async findUserByTokenMint(tokenMint: string): Promise<Bookmark[]> {
    return await this.bookmarkRepository.findAll({
      where: {
        tokenMint,
      },
    });
  }
}
