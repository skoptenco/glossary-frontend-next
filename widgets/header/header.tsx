"use client"
import {ActiveButton} from "@/shared/ui/activeButton";
import {usePathname, useRouter} from "next/navigation";

const links = [
    {label: "Главная", href: "/"},
    {label: "Глоссарий", href: "/terms"},
    {label: "Семантический граф", href: "/graph"}
];

export default function Header() {

    const router = useRouter();
    const pathname = usePathname();

    const handleButtonClick = (href: string) => {
        router.push(href);
    }

    return (
        <div className="flex flex-row justify-between items-center py-4">
            <div className="flex flex-row items-center gap-2">
                {links.map(({label, href}) => (
                    <ActiveButton
                        key={href}
                        onClick={() => handleButtonClick(href)}
                        active={pathname === href}>
                        {label}
                    </ActiveButton>
                ))}
            </div>
        </div>
    )
}