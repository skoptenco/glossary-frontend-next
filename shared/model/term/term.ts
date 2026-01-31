export type Term = {
    keyword: string;
    description: string;
};

export type TermUpdate = {
    description: string;
};

export type TermCreate = Term & {

};