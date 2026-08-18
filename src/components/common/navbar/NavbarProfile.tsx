import userTemplate from "@/constants/api/userTemplate";
import useUserData from "@/hooks/app/useUserData";



const NavbarProfile = () => {

    // Obtención de los datos del usuario de la sesión
    const { userData } = useUserData();

    // Si los datos de usuario son la plantilla predeterminada no se renderiza nada
    if ( userData === userTemplate ) return null;

    return (
        <div id="navbar-profile" className="flex flex-row justify-end items-center gap-2 w-full h-12 group-[.iacele-navbar]:cursor-pointer">
            <div className="group-[.iacele-navbar]:hidden flex group-[.iacele-navbar]:md:flex flex-col items-start group-[.iacele-navbar]:md:items-end w-[calc(100%-3rem)]">
                <p className="w-full overflow-hidden text-ellipsis whitespace-nowrap">{userData.name}</p>
                <p className="text-primary text-xs">@{userData.login}</p>
            </div>
            <img src={`data:image/jpeg;base64,${userData.profile_picture}` as string} className="rounded-full size-10" />
        </div>
    );
};

export default NavbarProfile;
