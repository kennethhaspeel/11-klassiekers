import { GetUitslagByWedstrijdidAction } from "../../../../../prisma/actions/UitslagActions";
import { Uitslag } from "@prisma/client";

import { GetUserMetSelectiesAction } from "../../../../../prisma/actions/UserActions";
import { DeelnemersMetSelectie } from "../../../../../prisma/queries/SelectieQueries";

type Params = Promise<{ wedstrijdid: number }>;

const VerwerkTussenstand = async ({ params }: { params: Params }) => {
  const { wedstrijdid } = await params;
  console.log(wedstrijdid);

  const getUitslag: Promise<Uitslag[] | null | undefined> =
    GetUitslagByWedstrijdidAction(wedstrijdid);
  const getSelecties: Promise<DeelnemersMetSelectie> =
    GetUserMetSelectiesAction();

  const [uitslag, selecties] = await Promise.all([getUitslag, getSelecties]);
  console.log(uitslag);
  console.log(selecties);

  return (
    <>
      {selecties
        ? selecties.map((deelnemer) => (
            <>
              <p key={deelnemer.id}>{deelnemer.ploegnaam}</p>
              {deelnemer.Selectie.map((renner) => (
                <p key={renner.id}>{renner.renner.naam}</p>
              ))}
            </>
          ))
        : ""}
    </>
  );
};

export default VerwerkTussenstand;
