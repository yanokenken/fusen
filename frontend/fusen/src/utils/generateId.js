import {nanoid} from 'nanoid';

export const generateNanoId = (prefix="", length=10) => {
	if (prefix) {
		return `${prefix}_${nanoid(length)};`
	}
	return `new_${nanoid(length)};`
}

