import { db } from '../database.js';
import { intervalDto } from '../dtos/intervals.dto.js';
import { Movie } from '../models/movies.js';

export async function AwardInterval() {

  // pega todos os filmes 
  const movies = db.data?.movies || []
  //filtra por yes 
  const winners = movies.filter(movie => movie.winner === 'yes')
  // cria o objeto de produtor e anos que foi ganho
  const producerWins: Record<string, number[]> = {}
  // for para percorrer cada filme que ganhou 
  for (const movie of winners) {
    const year = Number(movie.year)
    // separa nome dos produtores 
    const producers = movie.producers
      .replace(' and ', ',')
      .split(',')
      .map((p: string) => p.trim())
    // marca a vitória para cada produtor
    for (const producer of producers) {
      if (!producerWins[producer]) {
        producerWins[producer] = []
      }

      producerWins[producer].push(year)
    }
  }
  // filtra produtos que tiveram mais de uma vitoria
  const producersWithMultipleWins = Object.entries(producerWins)
    .filter(([_, years]) => years.length >= 2)
  // cria caixnha onde vai ser guardado os intervalos 
  const intervals: intervalDto[] = []  
  // for para validar os produtores com mais intervalo
  for (const [producer, years] of producersWithMultipleWins) {
    const sortedYears = years.sort((a, b) => a - b)
    // For para calcular os intervalos entre vitorias
    for (let i = 1; i < sortedYears.length; i++) {
      const previousWin = sortedYears[i - 1]
      const followingWin = sortedYears[i]
      const interval = followingWin - previousWin

      intervals.push({
        producer,
        interval,
        previousWin,
        followingWin
      })
    }
  }
  // Encontra o menor e o maior valr 
  const minInterval = Math.min(...intervals.map(i => i.interval))
  const maxInterval = Math.max(...intervals.map(i => i.interval))

  return {
    // retorna os dados para a API
    min: intervals.filter(i => i.interval === minInterval),
    max: intervals.filter(i => i.interval === maxInterval)
  }
}