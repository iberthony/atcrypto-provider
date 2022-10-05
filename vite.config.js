import {defineConfig} from 'vite'
import dts from "vite-plugin-dts";

export default defineConfig({
    plugins: [
        dts({
            insertTypesEntry: true,
        }),
    ],
    // build: {
    //     rollupOptions: {
    //         input: {
    //             /* relative to the root option */
    //             app: "./src/main.ts",
    //         }
    //     }
    // },
    build: {

        lib: {
            entry: 'src/index.ts',
            name: 'atcrypto-provider',

        },
    },
})
