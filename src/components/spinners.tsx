import { Loader2 } from "lucide-react";

const SpinnersBlok = () => {
  return (
    <div className="w-full justify-items-center space-x-4 mt-5">
      <div className="grid grid-cols-3">
        <Loader2 className="animate-spin text-red-600" size={40} />
        <Loader2 className="animate-spin text-green-600" size={40} />
        <Loader2 className="animate-spin text-cyan-600" size={40} />
      </div>
    </div>
  );
};

export default SpinnersBlok;
