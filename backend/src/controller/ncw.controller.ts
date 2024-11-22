import { Request, Response } from 'express';
import { fireblocksNCWService } from '@service/fireblocks/ncw.service';
import { createLogger } from '@util/logger.utils';


const logger = createLogger('<Embedded Wallets Controller>');
export class NCWController {

    static async getDeviceStatus(req: Request, res: Response) {
        // @TODO: Implement this
        //  const device = await fireblocksNCWService..
    }
}
