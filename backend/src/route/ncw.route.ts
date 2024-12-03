import { NCWController } from '@controller/ncw.controller';
import { Router } from 'express';

const router = Router();

router.get(
    '/device/:walletId',
    NCWController.getDeviceStatus
  )

  router.get(
    '/device/setup/:deviceId/:walletId',
    NCWController.getDeviceSetupStatus
  )
  export default router;