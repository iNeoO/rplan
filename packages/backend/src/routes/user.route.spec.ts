import userRoutes from './user.route.ts';
import prisma from '../libs/__mocks__/prisma.ts';
// https://zenn.dev/airrnot1106/articles/d8cea0570ea6bf

vi.mock('../libs/prisma');
vi.mock('../services/mail.service.ts');

describe('UserRoutes', () => {
  test('post / - Create new user', async () => {
    const postBody = {
      email: 'user@example.com',
      username: 'string',
      password: 'string',
    };
    const newUser = {
      ...postBody,
      id: '1',
      isEmailValid: false,
      createdAt: new Date(),
      lastLoginOn: null,
    };
    prisma.user.create.mockResolvedValue({
      ...newUser,
    });
    const res = await userRoutes.request('/', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUser),
    });
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({
      createdAt: newUser.createdAt.toISOString(),
      email: newUser.email,
      id: newUser.id,
      username: newUser.username,
    });
  });

  test('Get / - try to get not logged user', async () => {
    const res = await userRoutes.request('/', {
      method: 'get',

    });
    expect(res.status).toBe(401);
    expect(await res.json()).toEqual({
      error: 'Unauthorized',
    });
  });
});
