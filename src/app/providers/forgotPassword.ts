export default async function forgotPassword (email: string) {
  const rs = await fetch(`${process.env.CMS_URL}/api/users/forgot-password`, {
    method: 'POST',
    credentials: 'include',
    headers: [
      ['Content-Type', 'application/json']      
    ],
    body: JSON.stringify({
      email
    })
  })
  const response = await rs.json()
  return response
}