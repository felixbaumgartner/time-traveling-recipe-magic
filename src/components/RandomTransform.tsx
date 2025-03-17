
import { Button } from "@/components/ui/button";
import { Dices, Wand2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { timePeriods } from "@/lib/constants";

interface RandomTransformProps {
  disabled: boolean;
  onRandomTransform: () => void;
}

const RandomTransform = ({ disabled, onRandomTransform }: RandomTransformProps) => {
  const { toast } = useToast();

  const handleRandomClick = () => {
    onRandomTransform();
    toast({
      title: "✨ Surprise transformation!",
      description: "Your recipe is being transformed into a random historical era.",
      duration: 3000,
    });
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4 my-6 animate-fade-in">
      <div className="flex items-center gap-2">
        <div className="h-px w-20 bg-aged"></div>
        <span className="text-ink/70 italic text-sm">or</span>
        <div className="h-px w-20 bg-aged"></div>
      </div>
      
      <Button
        onClick={handleRandomClick}
        disabled={disabled}
        variant="outline"
        className="bg-parchment/80 border-aged hover:bg-parchment text-ink group relative overflow-hidden"
      >
        <span className="relative z-10 flex items-center gap-2">
          <Wand2 className="h-5 w-5 mr-1 transition-transform group-hover:rotate-12" />
          <span>Surprise Me!</span>
          <Dices className="h-5 w-5 ml-1 transition-transform group-hover:rotate-12" />
        </span>
        <span className="absolute inset-0 bg-gradient-to-r from-amber-100/0 via-amber-100/70 to-amber-100/0 opacity-0 group-hover:opacity-100 transition-opacity -translate-x-full group-hover:translate-x-full duration-1000"></span>
      </Button>
      
      <p className="text-center text-ink/60 text-xs max-w-sm">
        Let culinary magic decide! Get your recipe transformed into a random historical era without choosing.
      </p>
    </div>
  );
};

export default RandomTransform;
