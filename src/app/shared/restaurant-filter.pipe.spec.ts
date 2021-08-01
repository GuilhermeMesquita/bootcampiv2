import { RestaurantFilterPipe } from './restaurant-filter.pipe';

describe('RestaurantFilterPipe', () => {
  it('create an instance', () => {
    const pipe = new RestaurantFilterPipe();
    expect(pipe).toBeTruthy();
  });
});
