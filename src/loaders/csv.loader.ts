import fs from 'fs';
import csv from 'csv-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import { db } from '../database.js';
import { Movie } from '../models/movies.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export async function loadCSV(): Promise<void> {
    const filePath = path.join(__dirname, '../../data/movielist.csv');

    return new Promise((resolve, reject) => {
        const results: Movie[] = []

        fs.createReadStream(filePath)
            .pipe(csv({ separator: ';' }))
            .on('data', (data) => results.push(data))
            .on('end', async () => {
                db.data!.movies = results;
                await db.write();
                console.log('CSV subiu')
                console.log('Num de registro:', results.length)
                resolve();
            })
            .on('error', (error) => reject(error));
    })
}