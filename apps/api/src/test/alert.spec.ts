import { AppModule } from '../app/app.module';
import { Test } from '@nestjs/testing';
import { AppController } from '../app/app.controller';
import { AppService } from '../app/app.service';

describe('alert crud', () => {
  let controller: AppController;
  let service: AppService;

  beforeAll(async () => {
    const testApp = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    controller = testApp.get(AppController);
    service = testApp.get(AppService);

    const testData = {
      '2021-10-10/10-10-10': 'wolf,human',
      '2021-10-10/10-10-12': 'bear,rabbit',
      '2021-10-10/10-10-30': 'human',
      '2021-10-10/10-11-00': 'cat',
      '2021-10-10/10-11-02': 'cat,mouse',
      '2021-10-11/10-12-10': 'dog',
      '2021-10-12/10-13-10': 'rabbit',
      '2021-10-13/10-14-10': '',
    };

    for (const datetime of Object.keys(testData)) {
      await controller.post(
        testData[datetime].split(','),
        datetime.split('/')[0],
        datetime.split('/')[1]
      );
    }
  });

  it('should insert and list', async () => {
    const data = await controller.all();
    expect(data.length).toBe(10);
    expect(data.map((alert) => alert.subject)).toStrictEqual([
      'wolf',
      'human',
      'bear',
      'rabbit',
      'human',
      'cat',
      'cat',
      'mouse',
      'dog',
      'rabbit',
    ]);
  });

  afterAll(async () => {
    const idList = (await controller.all()).map((alert) => alert.id);

    for (const id of idList) {
      await service.delete(id);
    }
  });
});
