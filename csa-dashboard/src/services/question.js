import axios from "axios";

const baseUrl = "http://127.0.0.1:8000/question";

const getAllQuestions = async (schemeName) => {
  const response = await axios.get(`${baseUrl}`, schemeName);
  return response.data;
};

export default { getAllQuestions };
