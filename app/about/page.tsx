import Image from "next/image";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site.config";

export const metadata = {
  title: "About",
};

export default function AboutPage() {
  const { heading, story, team, certifications } = siteConfig.pages.about;

  return (
    <>
      <Nav />
      <main id="main-content">
        <section className="bg-muted/30 py-20">
          <Container className="text-center">
            <h1 className="mb-4 text-balance">{heading}</h1>
          </Container>
        </section>

        <section className="py-20">
          <Container narrow>
            <div className="prose prose-neutral dark:prose-invert prose-lg max-w-none">
              <p className="leading-relaxed">{story}</p>
            </div>
          </Container>
        </section>

        {team && team.length > 0 && (
          <section className="bg-muted/30 py-20">
            <Container>
              <h2 className="mb-14 text-center text-balance">Meet Our Team</h2>
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {team.map((member, index) => (
                  <div
                    key={index}
                    className="rounded-xl border bg-card p-6 text-center transition-shadow hover:shadow-md"
                  >
                    {member.photo && (
                      <div className="relative mx-auto mb-4 h-24 w-24 overflow-hidden rounded-full">
                        <Image
                          src={member.photo}
                          alt={member.name}
                          fill
                          className="object-cover"
                          sizes="96px"
                        />
                      </div>
                    )}
                    <h3 className="mb-1 text-xl font-semibold">
                      {member.name}
                    </h3>
                    <p className="mb-2 text-sm font-medium text-primary">{member.role}</p>
                    {member.bio && (
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {member.bio}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </Container>
          </section>
        )}

        {certifications && certifications.length > 0 && (
          <section className="py-20">
            <Container narrow>
              <h2 className="mb-10 text-center text-balance">Certifications & Credentials</h2>
              <ul className="space-y-3">
                {certifications.map((cert, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-4 rounded-xl border bg-card p-4"
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
            </Container>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
