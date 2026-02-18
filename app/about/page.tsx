import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { siteConfig } from "@/config/site.config";

export const metadata = {
  title: "About",
};

export default function AboutPage() {
  const { heading, story, team, certifications } = siteConfig.pages.about;

  return (
    <>
      <Nav />
      <main>
        <section className="bg-muted/50 py-16">
          <div className="container text-center">
            <h1 className="mb-4">{heading}</h1>
          </div>
        </section>

        <section className="container py-16">
          <div className="mx-auto max-w-3xl">
            <div className="prose prose-neutral dark:prose-invert prose-lg">
              <p>{story}</p>
            </div>
          </div>
        </section>

        {team && team.length > 0 && (
          <section className="bg-muted/30 py-16">
            <div className="container">
              <h2 className="mb-12 text-center">Meet Our Team</h2>
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {team.map((member, index) => (
                  <div
                    key={index}
                    className="rounded-lg border bg-card p-6 text-center"
                  >
                    {member.photo && (
                      <div className="mx-auto mb-4 h-24 w-24 overflow-hidden rounded-full">
                        <img
                          src={member.photo}
                          alt={member.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    )}
                    <h3 className="mb-1 text-xl font-semibold">
                      {member.name}
                    </h3>
                    <p className="mb-2 text-sm text-primary">{member.role}</p>
                    {member.bio && (
                      <p className="text-sm text-muted-foreground">
                        {member.bio}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {certifications && certifications.length > 0 && (
          <section className="container py-16">
            <h2 className="mb-8 text-center">Certifications & Credentials</h2>
            <div className="mx-auto max-w-2xl">
              <ul className="space-y-3">
                {certifications.map((cert, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-3 rounded-lg border bg-card p-4"
                  >
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <svg
                        className="h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <span className="font-medium">{cert}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
