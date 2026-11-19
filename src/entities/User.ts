import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { Role } from './Role';

@Index('pk_user', ['id'], { unique: true })
@Entity('user', { schema: 'public' })
export class User {
  @Column('uuid', { primary: true, name: 'id' })
  id: string;

  @Column('character varying', { name: 'fullname', length: 255 })
  fullname: string;

  @Column('character varying', { name: 'alias', nullable: true, length: 255 })
  alias: string | null;

  @Column('character varying', {
    name: 'username',
    nullable: true,
    length: 255,
  })
  username: string | null;

  @Column('character varying', { name: 'password_hash', length: 60 })
  passwordHash: string;

  @Column('character varying', { name: 'unit', nullable: true, length: 255 })
  unit: string | null;

  @Column('boolean', { name: 'enabled', nullable: true })
  enabled: boolean | null;

  @Column('boolean', { name: 'account_expired', nullable: true })
  accountExpired: boolean | null;

  @Column('boolean', { name: 'account_locked', nullable: true })
  accountLocked: boolean | null;

  @Column('boolean', { name: 'password_expired', nullable: true })
  passwordExpired: boolean | null;

  @Column('character varying', {
    name: 'password',
    nullable: true,
    length: 255,
  })
  password: string | null;

  @Column('character varying', { name: 'email', nullable: true, length: 255 })
  email: string | null;

  @Column('character varying', { name: 'kantor', nullable: true, length: 255 })
  kantor: string | null;

  @Column('text', { name: 'simpul_id', nullable: true, array: true })
  simpulId: string[] | null;

  @Column('text', { name: 'simpul', nullable: true, array: true })
  simpul: string[] | null;

  @Column('boolean', { name: 'is_sik', nullable: true })
  isSik: boolean | null;

  @Column('uuid', { name: 'create_id', nullable: true })
  createId: string | null;

  @Column('timestamp with time zone', { name: 'create_date', nullable: true })
  createDate: Date | null;

  @Column('uuid', { name: 'update_id', nullable: true })
  updateId: string | null;

  @Column('timestamp with time zone', { name: 'update_date', nullable: true })
  updateDate: Date | null;

  @Column('character varying', { name: 'no_telp', nullable: true, length: 15 })
  noTelp: string | null;

  @Column('bigint', { name: 'role_id', nullable: true })
  roleId: string | null;

  @ManyToOne(() => Role, (role) => role.users)
  @JoinColumn([{ name: 'role_id', referencedColumnName: 'id' }])
  role: Role;
}
