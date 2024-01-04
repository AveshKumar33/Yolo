import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './models/users.model';
import { LoggerMiddleware } from 'src/shared/middlewares/logger.middleware';

@Module({
  imports: [MongooseModule.forFeature([{
    name: "User",
    schema: UserSchema,
  }])],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      // .exclude({ path: '/user/:id', method: RequestMethod.GET })
      .forRoutes(UsersController)

  }
}
