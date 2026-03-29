import {FlowGraph} from "@/widgets/graph";
import {PageTitle} from "@/shared/ui/pageTitle";
import {PageWrapper} from "@/shared/ui/pageWrapper";
import type {Metadata} from "next";

export const metadata: Metadata = {
    title: "Семантический граф связи SEO терминовА",
    description: `
        Данная страница отображает семантический граф связи между терминами.
        Он необходим для визуального отображения и правильного восприятия структуры терминов, то есть того как один термин связан с другим.
        Семантический граф SEO-терминов с визуализацией связей между понятиями: ключевые слова, индексация, ранжирование, релевантность, трафик, SERP и другие элементы поисковой оптимизации. 
    `,
    robots: {
        index: true,
        follow: true,
    },
    alternates: {
        canonical: `${process.env.NEXT_PUBLIC_HOST_URL}/graph`
    }
}

export default function Page() {
    return (
        <PageWrapper transparent>
            <PageTitle color="#FFF">Семантический граф связи</PageTitle>
            <div style={{width: '100vw', height: '100vh'}}>
                <FlowGraph/>
            </div>
        </PageWrapper>
    )
}