
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { timePeriods } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Clock, Sparkles, Calendar, BookOpen } from "lucide-react";

interface TimePeriodSelectorProps {
  onSelectTimePeriod: (period: string) => void;
  disabled?: boolean;
}

const TimePeriodSelector = ({ onSelectTimePeriod, disabled = false }: TimePeriodSelectorProps) => {
  const [selectedPeriod, setSelectedPeriod] = useState<string | null>(null);
  const [hoveredPeriod, setHoveredPeriod] = useState<string | null>(null);

  const handleSelect = (period: string) => {
    setSelectedPeriod(period);
    onSelectTimePeriod(period);
  };

  useEffect(() => {
    if (disabled) {
      setSelectedPeriod(null);
    }
  }, [disabled]);

  const getTimelineIcon = (index: number) => {
    const icons = [
      <BookOpen key="book" className="h-3 w-3 text-aged-dark" />,
      <Calendar key="calendar" className="h-3 w-3 text-medieval-primary" />,
      <Clock key="clock" className="h-3 w-3 text-victorian-primary" />,
      <Sparkles key="sparkles" className="h-3 w-3 text-future-primary" />
    ];
    return icons[index];
  };

  return (
    <Card className="recipe-card glow-card overflow-hidden">
      <CardHeader className="pb-2 bg-gradient-to-r from-parchment via-aged-light/30 to-parchment">
        <CardTitle className="text-ink text-xl text-left flex items-center">
          <Clock className="h-6 w-6 mr-2 text-medieval-primary" />
          Select Time Period
          <Sparkles className="h-5 w-5 ml-2 text-victorian-primary" />
        </CardTitle>
        <CardDescription className="text-ink/70 text-left">
          Choose an era to transform your recipe through history
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="relative mb-12">
          <div className="absolute left-0 right-0 h-2 top-1/2 -translate-y-1/2 bg-aged/30 rounded-full"></div>
          <div className="absolute left-0 right-0 h-2 top-1/2 -translate-y-1/2 bg-gradient-to-r from-medieval-primary via-victorian-primary to-future-primary rounded-full transform origin-left step-indicator-progress"></div>
          <div className="flex justify-between relative">
            {timePeriods.map((period, index) => (
              <div 
                key={period.id} 
                className="flex flex-col items-center relative z-10"
                onMouseEnter={() => setHoveredPeriod(period.id)}
                onMouseLeave={() => setHoveredPeriod(null)}
              >
                <div 
                  className={cn(
                    "w-6 h-6 rounded-full border-2 border-aged bg-parchment cursor-pointer transition-all duration-300 flex items-center justify-center hover:scale-125",
                    selectedPeriod === period.id && "w-8 h-8 bg-gradient-to-r from-medieval-primary via-victorian-primary to-future-primary border-white shadow-lg",
                    hoveredPeriod === period.id && "shadow-md scale-110"
                  )}
                  onClick={() => !disabled && handleSelect(period.id)}
                >
                  {getTimelineIcon(index)}
                </div>
                <span className={cn(
                  "text-xs text-ink/70 mt-2 transform -rotate-45 origin-top-left absolute top-8 left-0 whitespace-nowrap transition-all duration-300",
                  selectedPeriod === period.id && "font-bold text-ink text-sm",
                  hoveredPeriod === period.id && "text-ink font-semibold",
                  index === 0 && "rotate-0 origin-top",
                  index === timePeriods.length - 1 && "-rotate-90 origin-top-right left-auto right-0"
                )}>
                  {period.shortName}
                </span>
                {hoveredPeriod === period.id && (
                  <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-ink text-parchment px-2 py-1 rounded text-xs whitespace-nowrap animate-fade-in">
                    {period.years}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
          {timePeriods.map((period, index) => (
            <Button
              key={period.id}
              variant={selectedPeriod === period.id ? "default" : "outline"}
              className={cn(
                "h-24 flex flex-col p-3 period-button relative overflow-hidden group",
                selectedPeriod === period.id 
                  ? "bg-gradient-to-r from-medieval-primary via-victorian-primary to-future-primary text-parchment shadow-lg" 
                  : "bg-parchment/80 border-aged text-ink hover:border-medieval-primary/50",
                period.fontClass
              )}
              onClick={() => !disabled && handleSelect(period.id)}
              disabled={disabled}
            >
              <span className="absolute inset-0 bg-gradient-to-r from-medieval-primary/10 via-victorian-primary/10 to-future-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <Sparkles className={cn(
                "h-4 w-4 absolute top-1 right-1 opacity-0 transition-opacity duration-300",
                selectedPeriod === period.id ? "opacity-100 text-white" : "group-hover:opacity-100 text-medieval-primary"
              )} />
              <span className="text-sm font-bold">{period.name}</span>
              <span className="text-xs opacity-80">{period.years}</span>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TimePeriodSelector;
