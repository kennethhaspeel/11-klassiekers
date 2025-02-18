"use client";

//import { useState } from "react";
import { UsersMetFinancieel } from "../../../../prisma/queries/UserQueries";

interface Props {
  users: UsersMetFinancieel;
}
const Overzicht = ({ users }: Props) => {
  console.log(users);
  //const [deelnemers, setDeelnemers] = useState(users);

  return (
    <>
      <div className="flex flex-col w-full">
        <div className="text-2xl w-full">Overzicht Deelnemers</div>
        <div className="flex flex-col w-full">
          {/* {deelnemers.map((deel) => (
            <div key={deel.id}>
              {deel.naam} {deel.voornaam}
            </div>
          ))} */}
        </div>
      </div>
    </>
  );
};

export default Overzicht;
