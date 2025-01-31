import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from '../src/app.module';
import { Logger } from 'winston';
import { TestService } from './test.service';
import { TestModule } from './test.module';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';

describe('User Controller', () => {
  let app: INestApplication<App>;
  let logger: Logger
  let testService: TestService

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, TestModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    logger = app.get(WINSTON_MODULE_PROVIDER)
    testService = app.get(TestService)
  });


  // Register
  describe('POST /api/user', () => {
    beforeEach(async () => {
      await testService.deleteUser()
    })

    it('should be rejected if request is invalid', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/user')
        .send({
          username: '',
          name: '',
          email: '',
          password: ''
        })

      logger.info(response.body)

      expect(response.status).toBe(400)
      expect(response.body.errors).toBeDefined()
    })

    it('should be able to register', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/user')
        .send({
          username: 'test',
          name: 'test',
          email: 'test@example.com',
          password: 'test'
        })

        logger.info(response.body)

        expect(response.body.data.username).toBe('test')
        expect(response.body.data.name).toBe('test')
        expect(response.body.data.email).toBe('test@example.com')
    })
  })

  // Login
  describe('POST /api/user/login', () => {
    beforeEach(async () => {
      await testService.deleteUser();
      await testService.createUser();
    });

    it('should be rejected if request is invalid', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/user/login')
        .send({
          username: '',
          password: '',
        });

      logger.info(response.body);

      expect(response.status).toBe(400);
      expect(response.body.errors).toBeDefined();
    });

    it('should be able to login', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/user/login')
        .send({
          username: 'test',
          password: 'test',
        })

      logger.info(response.body);
      
      expect(response.status).toBe(202)
      expect(response.body).toBeDefined()
    });
  });

  // Get
  describe('GET /api/user/profile', () => {
    beforeEach(async () => {
      await testService.deleteUser();
      await testService.createUser();
    });

    it('should be rejected if request is invalid', async () => {
      const getresponse = await request(app.getHttpServer())
        .get('/api/user/profile')

      logger.info(getresponse.body);

      expect(getresponse.status).toBe(401);
      expect(getresponse.body.errors).toBeDefined()
    });

    it('should be able to get user', async () => {
      await testService.deleteUser();
      await testService.createUser();
      const response = await request(app.getHttpServer())
        .post('/api/user/login')
        .send({
          username: 'test',
          password: 'test',
        });
      
      const cookie = response.headers['set-cookie'][0].split(';')[0]

      const getresponse = await request(app.getHttpServer())
        .get('/api/user/profile')
        .set('Cookie', cookie)

      logger.info(cookie)
      logger.info(getresponse.body);

      expect(getresponse.status).toBe(200);
      expect(getresponse.body.data.username).toBe('test');
      expect(getresponse.body.data.name).toBe('test');
      expect(getresponse.body.data.email).toBe('test@example.com');
      expect(getresponse.body.data.imgUrl).toBeDefined();
    });
  });
});
