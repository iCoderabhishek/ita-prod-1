import React from "react";
import { ExternalLink, Calendar } from "lucide-react";
import { Notice } from "../types";

interface NoticeCardProps {
  notice: Notice;
}

const getLabelColor = (label: string): string => {
  switch (label) {
    case "EXAM":
      return "bg-red-100 text-red-800";
    case "ADMISSION":
      return "bg-green-100 text-green-800";
    case "FACULTY":
      return "bg-purple-100 text-purple-800";
    case "STUDENTS":
      return "bg-blue-100 text-blue-800";
    case "SPORTS":
      return "bg-orange-100 text-orange-800";
    case "COLLEGE":
      return "bg-gray-100 text-gray-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const NoticeCard: React.FC<NoticeCardProps> = ({ notice }) => {
  const formattedDate = new Date(notice.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="card hover:shadow-lg transition-shadow duration-300">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-xl font-semibold text-gray-800">{notice.title}</h3>
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${getLabelColor(
            notice.label
          )}`}
        >
          {notice.label}
        </span>
      </div>
      <p className="text-gray-600 mb-4">{notice.description}</p>
      <div className="flex justify-between items-center">
        <div className="flex items-center text-gray-500 text-sm">
          <Calendar size={16} className="mr-1" />
          <span>{formattedDate}</span>
        </div>
        <a
          href={notice.fullNoticeLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center text-primary hover:text-blue-700 transition-colors"
        >
          View Full Notice
          <ExternalLink size={16} className="ml-1" />
        </a>
      </div>
    </div>
  );
};

export default NoticeCard;
