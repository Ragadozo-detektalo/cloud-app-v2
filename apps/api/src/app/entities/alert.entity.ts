import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class AlertEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('datetime')
  datetime: Date;

  @Column()
  subject: string;
}
