export type GithubRepo = {
    id: number;
    name: string;
    full_name: string;
    html_url: string;
}

export type GithubResponse = {
    total_count: number;
    items: GithubRepo[];
    incomplete_results: boolean;
}