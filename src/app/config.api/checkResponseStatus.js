export default function checkStatus(response) {
  if (!response.error) {
    return response;
  } else {
    const error = new Error(response.message);
    error.response = response;
    throw error;
  }
}
