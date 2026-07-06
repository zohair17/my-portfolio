import { notFound } from "next/navigation";
import { PROJECTS } from "../../data";
import CaseStudy from "./CaseStudy";

export function generateStaticParams() {
  return Object.keys(PROJECTS).map((slug) => ({ slug }));
}

export default async function Page({ params }) {
  const { slug } = await params;
  const data = PROJECTS[slug];
  if (!data || !data.caseStudy) notFound();
  return <CaseStudy data={data} slug={slug} />;
}
