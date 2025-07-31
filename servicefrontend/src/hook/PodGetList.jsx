export const fetchInstances = async () => {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/?skip=0&limit=100`)
    const data = await res.json()
    return data
  } catch (error) {
    console.error("Failed to fetch instances:", error)
    return []
  }
}
