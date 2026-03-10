import HeadTitle from "../../components/layout/HeadTitle";
import EditProfileForm from "./EditProfileForm";

const EditProfile = () => {
  return (
    <div className="tavern-container">
      <HeadTitle title="Edit Your Profile" />
      <div className="py-6 px-12">
        <EditProfileForm />
      </div>
    </div>
  );
};

export default EditProfile;
