import { SEO } from "ui/components/seo";

export default function NotFound(): JSX.Element {
  return (
    <>
      <SEO
        title="Page not found / Twitter"
        description="Sorry we couldn’t find the page you were looking for."
        image="/404.png"
      />
      <div>Error 404</div>
    </>
  );
}
