export async function deleteInstanceById(instanceId) {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/${instanceId}`, {
      method: 'DELETE'
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.detail || 'Delete failed')
    }

    return { success: true }
  } catch (err) {
    console.error("Delete failed:", err)
    return { error: err.message }
  }
}
