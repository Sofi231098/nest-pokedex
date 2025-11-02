import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { PokeResponse } from './interfaces/poke-response.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { Model } from 'mongoose';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';


@Injectable()
export class SeedService {


  constructor( // se inyecta el modelo de Pokemon para poder crear registros
    @InjectModel(Pokemon.name)
        private readonly pokemonModel: Model<Pokemon>,
        private readonly http: AxiosAdapter,
  ) {}

  async executeSeed() {

    await this.pokemonModel.deleteMany({}); // eliminar todos los registros antes de insertar los nuevos

    const data = await this.http.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=650');

    const pokemonToInsert: {name: string, no: number}[] = [];

    data.results.forEach( async ({name, url}) => {
      
      const segments = url.split('/');
      const no = +segments[segments.length - 2];

      pokemonToInsert.push({name, no}); 
    });

    await this.pokemonModel.insertMany( pokemonToInsert ); // inserta todos los registros de una sola vez

    return 'Seed executed';
  }

}
