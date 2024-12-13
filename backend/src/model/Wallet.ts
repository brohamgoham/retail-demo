import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, BaseEntity, OneToOne, JoinColumn } from 'typeorm';
import { User } from './User';
import { Asset } from './Asset';
import { WalletAssetBalance } from './WalletAssetBalance';
import { Transaction } from './Transaction';
import { Device } from './Device';

@Entity()
export class Wallet extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @OneToOne(() => User, user => user.wallet)
  user: User;

  @OneToMany(() => Asset, asset => asset.wallet)
  assets: Asset[];

  @OneToMany( () => Transaction, transaction => transaction.wallet)
  transactions: Transaction[]

  @OneToMany(() => WalletAssetBalance, walletAssetBalance => walletAssetBalance.wallet)
  assetBalances: WalletAssetBalance[];

  @Column({ nullable: true })
  description: string;

  //@OneToMany(() => Device, (device) => device.wallet)
  devices: Device[];

}
