// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config()
require('module-alias/register')
import { AppModule } from './app.module'
import { INestApplication, ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify'
import { MicroserviceOptions, Transport } from '@nestjs/microservices'
import { convertEnvToBoolean, KafkaConstants } from 'pkg-shared'

async function bootstrap() {
  const app: INestApplication = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ caseSensitive: false }),
    {
      logger: ['error', 'warn'],
      cors: {
        origin: process.env.APP_CORS_ORIGIN?.split(','),
        credentials: false
      }
    }
  )
  if (convertEnvToBoolean(process.env.KAFKA_ACTIVE)) await activeHybridApp(app)
  app.useGlobalPipes(new ValidationPipe({ transform: true }))
  app.setGlobalPrefix(process.env.APP_GLOBAL_PREFIX)
  await app.listen(process.env.APP_LISTEN_PORT || 4000, process.env.APP_LISTEN_HOSTNAME || '127.0.0.1')
  console.log(
    '\x1b[36m%s\x1b[0m',
    `Server listening on ${process.env.APP_LISTEN_HOSTNAME}:${process.env.APP_LISTEN_PORT}`
  )
}

async function activeHybridApp(app: INestApplication) {
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: KafkaConstants.kafkaProducerId,
        brokers: KafkaConstants.brokers,
        logLevel: KafkaConstants.logLevel
      },
      producerOnlyMode: KafkaConstants.producerOnlyMode,
      producer: {
        allowAutoTopicCreation: KafkaConstants.allowAutoTopicCreation
      }
    }
  })
  await app.startAllMicroservices()
  console.log('\x1b[32m%s\x1b[0m', 'The Hybrid Kafka Instance is ready')
}

bootstrap()
