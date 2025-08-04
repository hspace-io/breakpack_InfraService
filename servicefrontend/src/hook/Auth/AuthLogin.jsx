export async function login({ username, password }) {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: "include",
      body: JSON.stringify({ username, password }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.detail || 'Login failed')
    }

    return { success: true }
  } catch (err) {
    console.error("Login failed:", err)
    return { error: err.message }
  }
}