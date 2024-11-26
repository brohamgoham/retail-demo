import { Request, Response } from 'express';
import { fireblocksNCWService } from '@service/fireblocks/ncw.service';
import { createLogger } from '@util/logger.utils';


const logger = createLogger('<Embedded Wallets Controller>');
export class NCWController {

    static async getDeviceStatus(req: Request, res: Response) {
        logger.info('NCW ----- getDeviceStatus');
        // @TODO: Implement this
        
        try {
            const deviceStatus = await fireblocksNCWService.getDeviceStatus(req.params.walletId);
            res.status(200).json(deviceStatus);
        } catch (error) {
            logger.error(`Error getting device status for wallet ${req.params.walletId}: ${error}`);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    static async getDeviceSetupStatus(req: Request, res: Response) {
        logger.info('NCW ----- getDeviceSetupStatus');
        try {
            const deviceSetupStatus = await fireblocksNCWService.getDeviceSetupStatus(req.params.deviceId, req.params.walletId);
            res.status(200).json(deviceSetupStatus);
        } catch (error) {
            logger.error(`Error getting device setup status for device ${req.params.deviceId} and wallet ${req.params.walletId}: ${error}`);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}
