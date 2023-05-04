import { APIError } from '@/types';
import type { useI18n } from 'vue-i18n';

export function unexpectedError(error: Error | any | APIError, store: any, t: ReturnType<typeof useI18n>['t']): void {
	const code =
		(error as any).response?.data?.errors?.[0]?.extensions?.code || (error as APIError)?.extensions?.code || 'UNKNOWN';

	// eslint-disable-next-line no-console
	console.warn(error);

	store.add({
		title: t(`errors.${code}`),
		type: 'error',
		code,
		dialog: true,
		error,
	});
}
