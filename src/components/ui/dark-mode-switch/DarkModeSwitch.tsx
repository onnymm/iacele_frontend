import useDarkMode from "@/hooks/ui/useDarkMode"
import { Switch } from "../switch";

const DarkModeSwitch = () => {

    const { darkMode, switchDarkMode } = useDarkMode();

    return (
        <Switch checked={darkMode} onCheckedChange={switchDarkMode} />
    );
};

export default DarkModeSwitch;
