"use client";

import { startTransition, useActionState } from "react";
import { Checkbox } from "./ui/checkbox";
import { updateMetFotoAction } from "../../prisma/actions/UserActions";
import { Loader2 } from "lucide-react";
interface Props {
  metFoto: boolean;
  setMetFoto: React.Dispatch<React.SetStateAction<boolean>>;
  deelnemerid:string;
}
const SetMetFoto = ({ metFoto, setMetFoto,deelnemerid }: Props) => {
 const [error,action, isPending] = useActionState(updateMetFotoAction,null);
  return (
    <>
      <div className="flex flex-row h-full">
        <label htmlFor="chkMetFoto" className="h-full align-text-bottom">Foto&lsquo;s tonen bij renners ??</label>
        <Checkbox
        
        className="ms-2"
          id="chkMetFoto"
          defaultChecked={metFoto}
          onCheckedChange={(checked) => {
            setMetFoto(checked as unknown as boolean);
            startTransition(()=>{
              action({deelnemerid:deelnemerid,metFoto:checked as unknown as boolean})
            })
            
          }}
        />
        <div className="ms-2">
          {isPending && <Loader2 className="animate-spin"/>}
        </div>
        {error && <div>error</div>}
      </div>
    </>
  );
};

export default SetMetFoto;
