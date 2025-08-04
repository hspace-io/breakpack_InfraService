export async function getAllUsers() {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/users`, {
    credentials: "include",
  });
  return await res.json();
}
