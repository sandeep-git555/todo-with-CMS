export const login = async (formData: FormData) => {
  // TODO: organise slugs
  const rs = await fetch(`${process.env.CMS_URL}/api/users/login`, {
    method: 'POST',
    credentials: 'include',
    headers: [
      ['Authorization', `users API-Key ${process.env.API_KEY}`],
      ['Content-Type', 'application/json']
    ],
    body: JSON.stringify({
      email: formData.get('email'),
      password: formData.get('password')
    }),
    redirect: 'follow'
  })
  const response = await rs.json()
  if(response) {
    if (response.errors) {
      const {message} = response.errors[0]
      return {
        error: true,
        message
      }
    }
    const { exp, message, token, user } = response
    return {
      success: true,
      message,
      user,
      exp,
      token
    }
  }
  return {
    error: true,
    message: 'Error logging in'
  }
}