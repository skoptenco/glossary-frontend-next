import clsx from "clsx";
import Link from "next/dist/client/link";
import {ReactNode} from "react";

interface ActiveLinkProps {
    href: string;
    active: boolean;
    children?: ReactNode;
}

export default function ActiveLink(props: ActiveLinkProps) {
    const {active, children, ...restProps} = props;

    return (
        <Link
            className={clsx(
                "appearance-none border-none outline-none p-2 rounded-xl  text-sm font-semibold hover:bg-indigo-800 hover:text-white",
                active ? "bg-indigo-800 text-white" : "bg-white text-black",
            )}
            {...restProps}
        >
            {children}
        </Link>
    );
};