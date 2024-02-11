import ContentLayout from '../../../components/Layout/ContentLayout';
import SideMenu from '../components/SideMenu';
import ContentsArea from '../components/PreferencefContentsArea';



function Preference(isDemo) {

  return (
		<ContentLayout>
			<ContentsArea />
			<SideMenu />
		</ContentLayout>
	);
}

export default Preference
