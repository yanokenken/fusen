import ContentLayout from '../../../components/Layout/ContentLayout';
import SideMenu from '../components/SideMenu';
import ContentsArea from '../components/ProfileContentsArea';



function Profile(isDemo) {

  return (
		<ContentLayout>
			<ContentsArea />
			<SideMenu />
		</ContentLayout>
	);
}

export default Profile
