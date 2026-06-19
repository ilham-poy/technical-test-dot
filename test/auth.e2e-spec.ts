import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '@/app.module.ts';

describe('Auth (e2e)', () => {
    let app: INestApplication;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('register -> login -> access protected', async () => {
        const email = `test+e2e+${Date.now()}@example.com`;
        const password = 'Test1234!';
        const name = 'Test User';
        // register
        await request(app.getHttpServer())
            .post('/auth/register')
            .send({ email, password, name })
            .expect(201);

        const loginRes = await request(app.getHttpServer())
            .post('/auth/login')
            .send({ email, password })
            .expect(201);
        const token = loginRes.body.token;
        expect(token).toBeDefined();

        const res = await request(app.getHttpServer())
            .get('/users/me/profile')
            .set('Authorization', `Bearer ${token}`)
            .expect(200);

        expect(res.body.user.email).toBe(email);
    });

    afterAll(async () => {
        await app.close();
    });
});
