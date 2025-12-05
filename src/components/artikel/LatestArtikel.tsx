import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { articles } from "@/lib/data";

export function LatestArtikel() {
  return (
    <section className="py-24">
      <div className="container mx-auto max-w-6xl px-4">
        <h2 className="text-xl font-medium text-primary-dark mb-8">
          Latest Artikel
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <Card
              key={article.id}
              className="flex flex-col overflow-hidden bg-white"
            >
              <CardHeader className="p-5">
                <Image
                  src={article.url_gambar}
                  alt={article.judul}
                  width={500}
                  height={500}
                  className="w-full h-48 object-cover"
                />
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-sm text-muted-foreground my-2">
                  {article.date}
                </p>
                <CardTitle className="text-base font-medium text-primary-dark my-2 line-clamp-2">
                  {article.judul}
                </CardTitle>
                <p className="text-sm text-muted-foreground line-clamp-3">
                  {article.konten}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
