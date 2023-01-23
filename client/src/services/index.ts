import axios from "axios";

export const uploadFileApi = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  try {
    const { data: imgName } = await axios.post("/uploadFileAPI", formData);
    return imgName;
  } catch (e) {
    return e;
  }
};
