export enum Status{
    ALL = 'ALL',
    SERVER_UP = 'SERVER_UP',
    SERVER_DOWN = 'SERVER_DOWN'
}

export const StatusStringMapping: Record<Status, string> = {
    [Status.ALL] : "ALL",
    [Status.SERVER_UP] : "SERVER UP",
    [Status.SERVER_DOWN] : "SERVER DOWN",
}