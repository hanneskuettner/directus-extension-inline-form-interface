import path from 'node:path';
import { fileURLToPath } from 'node:url';
import alias from '@rollup/plugin-alias';
import resolve from '@rollup/plugin-node-resolve';
import yaml from "@rollup/plugin-yaml";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname);
const customResolver = resolve({
	extensions: ['.ts', '.js']
});

export default{
	plugins: [
		alias({
			customResolver,
			entries: [
				{find: /^@\/(.*)/, replacement: path.resolve(rootDir, 'src/$1')}
			]
		}),
		yaml()
  ]
}
