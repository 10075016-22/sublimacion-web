export interface IModelCardDashboard {
    id: number;
    title: string;
    icon: string;
    value: string;
    percentage: number;
}

export interface IModelCardDashboardResponse {
    id: number;
    title: string;
    icon: string;
    count: string;
    percentage: string;
}

export interface ICalendarOptions {
    plugins: any[];
    headerToolbar: {
        left: string;
        center: string;
        right: string;
    };
    initialView: string;
    initialEvents: ICalendarEvent[];
    editable: boolean;
    selectable: boolean;
    selectMirror: boolean;
    dayMaxEvents: boolean;
    weekends: boolean;
    themeSystem?: string;
    select?: (selectInfo: any) => void;
    eventClick?: (clickInfo: any) => void;
    eventsSet?: (events: any[]) => void;
    eventDisplay?: (event: any) => void;
}

export interface ICalendarEvent {
    id: string;
    title: string;
    start: string;
    end: string;
    status: boolean;
    color: string;
    client?: string;
    image?: string;
    extendedProps?: Record<string, any>
}