import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Reportentity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  price: number;
}
