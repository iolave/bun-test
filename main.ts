import Package from './package.json';

export default function helloWorld() {
	console.log("Hello World from version:", Package.version);
}
