import { IsNotEmpty, IsOptional } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  @IsNotEmpty()
  name: string;
  @Column()
  is_delete: boolean;
}
