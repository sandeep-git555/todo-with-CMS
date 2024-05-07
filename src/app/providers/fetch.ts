import wait from './wait'

export default async function fetchFromCMS (url:string, options: RequestInit) {
  const rs = await fetch(`${process.env.CMS_URL}${url}`, {
    ...options,
    credentials: 'include',
    headers: [
      ['Authorization',  `users API-Key ${process.env.API_KEY}`],
      ['Content-Type', 'application/json']      
    ],
    redirect: 'follow'
  })
  const response = await rs.json()
  wait(350)
  return response
}