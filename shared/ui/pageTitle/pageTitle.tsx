import {PropsWithChildren} from "react";

interface PageTitleProps extends PropsWithChildren {
    color?: string;
}

export default function PageTitle(props: PageTitleProps) {
    const {children, color} = props;

    return (
        <h1
            style={{color}}
            className="font-extrabold text-4xl text-black">
            {children}
        </h1>
    )
}