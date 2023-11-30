export const getLinkedinAccessToken = async () => {
  const data = {
    grant_type: 'client_credentials',
    client_id: 'test ID',
    client_secret: 'test Secret',
  };
  console.log(data);
  fetch('https://www.linkedin.com/oauth/v2/accessToken', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams(data),
  })
    .then((response) => response.json())
    .then((data) => {
      return data.access_token;
    })
    .catch((error) => {
      console.error(error);
    });
};
