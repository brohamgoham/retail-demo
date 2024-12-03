import { FireblocksSDK } from 'fireblocks-sdk';
import path from 'path';
import fs from 'fs';


describe('NCW Client', () => {
  let fireblocksAdmin: FireblocksSDK;
  let fireblocksSigner: FireblocksSDK;
  const apiSecret = fs.readFileSync(path.resolve("./keys/retail-ncw.key"), "utf8");
  const signerKey = process.env.FIREBLOCKS_API_KEY_NCW_SIGNER;
  const apiKey = process.env.FIREBLOCKS_API_KEY_NCW_ADMIN;
  const baseUrl = "https://api.fireblocks.io";

  beforeEach(() => {
    jest.clearAllMocks();
    fireblocksAdmin = new FireblocksSDK(apiSecret, apiKey, baseUrl);
    fireblocksSigner = new FireblocksSDK(apiSecret, signerKey, baseUrl);
    
  });

  it('should call createWallet successfully', async () => {
    if (!fireblocksAdmin.NCW) {
        throw new Error("fireblocksSigner.NCW is undefined");
    };

  
    const cw = await fireblocksAdmin.NCW.createWallet();
    console.log("Test creating a wallet:", cw);

    const wallet = await fireblocksAdmin.NCW.getWallets({
        pageSize: 100,
        order: 'ASC'
    });
    console.log("Wallet ID:", wallet);
    expect(wallet.data[0]).toHaveProperty('walletId');
    expect(Array.isArray(wallet.data)).toBe(true);
    expect(wallet).toBeInstanceOf(Object);
    expect(wallet).not.toBeNull();
    });
});
