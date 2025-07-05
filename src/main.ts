import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { NestExpressApplication } from '@nestjs/platform-express'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { AppResponseInterceptor } from './common/app-response.interceptor'
import { AppExceptionFilter } from './common/app-exception.filter'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)

  // 允许跨域
  app.enableCors()

  // Swagger配置
  const swaggerConfig = new DocumentBuilder()
    .setTitle('小程序/后台的接口文档')
    .setDescription('供徐先生使用')
    .setVersion('1')
    .build()
  const document = SwaggerModule.createDocument(app, swaggerConfig)
  SwaggerModule.setup('/api-docs', app, document)

  // 静态目录
  app.useStaticAssets('uploads', { prefix: '/uploads' })

  // 全局响应拦截器
  app.useGlobalInterceptors(new AppResponseInterceptor())
  // 全局异常过滤器
  app.useGlobalFilters(new AppExceptionFilter())

  await app.listen(process.env.PORT ?? 3000)
}

bootstrap()
