import WorkflowCard from "../../workflows/components/WorkflowCard";
import DemoImg from "./demo-img.svg";

export const initialTreeData = [
    {
      id: "v1",
      name: "v1",
      type: "directory",
      children: [
        {
          id: "v1/apparel-shoots",
          name: "apparel-shoots",
          type: "directory",
          children: [
            {
              id: "v1/apparel-shoots/segment-image",
              type: "card",
              component: (
                <WorkflowCard
                  header={"Segmentation Workflow"}
                  description={"/segment-image"}
                  imageSrc={DemoImg}
                />
              ),
            },
          ],
        },
      ],
    },
    {
      id: "src",
      name: "v1",
      type: "directory",
      children: [
        {
          id: "src/Avatar.tsx",
          name: "Avatar.tsx",
          type: "file",
          status: "added",
        },
        {
          id: "src/Button.tsx",
          name: "Button.tsx",
          type: "file",
          status: "modified",
        },
      ],
    },
    {
      id: "v3",
      name: "v3",
      type: "directory",
      children: [
        {
          id: "src/Avatar.tsx",
          name: "Avatar.tsx",
          type: "file",
          status: "added",
        },
        {
          id: "src/Button.tsx",
          name: "Button.tsx",
          type: "file",
          status: "modified",
        },
      ],
    },
  ];