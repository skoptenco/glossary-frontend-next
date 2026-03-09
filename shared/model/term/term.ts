export type Term = {
    title: string;
    keyword: string;
    description: string;
};

export type TermDetailed = Term & {
    full_description: string;
    meta_description: string;
}

export type TermUpdate = {
    description: string;
};

export type TermCreate = Term & {

};