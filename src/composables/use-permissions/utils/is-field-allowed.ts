export const isFieldAllowed = (permission: any, field: string) => {
	if (!permission.fields) return false;

	return permission.fields.includes('*') || permission.fields.includes(field);
};
