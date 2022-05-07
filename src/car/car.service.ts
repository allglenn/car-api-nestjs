import { HttpException, Injectable } from '@nestjs/common';
import { resolve } from 'path';
import { CarDto } from './car.dto';
import { CARS } from './car.mock';

@Injectable()
export class CarService {
    private cars = CARS;
    public async getCars() {
        return this.cars;
    }

    public async postCar(car: CarDto){
        this.cars.push(car)
        return this.cars;
    }

    public async getCarById(id : number): Promise<any>{
        const cartId = Number(id);
        return new Promise((resolve) => {

            const car = this.cars.find(car => car.id === cartId);
            if (!car) {
                throw new HttpException("Car not found", 404)
            }

            return resolve(car);
        }
        )
       
    }

    public async deleteCarById(id: number): Promise<any>{
        const carId = Number(id)
        return new Promise((resolve) => {
            this.cars = this.cars.filter(car => car.id !== carId);
            return resolve(this.cars)
        })
    }

    public async putCarById(id: Number, propertyName: string, propertyValue : string): Promise<any>{
        const cartId = Number(id);

        return new Promise((resolve) => {
            let carToPut = this.cars.find(car => car.id === cartId);;
            carToPut = { ...carToPut, ...{[propertyName]: propertyValue} }
            this.deleteCarById(cartId);
            this.cars.push(carToPut);

            return resolve(this.cars)
        })
        
    }
}  