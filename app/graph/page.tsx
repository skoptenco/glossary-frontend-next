import {FlowGraph} from "@/widgets/graph";
import {PageTitle} from "@/shared/ui/pageTitle";
import {PageWrapper} from "@/shared/ui/pageWrapper";
import type {Metadata} from "next";

export const metadata: Metadata = {
    title: "Семантический граф связи ВКР",
    description: "Семантический граф терминов SEO. Визуальное отображение связей понятий, структурирование знаний и анализ тематики продвижения сайтов.",
    robots: {
        index: true,
    },
    alternates: {
        canonical: `${process.env.NEXT_PUBLIC_HOST_URL}/graph`
    }
}

export default function Page() {
    return (
        <PageWrapper transparent>
            <PageTitle>Graph</PageTitle>
            <div style={{width: '100vw', height: '100vh'}}>
                <FlowGraph/>
            </div>
        </PageWrapper>
    )
}