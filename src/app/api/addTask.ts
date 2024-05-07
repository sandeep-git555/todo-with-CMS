'use server'

export const addTask = async (formData: FormData) => {
  const rs = await fetch(`${process.env.CMS_URL}/api/tasks`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `users API-Key ${process.env.API_KEY}`
    },
    body: JSON.stringify({
      name: formData.get('name'),
      description: formData.get('description'),
      user: '',
    })
  })
  const res = await rs.json()
  return res
}