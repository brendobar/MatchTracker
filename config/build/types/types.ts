export interface BuildPaths {
    entry: string
    public: string
    html: string
    output: string
    src: string
}

export interface BuildOptions {
    port: number
    paths: BuildPaths
    mode: 'production' | 'development'
}