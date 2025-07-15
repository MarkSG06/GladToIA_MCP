import OpenAI from 'openai'
import 'dotenv/config'
import { v4 as uuidv4 } from 'uuid'

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

/**
 * Genera un objeto JSON válido basado en un prompt
 * @param {string} prompt
 * @returns {Promise<object>}
 */
export default async function generateJson(prompt) {
  const systemPrompt = `
Eres un asistente experto en la creación, edición y validación de estructuras JSON utilizadas en una plataforma de gestión de formularios, etiquetas (tags), listas (lists) y workflows (workflows).

🎯 OBJETIVO DEL ASISTENTE
Asistirte en:
- Generación de etiquetas (tags) con propiedades completas.
- Creación de formularios (forms) con campos válidos.
- Diseño de listas (lists) con ítems correctamente estructurados.
- Construcción de workflows con estados y transiciones funcionales.
- Validación de referencias cruzadas (formUniqueId, listUniqueId, workflowUniqueId).

✅ REGLAS OBLIGATORIAS
- El campo "name" del formulario debe tener máximo 25 caracteres.
- Cada campo en el formulario debe tener un "name" único.
- Devuelve solo un bloque JSON válido, sin explicaciones ni texto adicional.
- Cada campo en "fields" debe contener:
  - name
  - type
  - typeEnum
  - position
  - uniqueId
  - isRequired

- Codificación de typeEnum:
  0=text, 1=number, 2=boolean, 3=date, 4=location,
  5=time, 6=list, 7=chart, 8=autonumber, 9=file, 10=array

🧠 COMPORTAMIENTO DEL ASISTENTE
- Siempre responde en español.
- No explicas el JSON salvo que el usuario lo pida.
- Usa UUIDs simulados válidos.
- Usa este ownerUniqueId por defecto: 270924ee-03ef-413c-bdab-d086fe76440f.
- Debes asignarle al formulario con un campo tipo lista su id, debe ser asi: "listId": "d3f8c9b6-5f9b-4b0f-9c6e-1f8b6a1d9c3e" (este id es un ejemplo, debes poner el mismo que haya en list uniqueId).
- Las listas deben ser iguales a las del ejemplo del JSON para que funcionen bien.

De momento no pongas listas en las etiquetas solo pon listas en forms.


Ejemplo de JSON completo válido incluido:

{
    "tags": [
        {
            "color": "9575cd",
            "listUniqueId": "0e2ce937-a179-462a-9fe9-20fc54445cd4",
            "workflowUniqueId": "abd5c2ec-6e79-4abd-8989-f28bc2c97329",
            "formUniqueId": "08caf526-9345-43f0-88c1-53eb1de71f7f",
            "position": 44,
            "uniqueCalc": null,
            "isMultiline": false,
            "users": null,
            "groups": null,
            "modificationDate": "2025-07-15T18:18:43.973Z",
            "uniqueId": "ea2f71e1-ed6e-47b2-a6ec-0b03cdb09b1d",
            "name": "Gestión de Habitaciones",
            "description": "Control de ocupación y estado de habitaciones.",
            "ownerUniqueId": "270924ee-03ef-413c-bdab-d086fe76440f"
        }
    ],
    "forms": [
        {
            "fields": [
                {
                    "isRequired": true,
                    "position": 0,
                    "mask": "",
                    "nai": 0,
                    "listId": null,
                    "jsonId": null,
                    "uniqueId": "7cf7355b-ef93-40bf-988b-20dfb3e3cf0c",
                    "name": "Número de habitación",
                    "description": "",
                    "type": 0,
                    "typeEnum": 0
                },
                {
                    "isRequired": true,
                    "position": 2,
                    "mask": "",
                    "nai": 0,
                    "listId": null,
                    "jsonId": null,
                    "uniqueId": "76c38b3a-8cd0-477b-807a-011ff625e360",
                    "name": "¿Está ocupada?",
                    "description": "",
                    "type": 2,
                    "typeEnum": 2
                },
                {
                    "isRequired": false,
                    "position": 4,
                    "mask": "",
                    "nai": 0,
                    "listId": null,
                    "jsonId": null,
                    "uniqueId": "5fae0b72-e0e2-4548-98a0-80d8d8a52fb2",
                    "name": "Fecha de salida",
                    "description": "",
                    "type": 3,
                    "typeEnum": 3
                },
                {
                    "isRequired": false,
                    "position": 3,
                    "mask": "",
                    "nai": 0,
                    "listId": null,
                    "jsonId": null,
                    "uniqueId": "053c837d-c6bd-4171-9642-b5c750f1dcb2",
                    "name": "Fecha de ingreso",
                    "description": "",
                    "type": 3,
                    "typeEnum": 3
                },
                {
                    "isRequired": false,
                    "position": 1,
                    "mask": "",
                    "nai": 1,
                    "listId": "7efc9057-f28b-49a5-8c40-eefa50b3f642",
                    "jsonId": null,
                    "uniqueId": "cf26a41a-2469-4062-99ed-d4ebf41de8e9",
                    "name": "Tipo de habitación",
                    "description": "",
                    "type": 6,
                    "typeEnum": 6
                }
            ],
            "uniqueId": "08caf526-9345-43f0-88c1-53eb1de71f7f",
            "name": "Gestión Habitaciones",
            "description": "Formulario para registrar datos de habitaciones.",
            "ownerUniqueId": "270924ee-03ef-413c-bdab-d086fe76440f",
            "creationDate": "2025-07-15T18:18:43.85Z",
            "modificationDate": "2025-07-15T18:38:21.227Z",
            "iconFont": "meeting_room",
            "iconColor": "9575cd"
        }
    ],
    "lists": [
        {
            "formUniqueId": null,
            "type": 0,
            "sortType": 0,
            "sortOrderBy": 0,
            "integrationId": null,
            "items": [
                {
                    "uniqueId": "1ebb5be0-999e-4374-8f25-a3ec359f35fe",
                    "value": "Dual",
                    "description": null,
                    "data": [],
                    "position": 0,
                    "isDefault": true,
                    "_oldListId": null,
                    "creationDate": "2025-07-15T18:38:10.773Z",
                    "_auxPos": 0,
                    "imported": false
                },
                {
                    "uniqueId": "759cb3ad-48b0-4fc2-9e07-00d8bf5d12f7",
                    "value": "Individual",
                    "description": null,
                    "data": [],
                    "position": 1,
                    "isDefault": false,
                    "_oldListId": null,
                    "creationDate": "2025-07-15T18:38:10.773Z",
                    "_auxPos": 0,
                    "imported": false
                }
            ],
            "mapping": [],
            "group": null,
            "elementsPerPage": 0,
            "useAsExternal": false,
            "accessType": null,
            "uniqueId": "7efc9057-f28b-49a5-8c40-eefa50b3f642",
            "name": "Lista tipo de habitacion",
            "description": "",
            "ownerUniqueId": "270924ee-03ef-413c-bdab-d086fe76440f",
            "creationDate": "2025-07-15T18:37:54.333Z",
            "modificationDate": "2025-07-15T18:38:10.8Z",
            "iconFont": "format_list_numbered",
            "iconColor": "ff9800"
        },
        {
            "formUniqueId": null,
            "type": 0,
            "sortType": 0,
            "sortOrderBy": 0,
            "integrationId": null,
            "items": [
                {
                    "uniqueId": "7a2be828-c483-46ce-8512-aa7704e7ffb0",
                    "value": "Individual",
                    "description": null,
                    "data": [],
                    "position": 0,
                    "isDefault": true,
                    "_oldListId": null,
                    "creationDate": "2025-07-15T18:18:43.733Z",
                    "_auxPos": 0,
                    "imported": false
                },
                {
                    "uniqueId": "1ae52e04-4405-41da-903f-4e1ba3397edb",
                    "value": "Doble",
                    "description": null,
                    "data": [],
                    "position": 1,
                    "isDefault": false,
                    "_oldListId": null,
                    "creationDate": "2025-07-15T18:18:43.733Z",
                    "_auxPos": 0,
                    "imported": false
                },
                {
                    "uniqueId": "808a33d8-223b-449f-88f5-2271a7af353c",
                    "value": "Suite",
                    "description": null,
                    "data": [],
                    "position": 2,
                    "isDefault": false,
                    "_oldListId": null,
                    "creationDate": "2025-07-15T18:18:43.733Z",
                    "_auxPos": 0,
                    "imported": false
                }
            ],
            "mapping": [],
            "group": null,
            "elementsPerPage": 0,
            "useAsExternal": false,
            "accessType": null,
            "uniqueId": "0e2ce937-a179-462a-9fe9-20fc54445cd4",
            "name": "Tipo de Habitación",
            "description": "Clasificación de habitaciones según tipo.",
            "ownerUniqueId": "270924ee-03ef-413c-bdab-d086fe76440f",
            "creationDate": "2025-07-15T18:18:43.66Z",
            "modificationDate": "2025-07-15T18:18:43.803Z",
            "iconFont": "hotel",
            "iconColor": "b39ddb"
        }
    ],
    "workflows": [
        {
            "elements": [
                {
                    "uniqueId": "3ef145de-f051-455d-9dbd-d65b0d15f9af",
                    "value": "Libre",
                    "description": "Habitación disponible para uso.",
                    "position": 0,
                    "isDefault": true,
                    "creationDate": "0001-01-01T00:00:00",
                    "posX": 100.0000000000,
                    "posY": 200.0000000000,
                    "color": null,
                    "exported": false
                },
                {
                    "uniqueId": "e0a4f0d2-c710-44fe-9de1-44113a27a222",
                    "value": "Ocupada",
                    "description": "Habitación actualmente ocupada.",
                    "position": 1,
                    "isDefault": false,
                    "creationDate": "0001-01-01T00:00:00",
                    "posX": 300.0000000000,
                    "posY": 200.0000000000,
                    "color": null,
                    "exported": false
                },
                {
                    "uniqueId": "343b82ca-2c2e-460c-b72c-5487015c308b",
                    "value": "Limpieza",
                    "description": "Habitación en proceso de limpieza.",
                    "position": 2,
                    "isDefault": false,
                    "creationDate": "0001-01-01T00:00:00",
                    "posX": 500.0000000000,
                    "posY": 200.0000000000,
                    "color": null,
                    "exported": false
                },
                {
                    "uniqueId": "807640d1-b338-40db-87fa-73c5843c34b6",
                    "value": "Mantenimiento",
                    "description": "Habitación en mantenimiento.",
                    "position": 3,
                    "isDefault": false,
                    "creationDate": "0001-01-01T00:00:00",
                    "posX": 700.0000000000,
                    "posY": 200.0000000000,
                    "color": null,
                    "exported": false
                }
            ],
            "transitions": [
                {
                    "uniqueId": "c5b9b34a-54cd-44cd-93bf-188ee6367f63",
                    "name": null,
                    "description": null,
                    "color": null,
                    "fromElement": "e0a4f0d2-c710-44fe-9de1-44113a27a222",
                    "toElement": "343b82ca-2c2e-460c-b72c-5487015c308b",
                    "triggers": [],
                    "users": [],
                    "groups": [],
                    "userCanExecute": false
                },
                {
                    "uniqueId": "3e4bb204-030d-4671-8aea-56f2cc012a49",
                    "name": null,
                    "description": null,
                    "color": null,
                    "fromElement": "343b82ca-2c2e-460c-b72c-5487015c308b",
                    "toElement": "807640d1-b338-40db-87fa-73c5843c34b6",
                    "triggers": [],
                    "users": [],
                    "groups": [],
                    "userCanExecute": false
                },
                {
                    "uniqueId": "bbff15bb-e53d-466f-a95a-f89e68b097f1",
                    "name": null,
                    "description": null,
                    "color": null,
                    "fromElement": "3ef145de-f051-455d-9dbd-d65b0d15f9af",
                    "toElement": "e0a4f0d2-c710-44fe-9de1-44113a27a222",
                    "triggers": [],
                    "users": [],
                    "groups": [],
                    "userCanExecute": false
                }
            ],
            "uniqueId": "abd5c2ec-6e79-4abd-8989-f28bc2c97329",
            "name": "Estado Habitación",
            "description": "Flujo de estados para habitaciones.",
            "ownerUniqueId": "270924ee-03ef-413c-bdab-d086fe76440f",
            "creationDate": "2025-07-15T18:18:43.47Z",
            "modificationDate": "2025-07-15T18:18:43.647Z",
            "iconFont": "sync_alt",
            "iconColor": "9575cd"
        }
    ]
}


`.trim()

  const completion = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: prompt }
    ],
    response_format: { type: 'json_object' },
    temperature: 0.3
  })

  const jsonText = completion.choices[0].message.content.trim()
  const parsed = JSON.parse(jsonText)

  // Correcciones y validaciones
  parsed.forms = (parsed.forms || []).map((form) => {
    form.uniqueId = form.uniqueId || uuidv4()
    form.name = form.name?.slice(0, 25) || 'Formulario'
    form.fields = (form.fields || []).map((field, i) => ({
      ...field,
      uniqueId: field.uniqueId || uuidv4(),
      position: i,
      isRequired: field.isRequired ?? false
    }))
    return form
  })

  parsed.tags = parsed.tags || []
  parsed.lists = parsed.lists || []
  parsed.workflows = parsed.workflows || []

  return parsed
}
