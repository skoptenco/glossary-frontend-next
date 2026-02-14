import {FlowGraph} from "@/widgets/graph";
import {PageTitle} from "@/shared/ui/pageTitle";
import {PageWrapper} from "@/shared/ui/pageWrapper";

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