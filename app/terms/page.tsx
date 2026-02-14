import {PageTitle} from "@/shared/ui/pageTitle";
import {PageWrapper} from "@/shared/ui/pageWrapper";
import {getApi} from "@/shared/api";
import {TermCard} from "@/entities/term/ui/TermCard";

export default async function Page() {

    const terms = await getApi.getTerms();
    // const [terms, setTerms] = useState<Term[]>([]);

    // useEffect(() => {
    //     getApi.getTerms().then(response => {
    //         setTerms(response.data);
    //     })
    // }, []);

    return (
        <PageWrapper transparent>
            <PageTitle color="#FFF">Список терминов</PageTitle>
            <div className="grid grid-cols-4 gap-2">
                {terms.map(term => (
                    <TermCard term={term} key={term.keyword}/>))}
            </div>
        </PageWrapper>
    )
}