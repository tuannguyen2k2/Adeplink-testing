import axios from "axios";

export const getProvincesVN = async () => {
  return await axios
    .get("https://vapi.vnappmob.com/api/province/", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
    .then((response) => response.data.results)
    .catch((error) => {
      throw Error(error);
    });
};



export const getDistrictsVN = async (province_id: string) => {
  return await axios
    .get(`https://vapi.vnappmob.com/api/province/district/${province_id}`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
    .then((response) => response.data.results)
    .catch((error) => {
      throw Error(error);
    });
};