import { CHANGE_BREADCRUMB } from './../actionTypes';

export const breadcrumbAction = (str) => ({
	type: CHANGE_BREADCRUMB,
	str
})
