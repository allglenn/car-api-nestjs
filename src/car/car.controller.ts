import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { CarDto } from './car.dto';
import { CarService } from './car.service';

@Controller('car')
export class CarController {
    constructor(private carService: CarService) {

    }

    @Get()
    async getCars() {
        return this.carService.getCars();
    }

    @Post()
    async postCar( @Body() car : CarDto ){
        return this.carService.postCar(car);
    }

    @Get(":id")
    async getCarById(@Param("id") id: number) {
        const car = this.carService.getCarById(id);
        return car;
    }
  
    @Delete(":id")
    async deleteCarById(@Param("id") id: number){
        return this.carService.deleteCarById(id);
    }

    @Put(":id")
    async putCar(@Param("id") id: number, @Query() query  ){
        const propertyName = query.property_name;
        const propertyValue = query.property_value;
        return this.carService.putCarById(id,propertyName,propertyValue);
    }

}
