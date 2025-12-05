import { clientEnv } from "@/lib/client";
import Image from "next/image";

type CustomCardTestiProps = {
  image: string;
  name: string;
  institute: string;
  title: string;
  desc: string;
};
export default function CustomCardTesti({
  image,
  name,
  institute,
  title,
  desc,
}: CustomCardTestiProps) {
  return (
    <div className="flex items-center gap-x-2">
      <div className="">
        <div className="flex gap-x-2">
          <div className="bg-primary-light relative md:w-10 w-4"></div>
          <div className="">
            <Image
              src={`${clientEnv.IMAGE_URL}/${image}`}
              alt={title}
              width={200}
              height={200}
              quality={100}
              className="object-cover"
            />
          </div>
        </div>
        <div className="bg-primary-content md:w-full w-full mt-2 p-2 flex flex-col justify-center">
          <h2 className="text-white text-sm">{name}</h2>
          <h3 className="text-white text-xs">{institute}</h3>
        </div>
      </div>
      <div className="w-full space-y-4 ml-3">
        <h3 className="text-xl font-semibold">{title}</h3>
        <div className="bg-gray-200 w-full h-3 mt-2"></div>
        <p className="w-[80%] text-sm line-clamp-4">{desc}</p>
      </div>
    </div>
  );
}
