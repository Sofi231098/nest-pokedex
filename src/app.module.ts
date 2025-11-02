import { join } from 'path';
import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { PokemonModule } from './pokemon/pokemon.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';
import { ConfigModule } from '@nestjs/config';
import { EnvConfiguration } from './common/config/env.config';
import { joiValidationSchema } from './common/config/joi.validation';


@Module({
  imports: [
    ConfigModule.forRoot(
      {
        load: [EnvConfiguration],
        validationSchema: joiValidationSchema
      }
    ),

    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),

    MongooseModule.forRoot(process.env.MONGODB || 'mongodb+srv://abrilyanez123_db_user:zQkbFUYY9hlSm5am@mongodbcluster.jo2p0qw.mongodb.net/', {
      dbName: 'pokemonsdb'
    }), // Conexión a la base de datos MongoDB (valor por defecto si no está definido)

    PokemonModule, CommonModule, SeedModule,

  ],
})
export class AppModule {
    
}
