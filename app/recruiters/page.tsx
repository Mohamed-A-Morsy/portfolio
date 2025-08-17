import { RecruiterForm } from "@/components/recruiter-form"

export default function RecruitersPage() {
  return (
    <main className="min-h-screen bg-background py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Work With Me</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            I'm always open to discussing new opportunities with innovative companies and exciting projects.
          </p>
        </div>

        <RecruiterForm />

        <div className="mt-16 text-center">
          <h2 className="text-2xl font-semibold mb-6">What I'm Looking For</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 bg-muted/30 rounded-lg">
              <h3 className="font-semibold text-lg mb-2">Remote-First Culture</h3>
              <p className="text-muted-foreground">Companies that embrace flexible work and trust their teams.</p>
            </div>
            <div className="p-6 bg-muted/30 rounded-lg">
              <h3 className="font-semibold text-lg mb-2">Modern Tech Stack</h3>
              <p className="text-muted-foreground">Working with cutting-edge technologies and best practices.</p>
            </div>
            <div className="p-6 bg-muted/30 rounded-lg">
              <h3 className="font-semibold text-lg mb-2">Growth Opportunities</h3>
              <p className="text-muted-foreground">Roles that challenge me and offer professional development.</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
