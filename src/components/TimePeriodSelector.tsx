
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { timePeriods } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface TimePeriodSelectorProps {
  onSelectTimePeriod: (period: string) => void;
  disabled?: boolean;
}

const TimePeriodSelector = ({ onSelectTimePeriod, disabled = false }: TimePeriodSelectorProps) => {
  const [selectedPeriod, setSelectedPeriod] = useState<string | null>(null);

  const handleSelect = (period: string) => {
    setSelectedPeriod(period);
    onSelectTimePeriod(period);
  };

  useEffect(() => {
    if (disabled) {
      setSelectedPeriod(null);
    }
  }, [disabled]);

  return (
    <Card className="recipe-card">
      <CardHeader className="pb-2">
        <CardTitle className="text-ink text-xl text-left">Select Time Period</CardTitle>
        <CardDescription className="text-ink/70 text-left">
          Choose an era to transform your recipe
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-2">
        <div className="relative mb-10">
          <div className="absolute left-0 right-0 h-1 top-1/2 -translate-y-1/2 bg-aged/50 animate-timeline-grow origin-left"></div>
          <div className="flex justify-between relative">
            {timePeriods.map((period, index) => (
              <div key={period.id} className="flex flex-col items-center relative z-10">
                <div 
                  className={cn(
                    "w-4 h-4 rounded-full border-2 border-aged bg-parchment cursor-pointer transition-all duration-200",
                    selectedPeriod === period.id && "w-6 h-6 bg-ink border-ink"
                  )}
                  onClick={() => !disabled && handleSelect(period.id)}
                ></div>
                <span className={cn(
                  "text-xs text-ink/70 mt-1 transform -rotate-45 origin-top-left absolute top-6 left-0 whitespace-nowrap",
                  selectedPeriod === period.id && "font-bold text-ink",
                  index === 0 && "rotate-0 origin-top",
                  index === timePeriods.length - 1 && "-rotate-90 origin-top-right left-auto right-0"
                )}>
                  {period.shortName}
                </span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {timePeriods.map((period) => (
            <Button
              key={period.id}
              variant={selectedPeriod === period.id ? "default" : "outline"}
              className={cn(
                "h-20 flex flex-col p-2 period-button",
                selectedPeriod === period.id ? "bg-ink text-parchment" : "bg-parchment/50 border-aged text-ink",
                period.fontClass
              )}
              onClick={() => !disabled && handleSelect(period.id)}
              disabled={disabled}
            >
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
