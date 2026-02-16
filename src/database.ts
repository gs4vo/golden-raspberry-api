import { Low } from 'lowdb';
import { Memory } from 'lowdb'
import { loadCSV } from './loaders/csv.loader.js';
import { Movie } from './models/movies.js';

export type Data = {
    movies: Movie[];
}

const defaultData: Data = { movies: [] }
const adapter = new Memory<Data>();
export const db = new Low<Data>(adapter, defaultData);

export async function initDB() {
    await db.read();
    await loadCSV();
}