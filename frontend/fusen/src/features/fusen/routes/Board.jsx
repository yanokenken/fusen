import ContentLayout from '../../../components/Layout/ContentLayout';

import React, { useState } from 'react';
import Tab from '../components/Tab';
import CreateFusen from '../components/CreateFusen';

function Board(isDemo) {

	const [isDrawerOpen, setIsDrawerOpen] = useState(false); // サイドコンテンツエリアの表示状態
	const openDrawer = () => setIsDrawerOpen(true);
	const closeDrawer = () => setIsDrawerOpen(false);

  return (
		<ContentLayout>
			<Tab />
			<CreateFusen closeDrawer={closeDrawer} />
		</ContentLayout>
	);
}

export default Board
