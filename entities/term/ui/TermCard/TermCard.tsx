import type {FC} from "react";
import type {Term} from "@/shared/model/term";

interface TermCardProps {
    term: Term;
}

const TermCard: FC<TermCardProps> = props => {

    const { term } = props;

    return (
        <a
            className="h-80 bg-white rounded-2xl flex flex-col gap-2 py-3 px-2 cursor-pointer"
            href={`/terms/${term.keyword}`}
        >
            <h3 className="text-lg font-medium">{term.title}</h3>
            <p style={{ color: "#3B3B3B80" }} className="text-sm font-normal">{term.description}</p>
        </a>
    )
};

export default TermCard;