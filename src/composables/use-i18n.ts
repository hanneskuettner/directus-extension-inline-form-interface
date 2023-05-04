import en from '@/lang/en.yaml';
import { useI18n as origI18n, UseI18nOptions } from 'vue-i18n';

export function useI18n(options?: UseI18nOptions) {
	return origI18n({
		...options,
		messages: {
			en,
		},
	});
}
