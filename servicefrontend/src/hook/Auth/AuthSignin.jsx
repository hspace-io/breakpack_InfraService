export async function signup({ username, email, password }) {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || "Signup failed");
    }

    return { success: true };
  } catch (err) {
    console.error("Signup failed:", err);
    return { error: err.message };
  }
}