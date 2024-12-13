import { Request, Response } from 'express';
import { fireblocksNCWService } from '@service/ncw.service';

export class NCWController {
  static async getDeviceStatus(req: Request, res: Response) {
    const { walletId } = req.params;
    try {
      const deviceStatus = await fireblocksNCWService.getDeviceStatus(walletId);
      return res.status(200).json(deviceStatus);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  static async getDeviceSetupStatus(req: Request, res: Response) {
    const { deviceId, walletId } = req.params;
    try {
      const setupStatus = await fireblocksNCWService.getDeviceSetupStatus(deviceId, walletId);
      return res.status(200).json(setupStatus);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  static async getWalletDevices(req: Request, res: Response) {
    const { walletId } = req.params;
    try {
      const walletDevices = await fireblocksNCWService.getWalletDevices(walletId);
      console.log("getWalletDevices=>", walletDevices);
      const devices = walletDevices.map((device) => ({
        deviceId: device.deviceId,
        enabled: device.enabled
      }));
      return res.status(200).json(devices);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  static async enableWallet(req: Request, res: Response) {
    const { walletId } = req.params;
    const { enabled } = req.body;
    try {
      await fireblocksNCWService.enableWalletDevice(walletId, enabled);
      console.log("enableWalletDevice=>?", enabled);
      return res.status(201).json({ message: `Wallet device enabled status set to ${enabled}`, enabled });
    } catch (error) {
      return res.status(404).json({ error: error.message });
    }
  }

  /*
    
    async rpc(req: RequestEx, res: Response, next: NextFunction) {
    const { params, device } = req;
    const { deviceId } = params;
    const { message } = req.body;

    try {
      const { walletId } = device!;
      const response = await this.service.rpc(walletId, deviceId, message);
      res.json(response);
    } catch (err) {
      return next(err);
    }
  }
  
  */
  static async invokeWalletRpc(req: Request, res: Response) {
    const { walletId, deviceId } = req.params;
    const { payload } = req.body;
    try {
      const invoke = await fireblocksNCWService.invokeWalletRpc(walletId, deviceId, payload);
      console.log("invokeWalletRpc=>", invoke);
      return res.status(200).json(res);
    } catch (error) {
      return res.status(404).json({ error: error.message });
    }
  }

}
