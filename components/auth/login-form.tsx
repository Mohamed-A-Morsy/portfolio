"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useAuth } from "@/lib/auth"
import { Lock, Mail, Eye, EyeOff } from "lucide-react"
import { motion } from "framer-motion"

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email address").required("Email is required"),
  password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
})

interface FormValues {
  email: string
  password: string
}

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [loginError, setLoginError] = useState("")
  const { login } = useAuth()
  const router = useRouter()

  const handleSubmit = async (values: FormValues, { setSubmitting }: any) => {
    try {
      setLoginError("")
      const success = await login(values.email, values.password)

      if (success) {
        router.push("/admin")
      } else {
        setLoginError("Invalid email or password. Please try again.")
      }
    } catch (error) {
      setLoginError("An error occurred. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-muted/30">
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <motion.div
              className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.6, delay: 0.2, type: "spring", stiffness: 200 }}
            >
              <Lock className="h-8 w-8 text-primary" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            >
              <CardTitle className="text-2xl">Admin Login</CardTitle>
              <CardDescription>Sign in to access the admin dashboard</CardDescription>
            </motion.div>
          </CardHeader>
          <CardContent>
            {loginError && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, type: "spring", stiffness: 200 }}
              >
                <Alert variant="destructive" className="mb-6">
                  <AlertDescription>{loginError}</AlertDescription>
                </Alert>
              </motion.div>
            )}

            <motion.div
              className="mb-6 p-4 bg-muted/50 rounded-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
            >
              <p className="text-sm text-muted-foreground mb-2">Demo Credentials:</p>
              <p className="text-sm font-mono">Email: admin@portfolio.com</p>
              <p className="text-sm font-mono">Password: admin123</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
            >
              <Formik
                initialValues={{
                  email: "",
                  password: "",
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting, errors, touched }) => (
                  <Form className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Field
                          as={Input}
                          id="email"
                          name="email"
                          type="email"
                          placeholder="admin@portfolio.com"
                          className={`pl-10 ${errors.email && touched.email ? "border-destructive" : ""}`}
                        />
                      </div>
                      <ErrorMessage name="email" component="p" className="text-sm text-destructive" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Field
                          as={Input}
                          id="password"
                          name="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your password"
                          className={`pl-10 pr-10 ${errors.password && touched.password ? "border-destructive" : ""}`}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                      <ErrorMessage name="password" component="p" className="text-sm text-destructive" />
                    </div>

                    {/* Added subtle hover animations to the button */}
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button type="submit" disabled={isSubmitting} className="w-full">
                        {isSubmitting ? "Signing in..." : "Sign In"}
                      </Button>
                    </motion.div>
                  </Form>
                )}
              </Formik>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
