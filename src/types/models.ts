export type AboutPage = {
    greeting?: string;
    introduction?: string;
}

export type Skill = {
    title: string;
    logo: string;
}

export type WorkPosition = {
    title: string,
    start_date: number,
    end_date?: number,
    description: string,
    inProgress: boolean,
}

export type Work = {
    description: string,
    link: string,
    logo: string,
    image: string,
    hover_emoji: string,
    positions: WorkPosition[],
    highlighted_position: number,
    skills: string[],
    order_position: number,
}

export type IdToWork = {
    id: string,
    work: Work,
}
