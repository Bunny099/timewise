import axios from "axios";
import CreateProject from "../components/createProject";
import ProjectListAction from "../components/projectList";

export default function Project() {
  return (
    <div className="p-2 flex flex-col">
      <div className="py-4 border-b-2 border-gray-300">
        <CreateProject />
      </div>
      <div className="pt-4">
        <ProjectListAction />
      </div>
    </div>
  );
}
