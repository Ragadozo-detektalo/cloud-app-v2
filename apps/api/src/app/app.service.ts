import { Injectable } from '@nestjs/common';
import { AlertEntity } from './entities/alert.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

export interface AggregatedDataSeries {
  name: string;
  data: [string, number][];
}

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(AlertEntity)
    private alertRepository: Repository<AlertEntity>
  ) {}

  all() {
    return this.alertRepository.find();
  }

  async create(data: Omit<AlertEntity, 'id'>): Promise<void> {
    await this.alertRepository.insert(data);
  }

  async delete(id: number): Promise<void> {
    await this.alertRepository.delete(id);
  }

  async aggregatedByDay(): Promise<AggregatedDataSeries[]> {
    const rawData = await this.all();
    const dayList = [
      ...new Set(
        rawData.map((item) => AppService.dateTimeToDay(item.datetime))
      ),
    ].sort();

    const subjectList = [
      ...new Set(rawData.map((item) => item.subject)),
    ].sort();

    return subjectList.map((subject) => ({
      name: subject,
      data: dayList.map((day) => [
        day,
        rawData.filter(
          (data) =>
            AppService.dateTimeToDay(data.datetime) === day &&
            data.subject === subject
        ).length,
      ]),
    }));
  }

  private static dateTimeToDay(datetime: Date): string {
    return (
      datetime.getFullYear() +
      '-' +
      (datetime.getMonth() + 1) +
      '-' +
      datetime.getDate()
    );
  }
}
