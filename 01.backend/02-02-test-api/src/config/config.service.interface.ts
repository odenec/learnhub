export interface IConfigService {
	get: <T extends string | number>(ket: string) => T;
}
