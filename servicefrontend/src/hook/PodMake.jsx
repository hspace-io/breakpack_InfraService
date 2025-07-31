export const createService = async (form) => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      image: form.image,
      service_name: form.service_name,
      port: parseInt(form.port),
      yaml: form.yaml
    })
  })

  if (!res.ok) throw new Error('Deployment failed')

  return await res.json()
}