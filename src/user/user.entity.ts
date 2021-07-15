import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ unique: true })
  email: string;
  @Column()
  password: string;
  @Column({ name: 'first_name' })
  firtName: string;
  @Column({ name: 'last_name' })
  lastName: string;
  @Column()
  avatar: string;
}
