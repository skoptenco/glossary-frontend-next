"use server"
import {headers} from "next/headers";
import {ActiveLink} from "@/shared/ui/activeLink";

const links = [
    {label: "Главная", href: "/"},
    {label: "Глоссарий", href: "/terms"},
    {label: "Семантический граф", href: "/graph"}
];

export default async function Header() {
    const headerList = await headers();
    const pathname = headerList.get("x-current-path");

    return (
        <div className="flex flex-row justify-between items-center py-4">
            <div className="flex flex-row items-center gap-2">
                {links.map(({label, href}) => {

                    const isActive = () => {
                        return pathname?.split("/")[1] === href.split("/")[1];
                    }

                    return (
                        <ActiveLink
                            key={href}
                            href={href}
                            active={isActive()}>
                            {label}
                        </ActiveLink>
                    );
                })}
            </div>
        </div>
    )
}