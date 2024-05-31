import axios from "axios";

const __ENV__ = "DEV";
export const PARAM_URL = __ENV__ !== "DEV" ? "index.php?page=pm_sched" : "";
export const GLOBAL_PATH = __ENV__ === "DEV" ? "http://localhost/utility-consolidation/" : "./model/global_model.php";
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