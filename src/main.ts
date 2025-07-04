import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { NestExpressApplication } from '@nestjs/platform-express'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)
  const options = new DocumentBuilder()
    .setTitle('小程序/后台的接口文档')
    .setDescription('哈哈')
    .setVersion('1')
    .build()

  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup('/api-docs', app, document)

  await app.listen(process.env.PORT ?? 3000)
}
bootstrap()
