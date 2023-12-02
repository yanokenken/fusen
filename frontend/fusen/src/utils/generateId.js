import {nanoid} from 'nanoid';

export const generateNanoId = (length=10) => {
	return nanoid(length);
}

