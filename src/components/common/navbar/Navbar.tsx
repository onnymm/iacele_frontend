import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import MainControlsContext from "@/contexts/ui/mainControlsContext";
import useUserData from "@/hooks/app/useUserData";
import useUserToken from "@/hooks/app/useUserToken";
import { useContext, useEffect, useRef } from "react";

const Navbar = () => {

    const { setElement } = useContext(MainControlsContext);

    const mainControlsRef = useRef<HTMLDivElement>(null)

    useEffect(
        () => {
            setElement(mainControlsRef.current)
        }, [setElement]
    )

    return (
        <nav id="navbar" className="z-20 sticky flex flex-col gap-2 bg-white dark:bg-[#1f2f3f] shadow p-2 w-full transition select-none">
            <div id="navbar-header" className="flex flex-row justify-between items-start border h-min min-h-12">
                <div/>
                <div/>
                <div id="navbar-profile" className="flex flex-row justify-between gap-4 pr-4 border sm:w-72 h-12">
                    <NavbarProfile />
                </div>
            </div>
            <div className="flex flex-row justify-between items-center border border-green-500 h-min min-h-12">
                <div id="navbar-main-controls" ref={mainControlsRef}/>
            </div>
        </nav>
    );
};

export default Navbar;

const NavbarProfile = () => {

    const { userData } = useUserData();

    const { removeUserToken } = useUserToken();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="border" asChild>
                <div>{userData.name}</div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuGroup>
                    <DropdownMenuLabel>
                        <Button variant='destructive' onClick={removeUserToken}>
                            Cerrar sesión
                        </Button>
                    </DropdownMenuLabel>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
