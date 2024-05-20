import React from "react";

interface WorkflowCardProps {
  imageSrc: string;
  header: string;
  description: string;
}

const WorkflowCard: React.FC<WorkflowCardProps> = ({
  imageSrc,
  header,
  description,
}) => {
  return (
    <div className="flex items-center bg-[#22262C] rounded-lg shadow-lg px-2 overflow-hidden">
      <img className="w-16 h-16 mr-auto" src={imageSrc} alt={header} />
      <div className="ml-1 mr-auto ">
        <h3 className="text-sm font-medium text-[#D7D7DB]">{header}</h3>
        <p className="text-[#A5A5AD] text-[10px]">{description}</p>
      </div>
    </div>
  );
};

export default WorkflowCard;
