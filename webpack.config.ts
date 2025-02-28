import path from 'path'
import type {Configuration} from "webpack";
import {buildWebpack} from "./config/build/buildWebpack";
import {BuildPaths} from "./config/build/types/types";


type EnvVariables = {
    mode: 'production' | 'development'
    port: number,
}

export default (env: EnvVariables) => {
    const paths: BuildPaths = {
        entry: path.resolve(__dirname, 'src', 'index.tsx'),
        output: path.resolve(__dirname, 'dist'),
        public: path.resolve(__dirname, 'public'),
        html: path.resolve(__dirname, 'public', 'index.html'),
        src: path.resolve(__dirname, 'src'),
    }

    const config: Configuration = buildWebpack({
        port: env.port ?? 8080,
        mode: env.mode ?? 'development',
        paths,
    })

    return config
}


