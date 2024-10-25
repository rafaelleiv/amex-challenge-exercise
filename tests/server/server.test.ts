import request from 'supertest';
import { fastify } from '../../framework/server';

beforeAll(async () => {
  await fastify.ready();
});

afterAll(async () => {
  await fastify.close();
});

test('GET /appWithoutSSRData should return a list of users', async () => {
  const response = await request(fastify.server).get('/appWithoutSSRData');

  expect(response.status).toBe(200);
  expect(response.headers['content-type']).toMatch(/html/);
  expect(response.text).toContain('Welcome to the People Directory');
});

test('GET /appWithSSRData should return a list of users', async () => {
  const response = await request(fastify.server).get('/appWithSSRData');

  expect(response.status).toBe(200);
  expect(response.headers['content-type']).toMatch(/html/);
  expect(response.text).toContain('Welcome to the People Directory');
});
