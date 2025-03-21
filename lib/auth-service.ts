// Types
type LoginData = {
  email: string
  password: string
}

type RegisterData = {
  fullName: string
  email: string
  password: string
  role: "candidate" | "recruiter" | "admin"
}

// Mock functions for authentication
// In a real app, these would make API calls to your backend

export async function loginUser(data: LoginData): Promise<void> {
  // Simulate API call
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // For demo purposes, accept any credentials
      // In a real app, this would validate against your backend
      if (data.email && data.password) {
        resolve()
      } else {
        reject(new Error("Invalid credentials"))
      }
    }, 1000)
  })
}

export async function registerUser(data: RegisterData): Promise<void> {
  // Simulate API call
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // For demo purposes, accept any valid data
      // In a real app, this would send data to your backend
      if (data.email && data.password && data.fullName) {
        resolve()
      } else {
        reject(new Error("Invalid registration data"))
      }
    }, 1000)
  })
}

export async function logoutUser(): Promise<void> {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, 500)
  })
}

