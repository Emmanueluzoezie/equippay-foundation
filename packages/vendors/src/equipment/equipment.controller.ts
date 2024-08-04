import { Controller, Get, Post, Put, Delete, Body, Param, UseInterceptors, Query } from '@nestjs/common';
import { EquipmentService } from './equipment.service';
import { CreateEquipmentDto, GetEquipmentDto, ApiKey, GetEquipmentType } from 'shared';
import { Equipment } from "@prisma/client";

@Controller('equipment')
export class EquipmentController {
    constructor(private readonly equipmentService: EquipmentService) {}

    @Post()
    async createEquipment(@ApiKey() apiKey: string, @Body() createEquipmentDto: CreateEquipmentDto): Promise<Equipment> {
        console.log("errer")
        return this.equipmentService.addEquipment(apiKey, createEquipmentDto);
    }

    @Get('get_equipment')
    async getEquipment(@ApiKey() apiKey: string, @Query('id') id: string): Promise<Equipment> {
        return this.equipmentService.getEquipmentById(apiKey, id);
    }

    @Get('vendor/:vendorId')
    async getAllEquipment(@ApiKey() apiKey: string, @Param('vendorId') vendorId: string): Promise<Equipment[]> {
        return this.equipmentService.getAllEquipment(apiKey, vendorId);
    }

}