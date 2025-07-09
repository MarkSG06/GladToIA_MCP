import OpenAI from 'openai'
  import 'dotenv/config'
  import { v4 as uuidv4 } from 'uuid'

  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

  /**
   * @param {string} prompt
   * @returns {Promise<object>}
   */
  export default async function generateJson(prompt) {
    const systemPrompt = `
Eres un generador de JSON para importar formularios en GladToLink.

Genera una estructura como esta:

{
  "tags": [],
  "forms": [
    {
      "name": "Nombre del formulario",
      "uniqueId": "uuid",
      "fields": [
        {
          "name": "Nombre del campo",
          "type": 0,
          "typeEnum": 0,
          "position": 0,
          "uniqueId": "uuid",
          "isRequired": false
        }
      ]
    }
  ],
  "lists": [],
  "workflows": []
}

Reglas:
- Limitar el nombre del formulario a 25 caracteres
- Devuelve solo un objeto JSON (no envuelvas en texto)
- Cada campo debe tener un name distinto
- typeEnum puede ser:
  0=text, 1=number, 2=boolean, 3=date, 4=location, 5=time, 6=list, 7=chart, 8=autonumber, 9=file, 10=array
- Los campos deben tener campos obligatorios: name, type, typeEnum, position, uniqueId, isRequired
`.trim()

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: systemPrompt
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      response_format: { type: 'json_object' },
      temperature: 0.3
    })

    const jsonText = completion.choices[0].message.content.trim()
    const parsed = JSON.parse(jsonText)

    parsed.forms = (parsed.forms || []).map((form, i) => {
      form.uniqueId = form.uniqueId || uuidv4()
      form.fields = (form.fields || []).map((field, j) => {
        return {
          ...field,
          uniqueId: field.uniqueId || uuidv4(),
          position: j,
          isRequired: field.isRequired ?? false
        }
      })
      form.name = form.name?.slice(0, 25) || 'Formulario'
      return form
    })

    return parsed
  }