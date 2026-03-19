import {getApi} from "@/shared/api";
import {PageTitle} from "@/shared/ui/pageTitle";
import {PageWrapper} from "@/shared/ui/pageWrapper";
import {Metadata} from "next";

export async function generateMetadata({params}: { params: { keyword: string } }): Promise<Metadata> {
    const {keyword} = await params;
    const term = await getApi.getTermByKeyword(keyword);

    if (!term) {
        return {};
    }

    return {
        title: `Глоссарий -- ${term.title}`,
        description: term.description,
        robots: {
            index: true,
            follow: true,
        },
        alternates: {
            canonical: `${process.env.NEXT_PUBLIC_HOST_URL}/terms/${keyword}`,
        }
    };
}

const renderText = (text: string) => {
    return (
        <>
            {text.split("\n").map(el => (<p key={el}>{el}</p>))}
        </>
    )
}

export default async function Page({params}: { params: Promise<{ keyword: string }> }) {
    const {keyword} = await params;
    const term = await getApi.getTermByKeyword(keyword);
    console.log(term)

    if (!term) {
        return (
            <PageWrapper>
                <h3>Error</h3>
            </PageWrapper>
        )
    }

    return (
        <PageWrapper>
            <PageTitle>{term.title}</PageTitle>
            {renderText(term.full_description)}
        </PageWrapper>
    )

}