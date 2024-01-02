import { Inject, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { MongooseModuleOptions, MongooseOptionsFactory } from "@nestjs/mongoose";

@Injectable()
export class MongooseConfigService implements MongooseOptionsFactory {
    constructor(@Inject(ConfigService) public configService: ConfigService) { }
    createMongooseOptions(): MongooseModuleOptions {
        try {
            const username = this.configService.get<string>('DATABASE_USER')
            const databasename = this.configService.get<string>('DATABASE_NAME')
            const password = this.configService.get<string>('DATABASE_PASSWORD')
            // console.log(`mongodb+srv://${username}:${password}@cluster0.jbyq6le.mongodb.net/${databasename}?retryWrites=true&w=majority`)
            return {
                uri: `mongodb+srv://${username}:${password}@cluster0.jbyq6le.mongodb.net/${databasename}?retryWrites=true&w=majority`,
            }
        } catch (error) {
            console.log('Error getting database is not connnected from server  ');
        }
    }
}