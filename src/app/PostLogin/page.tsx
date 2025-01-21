import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { GetUserById } from "../../../prisma/queries/UserQueries";
import Aanvullen from "./Aanvullen/page";
const PostLogin = async () => {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    const dbuser = await GetUserById(user.id)
    console.log(dbuser)
    if(dbuser == null){
        return <Aanvullen naam={user.family_name!} voornaam={user.given_name!} email={user.email!} id={user.id}/>
    }
  return (
    <div>is mobile page: </div>
  )
}

export default PostLogin