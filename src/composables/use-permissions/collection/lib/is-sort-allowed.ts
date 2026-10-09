import { useStores, useCollection } from '@directus/extensions-sdk';
import { computed, ref, unref } from 'vue';
import { Collection } from '../../types';
import { isFieldAllowed } from '../../utils/is-field-allowed';

export const isSortAllowed = (collection: Collection) => {
	const { info: collectionInfo } = useCollection(ref(collection));
	const userStore = useStores().useUserStore();
	const { getPermission } = useStores().usePermissionsStore();

	return computed(() => {
		const collectionValue = unref(collection);

		if (!collectionValue) return false;

		const sortField = collectionInfo.value?.meta?.sort_field;
		if (!sortField) return false;

		if (userStore.isAdmin) return true;

		const permission = getPermission(collectionValue, 'update');
		if (!permission) return false;

		return isFieldAllowed(permission, sortField);
	});
};
