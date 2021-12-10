import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  Param,
  Put,
  Req,
} from '@nestjs/common';

import { AggregatedDataSeries, AppService } from './app.service';
import { AlertEntity } from './entities/alert.entity';
import { ApiBody, ApiHeaders, ApiParam } from '@nestjs/swagger';
import { Request } from 'express';

@Controller('data')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  all(): Promise<AlertEntity[]> {
    return this.appService.all();
  }

  @Get('by-days')
  aggregatedByDay(): Promise<AggregatedDataSeries[]> {
    return this.appService.aggregatedByDay();
  }

  @Put(':date/:time')
  @ApiParam({
    name: 'date',
    type: String,
    example: '2021-01-02',
  })
  @ApiParam({
    name: 'time',
    type: String,
    example: '10-11-12',
  })
  @ApiBody({
    type: String,
    isArray: true,
    examples: {
      'defaut example': { value: ['cat', 'mouse'] },
    },
  })
  @ApiHeaders([
    {
      name: 'authorization',
      example: 'projectmunka',
    },
  ])
  async post(
    @Body() subjectList: string[],
    @Param('date') date: string,
    @Param('time') time: string,
    @Req() request: Request
  ): Promise<void> {
    if (request.headers.authorization !== 'projectmunka') {
      throw new ForbiddenException();
    }

    subjectList = subjectList.filter((item) => !!item);
    if (!subjectList.length) {
      return;
    }

    time = time.replace(/-/g, ':');

    for (const subject of subjectList) {
      await this.appService.create({
        subject,
        datetime: new Date(`${date} ${time}`),
      });
    }
  }
}
