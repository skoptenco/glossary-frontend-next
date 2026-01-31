import {HTMLProps} from "react";
import clsx from "clsx";

interface ActiveButtonProps extends HTMLProps<HTMLButtonElement> {
    active: boolean;
    type?: "button" | "submit" | "reset";
}

export default function ActiveButton(props: ActiveButtonProps) {
    const {active, children, ...restProps} = props;

    return (
        <button
            className={clsx(
                "appearance-none border-none outline-none p-2 rounded-xl  text-sm font-semibold hover:bg-indigo-800 hover:text-white",
                active ? "bg-indigo-800 text-white" : "bg-white text-black",
            )}
            {...restProps}
        >
            {children}
        </button>
    );
};