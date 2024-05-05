import logo from "@/assets/react.svg";
import ExplorerTreeView from "./ExplorerTreeView";

export const ExplorerTab = () => {
  return (
    <>
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="flex justify-center">
            <img className="h-24 w-auto" src={logo} alt="Workflow" />
          </div>

          <h2 className="mt-3 text-center text-3xl font-extrabold text-gray-900">
            Explorer
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <ExplorerTreeView />
          </div>
        </div>
      </div>
    </>
  );
};
