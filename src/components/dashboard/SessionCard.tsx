
import React from "react";
import { Calendar, Clock, User, MapPin, MessageSquare } from "lucide-react";
import { CustomCard, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/CustomCard";
import CustomButton from "@/components/ui/CustomButton";
import CustomAvatar from "@/components/ui/CustomAvatar";

export interface SessionData {
  id: string;
  title: string;
  date: string;
  time: string;
  duration: string;
  counselor: {
    name: string;
    avatar?: string;
    department: string;
  };
  location: string;
  status: "upcoming" | "completed" | "cancelled";
  description?: string;
}

interface SessionCardProps {
  session: SessionData;
  onViewDetails?: (id: string) => void;
  onCancel?: (id: string) => void;
  onReschedule?: (id: string) => void;
  onMessage?: (id: string) => void;
  variant?: "default" | "compact";
  className?: string;
}

const SessionCard: React.FC<SessionCardProps> = ({
  session,
  onViewDetails,
  onCancel,
  onReschedule,
  onMessage,
  variant = "default",
  className,
}) => {
  const {
    id,
    title,
    date,
    time,
    duration,
    counselor,
    location,
    status,
    description,
  } = session;

  const statusColors = {
    upcoming: "bg-blue-500/10 text-blue-500",
    completed: "bg-green-500/10 text-green-500",
    cancelled: "bg-red-500/10 text-red-500",
  };

  const isUpcoming = status === "upcoming";

  return (
    <CustomCard className={`overflow-hidden ${className}`}>
      <div className="relative">
        {status && (
          <div
            className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-medium ${statusColors[status]}`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </div>
        )}

        <CardHeader>
          <CardTitle className="text-xl">{title}</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <CustomAvatar
                src={counselor.avatar}
                alt={counselor.name}
                size="lg"
                fallback={counselor.name}
              />
              <div>
                <p className="font-medium">{counselor.name}</p>
                <p className="text-sm text-muted-foreground">
                  {counselor.department}
                </p>
              </div>
            </div>

            {variant === "default" && description && (
              <p className="text-sm text-muted-foreground">{description}</p>
            )}

            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center gap-2">
                <Calendar size={16} className="text-muted-foreground" />
                <span className="text-sm">{date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={16} className="text-muted-foreground" />
                <span className="text-sm">
                  {time} ({duration})
                </span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-muted-foreground" />
                <span className="text-sm">{location}</span>
              </div>
              {variant === "default" && (
                <div className="flex items-center gap-2">
                  <User size={16} className="text-muted-foreground" />
                  <span className="text-sm">One-on-one</span>
                </div>
              )}
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex flex-wrap gap-2">
          {onViewDetails && (
            <CustomButton
              variant="outline"
              size="sm"
              onClick={() => onViewDetails(id)}
              className="flex-1"
            >
              View Details
            </CustomButton>
          )}

          {isUpcoming && onCancel && (
            <CustomButton
              variant="outline"
              size="sm"
              onClick={() => onCancel(id)}
              className="text-destructive hover:text-destructive-foreground hover:bg-destructive/10 flex-1"
            >
              Cancel
            </CustomButton>
          )}

          {isUpcoming && onReschedule && (
            <CustomButton
              variant="outline"
              size="sm"
              onClick={() => onReschedule(id)}
              className="flex-1"
            >
              Reschedule
            </CustomButton>
          )}

          {onMessage && (
            <CustomButton
              variant="ghost"
              size="sm"
              onClick={() => onMessage(id)}
              className="flex items-center"
            >
              <MessageSquare size={16} className="mr-1" />
              Message
            </CustomButton>
          )}
        </CardFooter>
      </div>
    </CustomCard>
  );
};

export default SessionCard;
