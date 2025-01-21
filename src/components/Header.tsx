import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import AuthMenu from "./Navigation/AuthMenu";
import AnonMenu from "./Navigation/AnonMenu";

const Header = async () => {
  const { isAuthenticated, getPermissions } = getKindeServerSession();
  const authenticated = await isAuthenticated();
  const rechten = await getPermissions();

  if (authenticated) {
    return (
      <AuthMenu
        isAdmin={(rechten && rechten?.permissions.includes("admin")) || false}
      />
    );
  } else {
    return <AnonMenu />;
  }
};

export default Header;
