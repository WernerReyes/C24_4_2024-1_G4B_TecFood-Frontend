import { ProfileForm, UploadProfile } from "./";

export const Profile = () => {
  return (
    <section className="mx-10 my-10 grid grid-cols-1 rounded-lg border-2 p-4 dark:border-skeleton-dark md:mx-20 lg:grid-cols-7">
      <div className="col-span-5 lg:col-span-3 xl:col-span-2">
        <UploadProfile />
      </div>
      <div className="col-span-5 lg:col-span-4 xl:col-span-5">
        <h2 className="mb-4 text-2xl font-bold">Personal Details</h2>
        <ProfileForm />
      </div>
    </section>
  );
};
