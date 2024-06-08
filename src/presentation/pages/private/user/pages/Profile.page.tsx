import { ProfileForm, UploadProfile } from "../../components";
import { UserLayout } from "../layout";

export const ProfilePage = () => {
  return (
    <UserLayout>
      <section className="mx-10 my-10 grid grid-cols-1 rounded-lg border-2 py-5 sm:container dark:border-skeleton-dark sm:mx-auto lg:grid-cols-7">
        <div className="col-span-5 p-4 md:col-span-2 lg:col-span-2">
          <UploadProfile />
        </div>
        <div className="col-span-5 p-4 lg:grid-cols-5">
          <h2 className="mb-4 text-2xl font-bold">Personal Details</h2>
          <ProfileForm />
        </div>
      </section>
    </UserLayout>
  );
};

export default ProfilePage;
