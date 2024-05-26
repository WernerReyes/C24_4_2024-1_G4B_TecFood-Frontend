const URL_GOOGLE_USER_INFO = "https://www.googleapis.com/oauth2/v3/userinfo";

export const userGoogleInfo = async <T>(
  accessToken: string,
): Promise<T> => {
  try {
    const response = await fetch(URL_GOOGLE_USER_INFO , {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching user info:", error);
    throw error;
  }
};

