import { Controller, Get, Post, Put, Delete, Body, Param, UseInterceptors, Query } from '@nestjs/common';
import { EquipmentService } from './equipment.service';
import { CreateEquipmentDto, GetEquipmentDto, ApiKey, GetEquipmentType } from 'shared';
import { Equipment } from "@prisma/client";

@Controller('equipments')
export class EquipmentController {
    constructor(private readonly equipmentService: EquipmentService) {}

    @Post()
    async createEquipment(@ApiKey() apiKey: string, @Body() createEquipmentDto: CreateEquipmentDto): Promise<Equipment> {
        return this.equipmentService.addEquipment(apiKey, createEquipmentDto);
    }

    @Get('equipment')
    async getEquipment(@ApiKey() apiKey: string, @Query('id') id: string): Promise<Equipment> {
        return this.equipmentService.getEquipmentById(apiKey, id);
    }

    // @Get()
    // async getUserEquipments(@ApiKey() apiKey: string, @Query('id') id: string): Promise<Equipment[]> {
    //     return this.equipmentService.getEquipmentById(apiKey, id);
    // }

    @Get()
    async getAllEquipment(@ApiKey() apiKey: string, @Query('vendorId') vendorId: string): Promise<Equipment[]> {
        return this.equipmentService.getAllEquipment(apiKey, vendorId);
    }

}