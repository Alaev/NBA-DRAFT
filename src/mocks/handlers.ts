import { rest } from 'msw';
import { URL } from '../config';
import playersData from './data/players.json';

const players = rest.get(URL, (req, res, ctx) => {
  return res(ctx.json(playersData));
});

export const handlers = [players];
