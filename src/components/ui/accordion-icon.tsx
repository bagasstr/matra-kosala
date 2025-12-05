import { useState } from "react";
import { AccordionTrigger } from "@/components/ui/accordion";

const AccordionIcon = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <span
      className="text-white text-sm font-bold"
      onClick={() => setIsOpen((prev) => !prev)}
    >
      {isOpen ? "-" : "+"}
    </span>
  );
};
