import { Injectable } from '@nestjs/common';
import JSONCache from 'redis-json';
import * as Promise from 'bluebird';
import * as redis from 'redis';

@Injectable()
export class AppService {
	getHello(): string {
		return 'Hello World!';
	}

	async get24HrBinance(): Promise<any> {
		const client = Promise.promisifyAll(
			redis.createClient({
				host: process.env.REDIS_HOST,
				port: parseInt(process.env.REDIS_PORT),
			})
		);
		await client.auth(process.env.REDIS_PASSWORD);

		const jsonCache = new JSONCache<{
			symbol: string;
			priceChange: string;
			priceChangePercent: string;
			weightedAvgPrice: string;
			prevClosePrice: string;
			lastPrice: string;
			lastQty: string;
			bidPrice: string;
			askPrice: string;
			openPrice: string;
			highPrice: string;
			lowPrice: string;
			volume: string;
			quoteVolume: string;
			openTime: string;
			closeTime: string;
			firstId: string; // First tradeId
			lastId: string; // Last tradeId
			count: string; // Trade count
		}>(client);

		var result: any[] = [];

		const res = await client.getAsync('symbol');

		var lstOfSymbols = await res.split(',');
    await Promise.all(lstOfSymbols.map(async e => {
      result.push(await jsonCache.get(e));
    })).then(() => {
      return result;
    });
    
		return result;  
	}
}
