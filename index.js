import readline from 'readline'
import login from './login.js'
import generateJson from './generateJson.js'
import postData from './postData.js'

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

const ask = (question) =>
  new Promise((resolve) => rl.question(question, resolve))

async function main() {
  try {
    const username = await ask('Nombre de usuario: ')
    const password = await ask('Contraseña: ')
    
    console.log('\n⏳ Iniciando sesión...')
    const cookie = await login(username, password)
    console.log('✅ Login correcto.')

    const prompt = await ask('Prompt para generar JSON: ')

    console.log('⏳ Generando JSON con GPT...')
    const json = await generateJson(prompt)
    console.log('✅ JSON generado.\n')

    // 👉 Aquí imprimes el JSON generado en consola
    console.log(JSON.stringify(json, null, 2))

    console.log('\n⏳ Enviando importación a GladToLink...')
    const result = await postData(json, cookie)
    console.log('✅ Importación completada.')
  } catch (err) {
    console.error('\n❌ Error:', err.message)
  } finally {
    rl.close()
  }
}

main()
