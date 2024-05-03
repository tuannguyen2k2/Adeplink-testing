import { z } from 'zod'

const configSchema = z.object({
  NEXT_APP_API_URL: z.string()
})

const configProject = configSchema.safeParse({
  NEXT_PUBLIC_API_ENDPOINT: process.env.NEXT_APP_API_URL
})
if (!configProject.success) {
  console.error(configProject.error.issues)
  throw new Error('Invalid value in .env file')
}

const envConfig = configProject.data
export default envConfig