export type LoginForm = {
    username: string
    password: string
    isRemember: boolean
}

export type SignupForm = {
    email: string
    password: string
    fullname: string
    companyName: string
    phoneNumber: string
    country: string
    confirm?: string
    locale: string
}

export type ChangePasswordForm = {
    email: string
}