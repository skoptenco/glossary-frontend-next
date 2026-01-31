import {PropsWithChildren} from "react";
import clsx from "clsx";

interface PageWrapperProps extends PropsWithChildren {
    transparent?: boolean;
}

export default function PageWrapper(props: PageWrapperProps) {
    const { children, transparent } = props;

    return (
        <div className={clsx(
            "flex flex-col w-full h-full gap-6 p-4 text-black",
            transparent ? "bg-transparent" : "bg-white",
        )}>
            {children}
        </div>
    )
}