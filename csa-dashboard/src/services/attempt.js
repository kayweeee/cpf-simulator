import axios from "axios";

const baseUrl = "http://127.0.0.1:8000/attempt";

const getFeedback = async (req) => {
  // {user_id, question_id, answer}
  const response = await axios.post(`${baseUrl}`, req);
  return response.data;
};

export default { getFeedback };
