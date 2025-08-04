export async function Verify() {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/verify`, {
      method: "POST",
      credentials: "include"
    });
    
    if (response.ok) {
      const user = await response.json();
      console.log("로그인된 유저:", user.username);
      return { username: user.username, auth_level: user.auth_level };
    } else {
      console.log("로그인 안 됨");
      return { username: null };
    }
  } catch (err) {
    console.error("Auth Verify failed:", err)
    return { error: err.message }
  }
}