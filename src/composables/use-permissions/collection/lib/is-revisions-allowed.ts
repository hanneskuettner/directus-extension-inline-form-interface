import { useStores } from '@directus/extensions-sdk';
import { computed } from 'vue';

export const isRevisionsAllowed = () => {
	const { hasPermission } = useStores().usePermissionsStore();

	return computed(() => hasPermission('directus_revisions', 'read'));
};
