export async function logout() {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/logout`, {
      method: "POST",
      credentials: "include",
    });
    if (res.ok) {
      window.location.href = "/";
    } else {
      console.error("Logout failed");
    }
  } catch (err) {
    console.error("Logout error", err);
  }
}
