import axios from "axios";
import cron from "node-cron";
import { RedisService } from "../redisConnection";
import { COINS, COINGECKO_IDS, FIATS } from "./currencies";


export function startRatesCron() {
  const redis = RedisService.getClient();

  cron.schedule("* * * * *", async () => {

    try {
      // 1) Fetch crypto → USD prices
      const ids = COINS.map((symbol) => COINGECKO_IDS[symbol]).join(",");
      const cryptoRes = await axios.get(
        "https://api.coingecko.com/api/v3/simple/price",
        {
          params: {
            ids,
            vs_currencies: "usd",
          },
        }
      );

      const cryptoUSD: Record<string, number> = {};
      for (const symbol of COINS) {
        const id = COINGECKO_IDS[symbol];
        cryptoUSD[symbol] = cryptoRes.data[id]?.usd ?? 0;
      }

      // 2) Fetch USD → FIAT conversion rates  
      const fiatRes = await axios.get(
        "https://open.er-api.com/v6/latest/USD"
      );

      const fiatRates: Record<string, number> = {};
      for (const fiat of FIATS) {
        fiatRates[fiat] = fiatRes.data.rates[fiat] ?? 1;
      }

      // Save to redis
      redis.set("CRYPTO_USD", JSON.stringify(cryptoUSD));
      redis.set("FIAT_RATES", JSON.stringify(fiatRates));

      console.log("✔ Rates updated");
    } catch (err) {
      console.error("Cron error:", err);
    }
  });
}
