import { notFound } from "next/navigation";
import { PROJECTS } from "../data";
import ProjectGallery from "./ProjectGallery";

export function generateStaticParams() {
  return Object.keys(PROJECTS).map((slug) => ({ slug }));
}

export default async function Page({ params }) {
  const { slug } = await params;
  const data = PROJECTS[slug];
  if (!data) notFound();
  return <ProjectGallery data={data} />;
}
