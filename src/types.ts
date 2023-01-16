export interface Pods {
    appbar: Pod;
    menu: Pod;
    main: Pod[];
}

export interface Pod {
    name: string;
    uri: string;
    title?: string;
}