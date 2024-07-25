import { Router } from 'express';
import {
  restaurantsSanityTest,
  registerRestaurant,
  getRestaurant,
  deleteRestaurant,
} from '../controllers/restaurant-controller';
import {
  getRestaurantNameById,
  getAllRestaurants,
} from '../controllers/restaurant_internals';

export const restaurantsRouter = Router();

restaurantsRouter.get('/test', restaurantsSanityTest);
restaurantsRouter.post('/', registerRestaurant);
restaurantsRouter.get('/', getRestaurant);
restaurantsRouter.delete('/:id', deleteRestaurant);
restaurantsRouter.get('/all', getAllRestaurants);
restaurantsRouter.get('/:id', getRestaurantNameById);

export default restaurantsRouter;
