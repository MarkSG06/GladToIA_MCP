import fetch from 'node-fetch'

/**
 * @param {object} body
 * @param {string} cookie
 * @returns {Promise<object>}
 */
export default async function postData(body, cookie) {
  const response = await fetch(
    'https://www.gladtolink.com/api/Tag/MultipleImport',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Cookie: cookie,
      },
      body: JSON.stringify(body),
    },
  )

  if (!response.ok) {
    const text = await response.text()
    throw new Error(`Importación fallida: ${response.status} ${response.statusText}\n${text}`)
  }

  return await response.json()
}