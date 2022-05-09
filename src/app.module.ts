import { Module } from '@nestjs/common';
import { CarModule } from './car/car.module';
import { MongooseModule } from '@nestjs/mongoose';
import { configuration } from './configuration';
import { ConfigModule} from '@nestjs/config';

const ENV_FILE_PAH = `${process.cwd()}/config/env/${process.env.NODE_ENV}.env`;
const MONGO_URL = process.env.MONGO_URL
console.log(MONGO_URL);

@Module({
  imports: [
    ConfigModule.forRoot({ 
    envFilePath: `${process.cwd()}/config/env/${process.env.NODE_ENV}.env`,
    isGlobal: true, load:[configuration]}),
    MongooseModule.forRoot(""),
    CarModule
  ]
})
export class AppModule {}
