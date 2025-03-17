
import { Clock } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-parchment border-b border-aged p-4 shadow-sm">
      <div className="container flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Clock className="h-6 w-6 text-ink" />
          <h1 className="text-2xl font-bold text-ink font-medieval">Temporal Recipe Transformer</h1>
        </div>
        <p className="text-sm text-ink/70 italic">Journey through culinary history</p>
      </div>
    </header>
  );
};

export default Header;
