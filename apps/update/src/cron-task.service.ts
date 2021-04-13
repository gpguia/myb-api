import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import  axios from 'axios';
import * as redis from 'redis';
import JSONCache from 'redis-json';

@Injectable()
export class TasksService {

	// @Cron(CronExpression.EVERY_HOUR)
    @Cron(CronExpression.EVERY_10_SECONDS)
	async getBinanceInformation() {
        try{
            const res = await axios.get('https://api.binance.com/api/v3/ticker/24hr');
            const client = redis.createClient({
                host: process.env.REDIS_HOST,
                port: parseInt(process.env.REDIS_PORT)
            });
            client.auth(process.env.REDIS_PASSWORD);
            
            const jsonCache = new JSONCache<{
                symbol: string,
                priceChange: string,
                priceChangePercent: string,
                weightedAvgPrice: string,
                prevClosePrice: string,
                lastPrice: string,
                lastQty: string,
                bidPrice: string,
                askPrice: string,
                openPrice: string,
                highPrice: string,
                lowPrice: string,
                volume: string,
                quoteVolume: string,
                openTime: string,
                closeTime: string,
                firstId: string,   // First tradeId
                lastId: string,    // Last tradeId
                count: string         // Trade count
            }>(client);

            if(res && res.data){
                let symbolArr: string[] = []
                Promise.all(res.data.map(e => {
                    jsonCache.set(e.symbol, e);
                    symbolArr.push(e.symbol);
                })).then(() => {
                    if(symbolArr.length > 0){
                        client.set('symbol', symbolArr.toString());
                    }
                    console.log('DONE :)')
                })
            }
        }catch(err){
            console.error('getBinanceInformation ERROR: ', err);
            throw err;
        }
    }
}
