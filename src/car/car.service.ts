import { HttpException, Injectable } from '@nestjs/common';
import { resolve } from 'path';
import { CarDto } from './car.dto';
import { Model } from 'mongoose';
import { ICar } from './interfaces/car.interface';
import { InjectModel } from '@nestjs/mongoose';
const carProjection = {
    __v: false,
    _id: false
}
@Injectable()
export class CarService {
    constructor(@InjectModel("Car") private readonly CarModel : Model<ICar>){

    }
     public async getCars(): Promise<CarDto[]> {
         const cars = await this.CarModel.find({}, carProjection).exec();
         if(!cars){
                throw new HttpException({
                        message: "not car car"
                },404)
         }

         return cars
    }

    public async postCar(newCar: CarDto){
        const car = await this.CarModel.create(newCar);
        return car.save();
    }


    public async getCarById(id: number): Promise<CarDto>{
        const car = await this.CarModel.findOne({ id }, carProjection).exec();
        if (!car) {
            throw new HttpException({
                message: `not car car for id ${id}`
            }, 404)
        }

        return car
       
    }

    public async deleteCarById(id: number): Promise<any>{
        const car = await this.CarModel.deleteOne({ id }).exec();
        if (car.deletedCount === 0) {
            throw new HttpException({
                message: `not car car for id ${id}`
            }, 404)
        }

        return car
    }

    public async putCarById(id: Number, propertyName: string, propertyValue: string): Promise<CarDto>{
        const car = await this.CarModel.findOneAndUpdate({ id },{
            [propertyName]: propertyValue
        }).exec();
        if (!car) {
            throw new HttpException({
                message: `not car car for id ${id}`
            }, 404)
        }

        return car
    }
}  