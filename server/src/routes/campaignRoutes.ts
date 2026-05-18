import { Router } from 'express';
import {
  createCampaign,
  getAllCampaigns,
  getCampaignBySlug,
  updateCampaign,
} from '../controllers/campaignController.js';

const router = Router();

router.get('/', getAllCampaigns);
router.get('/:slug', getCampaignBySlug);
router.post('/', createCampaign);
router.put('/:id', updateCampaign);

export default router;
