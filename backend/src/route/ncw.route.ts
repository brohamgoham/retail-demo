import { NCWController } from '@controller/ncw.controller';
import { Router } from 'express';

const router = Router();

router.get(
    '/device',
    NCWController.getDeviceStatus
  )

  router.get(
    '/device/setup',
    NCWController.getDeviceSetupStatus
  )
  export default router;