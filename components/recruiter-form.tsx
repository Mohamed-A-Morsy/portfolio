"use client"

import { useState } from "react"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Briefcase, CheckCircle } from "lucide-react"
import { motion } from "framer-motion"

const validationSchema = Yup.object({
  name: Yup.string().min(2, "Name must be at least 2 characters").required("Name is required"),
  email: Yup.string().email("Invalid email address").required("Email is required"),
  company: Yup.string().min(2, "Company name must be at least 2 characters").required("Company name is required"),
  position: Yup.string().min(2, "Position must be at least 2 characters").required("Position is required"),
  message: Yup.string().min(10, "Message must be at least 10 characters").required("Message is required"),
})

interface FormValues {
  name: string
  email: string
  company: string
  position: string
  message: string
}

export function RecruiterForm() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (values: FormValues, { setSubmitting, resetForm }: any) => {
    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      console.log("Recruiter form submission:", values)

      toast({
        title: "Message sent successfully!",
        description: "Thank you for your interest. I'll get back to you soon.",
      })

      setIsSubmitted(true)
      resetForm()

      // Reset success state after 3 seconds
      setTimeout(() => setIsSubmitted(false), 3000)
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <Card className="max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <motion.div
            className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2, type: "spring", stiffness: 200 }}
          >
            <Briefcase className="h-8 w-8 text-primary" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          >
            <CardTitle className="text-2xl">Recruiter Contact Form</CardTitle>
            <CardDescription className="text-base">
              Interested in working together? Send me your opportunity details and I'll get back to you promptly.
            </CardDescription>
          </motion.div>
        </CardHeader>
        <CardContent>
          {isSubmitted ? (
            <motion.div
              className="text-center py-8 space-y-4"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2, type: "spring", stiffness: 200 }}
              >
                <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
              </motion.div>
              <h3 className="text-xl font-semibold text-green-700">Message Sent Successfully!</h3>
              <p className="text-muted-foreground">
                Thank you for reaching out. I'll review your opportunity and respond within 24 hours.
              </p>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
            >
              <Formik
                initialValues={{
                  name: "",
                  email: "",
                  company: "",
                  position: "",
                  message: "",
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting, errors, touched }) => (
                  <Form className="space-y-6">
                    <motion.div
                      className="grid md:grid-cols-2 gap-4"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
                    >
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name *</Label>
                        <Field
                          as={Input}
                          id="name"
                          name="name"
                          placeholder="John Doe"
                          className={errors.name && touched.name ? "border-destructive" : ""}
                        />
                        <ErrorMessage name="name" component="p" className="text-sm text-destructive" />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address *</Label>
                        <Field
                          as={Input}
                          id="email"
                          name="email"
                          type="email"
                          placeholder="john@company.com"
                          className={errors.email && touched.email ? "border-destructive" : ""}
                        />
                        <ErrorMessage name="email" component="p" className="text-sm text-destructive" />
                      </div>
                    </motion.div>

                    <motion.div
                      className="grid md:grid-cols-2 gap-4"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
                    >
                      <div className="space-y-2">
                        <Label htmlFor="company">Company Name *</Label>
                        <Field
                          as={Input}
                          id="company"
                          name="company"
                          placeholder="Tech Company Inc."
                          className={errors.company && touched.company ? "border-destructive" : ""}
                        />
                        <ErrorMessage name="company" component="p" className="text-sm text-destructive" />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="position">Position Title *</Label>
                        <Field
                          as={Input}
                          id="position"
                          name="position"
                          placeholder="Senior Full Stack Developer"
                          className={errors.position && touched.position ? "border-destructive" : ""}
                        />
                        <ErrorMessage name="position" component="p" className="text-sm text-destructive" />
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.7, ease: "easeOut" }}
                    >
                      <div className="space-y-2">
                        <Label htmlFor="message">Opportunity Details *</Label>
                        <Field
                          as={Textarea}
                          id="message"
                          name="message"
                          placeholder="Tell me about the role, company culture, tech stack, and what makes this opportunity exciting..."
                          rows={5}
                          className={errors.message && touched.message ? "border-destructive" : ""}
                        />
                        <ErrorMessage name="message" component="p" className="text-sm text-destructive" />
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.8, ease: "easeOut" }}
                    >
                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Button type="submit" disabled={isSubmitting} className="w-full text-lg py-6">
                          {isSubmitting ? "Sending..." : "Send Opportunity"}
                        </Button>
                      </motion.div>
                    </motion.div>
                  </Form>
                )}
              </Formik>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}
