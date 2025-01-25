"use client";

import { Checkbox } from "./ui/checkbox";
interface Props {
  metFoto: boolean;
  setMetFoto: React.Dispatch<React.SetStateAction<boolean>>;
}
const SetMetFoto = ({ metFoto, setMetFoto }: Props) => {

  return (
    <>
      <div>
        <label htmlFor="chkMetFoto">Foto&lsquo;s tonen bij renners ??</label>
        <Checkbox
        
        className="ms-2"
          id="chkMetFoto"
          defaultChecked={metFoto}
          onCheckedChange={(checked) => {
            setMetFoto(checked as unknown as boolean);
            if (typeof window !== "undefined") {
              localStorage.setItem("metFoto", JSON.stringify(checked as unknown as boolean));
            } 
          }}
        />
      </div>
    </>
  );
};

export default SetMetFoto;
