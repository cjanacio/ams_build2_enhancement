import axios from "axios";

export const __ENV__ = "PRD";
export const PARAM_URL = "";
export const GLOBAL_PATH = __ENV__ === "DEV" ? "http://localhost/utility-consolidation/" : "./model/global_model.php";
export const GLOBAL_PATH2 = __ENV__ === "DEV" ? "https://webappservice-stg.robinsonsland.com/src/model/global_model.php" : "./model/global_model.php";
export const AMS_MODEL_PATH = __ENV__ === "DEV" ? "http://localhost/asset-monitoring/" : "./genset/model/service_schedule.php";
export const authToken = async () => {
  try {
    const { data, status } = await axios.put(
      GLOBAL_PATH,
      {},
      {
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        "Event-Key": "generate-authentication-bydata"
      }
    });

    if (status === 200) {
      return data;
    }
  } catch (error) {
    return Promise.reject(error);
  }
}