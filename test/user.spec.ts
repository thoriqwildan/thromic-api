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
      expect(response.body.data).toBeDefined()
    });
  });
});
