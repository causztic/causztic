import { getToken } from "./auth.js";
import getSongRecommendation from "./getSongRecommendation.js";

const token = await getToken();
const recommendation = await getSongRecommendation(token);
console.log(recommendation);