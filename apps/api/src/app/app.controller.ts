import { Body, Controller, Get, Param, Put, Query } from '@nestjs/common';

import { AppService } from './app.service';
import { AlertEntity } from './entities/alert.entity';
import { ApiBody, ApiParam, ApiQuery } from '@nestjs/swagger';

@Controller('data')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  all(): Promise<AlertEntity[]> {
    return this.appService.all();
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
  async post(
    @Body() subjectList: string[],
    @Param('date') date: string,
    @Param('time') time: string
  ): Promise<void> {
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
