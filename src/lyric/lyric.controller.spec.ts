import { CacheModule } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { createTrackEntity } from '../../test/utils/lyric';
import { LyricController } from './lyric.controller';
import { LyricService } from './lyric.service';

describe('LyricController', () => {
  let lyricController: LyricController;
  let lyricService: LyricService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CacheModule.register()],
      controllers: [LyricController],
    })
      .useMocker((token) => {
        if (token === LyricService) {
          return { findOne: jest.fn() };
        }
      })
      .compile();

    lyricController = module.get<LyricController>(LyricController);
    lyricService = module.get<LyricService>(LyricService);
  });

  describe('findOne', () => {
    it('should be able to get lyrics by track id', async () => {
      const data = createTrackEntity();

      jest
        .spyOn(lyricService, 'findOne')
        .mockImplementation(
          async () => new Promise((resolve) => resolve(data)),
        );

      expect(await lyricController.findOne('')).toEqual(data);
    });
  });
});
