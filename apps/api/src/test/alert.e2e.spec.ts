import { agent, SuperAgentTest } from 'supertest';

const createTestData = (
  app: SuperAgentTest,
  date: string,
  timeBase: string,
  subject: string,
  count: number
) => {
  for (let i = 1; i <= count; i++) {
    app
      .put('/api/data/' + date + '/' + timeBase + i)
      .send([subject])
      .end();
  }
};

describe('data seed', () => {
  let app: SuperAgentTest;

  beforeAll(() => {
    app = agent('http://localhost:3333');
  });

  it('should seed db', () => {
    // mouse
    createTestData(app, '2021-12-01', '02-02-', 'mouse', 2);
    createTestData(app, '2021-12-02', '02-02-', 'mouse', 4);
    createTestData(app, '2021-12-03', '02-02-', 'mouse', 16);
    createTestData(app, '2021-12-04', '02-02-', 'mouse', 13);
    createTestData(app, '2021-12-05', '02-02-', 'mouse', 13);
    createTestData(app, '2021-12-06', '02-02-', 'mouse', 15);
    createTestData(app, '2021-12-07', '02-02-', 'mouse', 8);
    createTestData(app, '2021-12-08', '02-02-', 'mouse', 4);
    createTestData(app, '2021-12-09', '02-02-', 'mouse', 2);

    // cat
    createTestData(app, '2021-12-05', '02-02-', 'cat', 1);
    createTestData(app, '2021-12-06', '02-02-', 'cat', 0);
    createTestData(app, '2021-12-07', '02-02-', 'cat', 2);
    createTestData(app, '2021-12-08', '02-02-', 'cat', 4);
    createTestData(app, '2021-12-09', '02-02-', 'cat', 5);

    // dog
    createTestData(app, '2021-12-01', '02-02-', 'dog', 1);
    createTestData(app, '2021-12-02', '02-02-', 'dog', 2);
    createTestData(app, '2021-12-03', '02-02-', 'dog', 0);
    createTestData(app, '2021-12-04', '02-02-', 'dog', 1);
    createTestData(app, '2021-12-05', '02-02-', 'dog', 1);
    createTestData(app, '2021-12-06', '02-02-', 'dog', 2);
    createTestData(app, '2021-12-07', '02-02-', 'dog', 1);
    createTestData(app, '2021-12-08', '02-02-', 'dog', 1);
    createTestData(app, '2021-12-09', '02-02-', 'dog', 0);

    // human
    createTestData(app, '2021-12-01', '02-02-', 'human', 2);
    createTestData(app, '2021-12-02', '02-02-', 'human', 3);
    createTestData(app, '2021-12-03', '02-02-', 'human', 2);
    createTestData(app, '2021-12-04', '02-02-', 'human', 4);
    createTestData(app, '2021-12-05', '02-02-', 'human', 1);
    createTestData(app, '2021-12-06', '02-02-', 'human', 3);
    createTestData(app, '2021-12-07', '02-02-', 'human', 1);
    createTestData(app, '2021-12-08', '02-02-', 'human', 3);
    createTestData(app, '2021-12-09', '02-02-', 'human', 0);
  });
});
