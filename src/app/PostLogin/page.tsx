import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { GetUserById } from "../../../prisma/queries/UserQueries";
import Aanvullen from "./Aanvullen";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { SaveLogging } from "../../../prisma/queries/LoggingQueries";
const PostLogin = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  const dbuser = await GetUserById(user.id);
  if (dbuser == null) {
    return (
      <Aanvullen
        naam={user.family_name!}
        voornaam={user.given_name!}
        email={user.email!}
        kindeid={user.id}
      />
    );
  }

  SaveLogging({deelnemerid:dbuser.id,onderwerp:'identity',boodschap:'gebruiker ingelogd'})
  return (
    <div className="py-2 w-full">
      <Alert className="bg-green-600 rounded p-4">
        <AlertTitle>U bent ingelogd</AlertTitle>
        <VisuallyHidden>
          <AlertDescription>U bent ingelogd</AlertDescription>
        </VisuallyHidden>
      </Alert>
    </div>
  );
};

export default PostLogin;
