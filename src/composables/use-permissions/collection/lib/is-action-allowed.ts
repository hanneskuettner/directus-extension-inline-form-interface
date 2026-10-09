import { useStores } from '@directus/extensions-sdk';
import { PermissionsAction } from '@directus/types';
import { computed, unref } from 'vue';
import type { Collection } from '../../types';

export const isActionAllowed = (collection: Collection, action: PermissionsAction) => {
	const { usePermissionsStore } = useStores();
	const { hasPermission } = usePermissionsStore();

	return computed(() => {
		const collectionValue = unref(collection);

		if (!collectionValue) return false;

		return hasPermission(collectionValue, action);
	});
};
