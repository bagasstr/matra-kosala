interface ServerEnv {
  API_URL: string
  BASE_URL: string
  APP_ENV: 'development' | 'staging' | 'production'
  IMAGE_URL: string
}

export const serverEnv: ServerEnv = {
  API_URL: process.env.API_URL!,
  BASE_URL: process.env.BASE_URL!,
  APP_ENV: process.env.APP_ENV as ServerEnv['APP_ENV'],
  IMAGE_URL: process.env.IMAGE_URL!,
}
