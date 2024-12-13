import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryColumn,
    UpdateDateColumn,
  } from 'typeorm';
  import { EWMessages } from './EWMessages';
  import { User } from './User';
  import { Wallet } from './Wallet';
  
  @Entity()
  export class Device extends BaseEntity {
    @PrimaryColumn("uuid", { nullable: false, length: 64 })
    id: string;
  
    @Column({ nullable: false })
    userId: number;
  
    @Column({ type: "uuid", nullable: false, length: 64 })
    walletId: string;
  
    @OneToMany(() => EWMessages, (msg) => msg.device)
    msgs: EWMessages[];
  
    @ManyToOne(() => Wallet, (wallet) => wallet.devices, { cascade: true })
    @JoinColumn({ name: "walletId", referencedColumnName: "id" })
    wallet: Wallet;
  
    @ManyToOne(() => User, (user) => user.devices, { cascade: true })
    @JoinColumn({ name: "userId", referencedColumnName: "id" })
    user: User;
  
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
  }
  