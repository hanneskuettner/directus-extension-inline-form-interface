import { defineInterface } from '@directus/extensions-sdk';
import InterfaceInlineFormM2O from './inline-form-m2o.vue';

export default defineInterface({
	id: 'inline-form-m2o',
	name: 'Inline Form',
	description: 'Edit a related item inside the current form.',
	icon: 'view_agenda',
	component: InterfaceInlineFormM2O,
	types: ['uuid', 'string', 'text', 'integer', 'bigInteger'],
	relational: true,
	localTypes: ['m2o'],
	group: 'relational',
	options: () => {
		return [
			{
				field: 'createRelatedItem',
				type: 'string',
				name: 'Create Related Item',
				schema: {
					default_value: 'withContent',
				},
				meta: {
					width: 'full',
					interface: 'select-dropdown',
					options: {
						choices: [
							{
								text: 'Only with Content',
								value: 'withContent',
							},
							{
								text: 'Always',
								value: 'always',
							},
						],
					},
				},
			},
		];
	},
	recommendedDisplays: ['related-values'],
});
