import axios from "axios";

const baseUrl = "http://127.0.0.1:8000/login";

const login = async (user_email) => {
  const response = await axios.post(`${baseUrl}`, user_email);
  return response.data;
};

export default { login };
