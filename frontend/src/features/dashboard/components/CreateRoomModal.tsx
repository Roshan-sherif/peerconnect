import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { generateRoom } from "../../../api/room.api.js";

export function CreateRoomModal({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [roomName, setRoomName] = useState("");
  const [description, setDescription]=useState('')

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!roomName.trim()) {
      return;
    }

    try {
      setIsSubmitting(true);

      const response = await generateRoom({
        name: roomName.trim(),
        description: description.trim() || null
      });

      console.log("Room created:", response);

      // Use the actual room ID returned by backend
      navigate(`/room/${response.room.id}`);

      setOpen(false);
    } catch (error) {
      console.error("Failed to create room:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>

      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit}>

          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">
              Create New Room
            </DialogTitle>

            <DialogDescription>
              Configure your room settings and invite participants.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-6 py-6">

            {/* Room Name */}
            <div className="space-y-2">
              <Label htmlFor="room-name">
                Room Name
              </Label>

              <Input
                id="room-name"
                placeholder="e.g. DSA Practice Session"
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
  <Label htmlFor="room-description">
    Description
  </Label>

  <Input
    id="room-description"
    placeholder="e.g. Practice DSA problems with friends"
    value={description}
    onChange={(e) => setDescription(e.target.value)}
  />
</div>

            {/* Max Participants */}
            <div className="space-y-2">
              <Label htmlFor="max-participants">
                Max Participants
              </Label>

              <select
                id="max-participants"
                defaultValue="5"
                className="w-full h-10 px-3 py-2 border border-slate-200 rounded-md outline-none focus:ring-2 focus:ring-primary focus:border-primary text-sm bg-white"
              >
                <option value="2">2 Users</option>
                <option value="3">3 Users</option>
                <option value="4">4 Users</option>
                <option value="5">5 Users</option>
              </select>
            </div>

            {/* Room Duration */}
            <div className="space-y-2">
              <Label htmlFor="room-duration">
                Room Duration
              </Label>

              <select
                id="room-duration"
                defaultValue="2"
                className="w-full h-10 px-3 py-2 border border-slate-200 rounded-md outline-none focus:ring-2 focus:ring-primary focus:border-primary text-sm bg-white"
              >
                <option value="1">1 Hour</option>
                <option value="2">2 Hours</option>
                <option value="4">4 Hours</option>
                <option value="none">No Limit</option>
              </select>
            </div>

            {/* Permissions */}
            <div className="space-y-4 pt-4 border-t border-slate-100">

              <h4 className="font-medium text-sm text-slate-900">
                Permissions
              </h4>

              <div className="grid grid-cols-2 gap-4">

                <div className="space-y-2">
                  <Label
                    htmlFor="edit-permission"
                    className="text-xs text-slate-500"
                  >
                    Code Edit Permission
                  </Label>

                  <select
                    id="edit-permission"
                    defaultValue="everyone"
                    className="w-full h-10 px-3 py-2 border border-slate-200 rounded-md outline-none focus:ring-2 focus:ring-primary focus:border-primary text-sm bg-white"
                  >
                    <option value="everyone">
                      Everyone
                    </option>

                    <option value="host">
                      Host Only
                    </option>
                  </select>
                </div>

                

                <div className="space-y-2">
                  <Label
                    htmlFor="run-permission"
                    className="text-xs text-slate-500"
                  >
                    Code Run Permission
                  </Label>

                  <select
                    id="run-permission"
                    defaultValue="everyone"
                    className="w-full h-10 px-3 py-2 border border-slate-200 rounded-md outline-none focus:ring-2 focus:ring-primary focus:border-primary text-sm bg-white"
                  >
                    <option value="everyone">
                      Everyone
                    </option>

                    <option value="host">
                      Host Only
                    </option>
                  </select>
                </div>

              </div>

              <div className="flex items-center space-x-2 pt-2">

                <input
                  type="checkbox"
                  id="allow-chat"
                  defaultChecked
                  className="rounded border-slate-300 text-primary focus:ring-primary h-4 w-4"
                />

                <Label
                  htmlFor="allow-chat"
                  className="font-normal"
                >
                  Allow Text Chat
                </Label>

              </div>

            </div>
          </div>

          <div className="flex justify-end gap-3">

            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting
                ? "Creating..."
                : "Create Room"}
            </Button>

          </div>

        </form>
      </DialogContent>
    </Dialog>
  );
}