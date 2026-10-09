import { useApi } from '@directus/extensions-sdk';
import { useI18n } from '../../../../composables/use-i18n';
import { useStores } from '@directus/extensions-sdk';
import { unexpectedError } from '../../../../utils/unexpected-error';
import { ItemPermissions } from '@directus/types';
import { computedAsync } from '@vueuse/core';
import { ref, unref } from 'vue';
import { Collection, PrimaryKey } from '../../types';

const defaultPermissions: ItemPermissions = {
	update: {
		access: false,
	},
	delete: {
		access: false,
	},
	share: {
		access: false,
	},
};

export const fetchItemPermissions = (collection: Collection, primaryKey: PrimaryKey) => {
	const loading = ref(false);
	const refreshKey = ref(0);

	const { t } = useI18n();

	const fetchedItemPermissions = computedAsync(
		async () => {
			refreshKey.value;

			const primaryKeyValue = unref(primaryKey);

			try {
				const response = await useApi().get<{ data: ItemPermissions }>(
					`/permissions/me/${unref(collection)}${primaryKeyValue !== null ? `/${primaryKeyValue}` : ''}`,
				);

				return response.data.data;
			} catch (error) {
				unexpectedError(error, useStores().useNotificationsStore(), t);

				// Optimistic in case of errors to not block UI
				return {
					update: {
						access: true,
					},
					delete: {
						access: true,
					},
					share: {
						access: true,
					},
				};
			}
		},
		defaultPermissions,
		{ lazy: true, evaluating: loading },
	);

	const refresh = () => refreshKey.value++;

	return { loading, refresh, fetchedItemPermissions };
};
