import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { type LucideIcon } from "lucide-react";

interface ProcessStepProps {
  title: string;
  description: string;
  icon: LucideIcon;
}

export function ProcessStep({
  title,
  description,
  icon: Icon,
}: ProcessStepProps) {
  return (
    <Card className="flex flex-col items-center text-center">
      <CardHeader>
        <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center mb-4">
          <Icon className="w-6 h-6 text-primary-foreground" />
        </div>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}
