export const checkUsernameDuplicate = async (username) => {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/check-username?username=${username}`);
    return res.ok;
  } catch (err) {
    console.error("중복 확인 실패", err);
    return false;
  }
};
