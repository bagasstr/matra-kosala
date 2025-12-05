interface ClientEnv {
  API_URL: string
  BASE_URL: string
  APP_ENV: 'development' | 'staging' | 'production'
  IMAGE_URL: string
}

export const clientEnv: ClientEnv = {
  API_URL: process.env.NEXT_PUBLIC_API_URL!,
  BASE_URL: process.env.NEXT_PUBLIC_BASE_URL!,
  APP_ENV: process.env.NEXT_PUBLIC_APP_ENV as ClientEnv['APP_ENV'],
  IMAGE_URL: process.env.NEXT_PUBLIC_IMAGE_URL!,
}
