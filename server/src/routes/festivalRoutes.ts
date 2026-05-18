import { Router } from 'express';
import {
  getAllFestivals,
  getFeaturedFestivals,
  getFestivalBySlug,
} from '../controllers/festivalController.js';

const router = Router();

router.get('/', getAllFestivals);
router.get('/featured', getFeaturedFestivals);
router.get('/:slug', getFestivalBySlug);

export default router;
