import {PageTitle} from "@/shared/ui/pageTitle";
import {PageWrapper} from "@/shared/ui/pageWrapper";
import {getApi} from "@/shared/api";
import {TermCard} from "@/entities/term/ui/TermCard";
import type {Metadata} from "next";

export const metadata: Metadata = {
    title: "Список SEO терминов",
    description: `
    На данной странице представлен список терминов связанный с тематикой SEO. 
    Термины представлены в виде списка карточек с заголовком и описанием.
    Быстрый поиск, определения понятий и навигация по тематике продвижения сайтов. 
    `,
    robots: {
        index: true,
    },
    alternates: {
        canonical: `${process.env.NEXT_PUBLIC_HOST_URL}/terms`
    }
}

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