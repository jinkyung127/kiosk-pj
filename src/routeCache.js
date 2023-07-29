import NodeCache from "node-cache";
import OptionService from "./services/options.service";

// NodeCache 인스턴스를 생성
const optionCache = new NodeCache();

// 옵션 데이터를 캐시하기 위한 함수
async function cacheOptionData() {
  const optionService = new OptionService();
  const optionData = await optionService.getAllOptions(); // 데이터베이스에서 옵션 데이터를 가져오기

  // 데이터를 캐시에 저장
  optionCache.set("optionData", optionData);
  // console.log(optionCache.get("optionData"));
}

// 서버 최초 기동시 옵션 데이터를 캐싱
cacheOptionData();

// 일정 주기마다 옵션 데이터를 캐시 업데이트
const cacheUpdateInterval = 10 * 1000; // 1시간마다 업데이트
setInterval(cacheOptionData, cacheUpdateInterval);

// 옵션 데이터를 가져오는 함수
async function getOptionData() {
  const cachedData = optionCache.get("optionData");
  if (cachedData !== undefined) {
    return cachedData;
  } else {
    // 캐시가 없을 경우 DB에서 다시 데이터를 가져오기
    const optionService = new OptionService();
    const optionData = await optionService.getAllOptions();
    optionCache.set("optionData", optionData); // 가져온 데이터를 다시 캐시에 저장
    return optionData;
  }
}

export { getOptionData };
