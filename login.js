import fetch from 'node-fetch'

/**
 * @param {string} username
 * @param {string} password
 * @returns {Promise<string>}
 */
export default async function login(username, password) {
  const response = await fetch(
    'https://www.gladtolink.com/api/Authentication/Login',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userName: username,
        userPassword: password,
      }),
    },
  )

  if (!response.ok) {
    throw new Error(`Login fallido: ${response.status} ${response.statusText}`)
  }

  const cookie = response.headers.get('set-cookie')
  if (!cookie) {
    throw new Error('No se recibió la cookie de autenticación (.GTL.Auth)')
  }
  return cookie
}