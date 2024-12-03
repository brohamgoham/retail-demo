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
}
