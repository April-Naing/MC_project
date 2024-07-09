import Loading from "@/assets/icons/loading.svg?react";

const IsLoading = () => {
  return (
    <div className="">
      <div className="flex justify-center mt-8">
        <Loading className="w-20 icon text-slate-500">Loading</Loading>
      </div>
      <p className="text-center text-slate-500 my-4">Loading...</p>
    </div>
  );
};

export default IsLoading;
