import knex from '../database/connection';
import { Request, Response } from 'express';

class ItemsController {

  public async index(request: Request, response: Response) {

    const items = await knex('items').select('*');

    const serializedItems = items.map(item => {
      return {
        id: item.id,
        title: item.title,
        image_url: `${process.env.APP_API_URL}/uploads/${item.image}`
      }
    });

    return response.json(serializedItems);
  }

}

export default ItemsController;