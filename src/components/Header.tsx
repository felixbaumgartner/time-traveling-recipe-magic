
import { Clock, UtensilsCrossed } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-parchment border-b border-aged p-4 shadow-sm">
      <div className="container flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <Clock className="h-6 w-6 text-ink" />
            <UtensilsCrossed className="h-6 w-6 text-ink" />
          </div>
          <h1 className="text-2xl font-bold text-ink font-medieval">Temporal Recipe Transformer</h1>
        </div>
        <p className="text-sm text-ink/70 italic hidden md:block">Journey through culinary history</p>
      </div>
    </header>
  );
};

export default Header;
