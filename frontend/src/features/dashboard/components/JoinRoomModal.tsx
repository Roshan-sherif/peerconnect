import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { joinRoom } from "../../../api/room.api.js";



export function JoinRoomModal({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [roomId, setRoomId] = useState("");
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(e)
    console.log(roomId)
    const responce = await joinRoom(roomId)
    console.log(responce)
    navigate(`/room/`);
  };

  const handleCodeChange = (index: number, value: string) => {
    if (value.length > 1) value = value.slice(0, 1);
    const newCode = [...code];
    newCode[index] = value.toUpperCase();
    setCode(newCode);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`code-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      const prevInput = document.getElementById(`code-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">Join Existing Room</DialogTitle>
            <DialogDescription>
              Enter the room ID, invite link, or 6-digit code.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-6 py-6">
            <div className="space-y-2">
              <Label htmlFor="link">Room ID or Invite Link</Label>
              <Input 
                id="link" 
                placeholder="Enter room ID or link" 
                value={roomId}
                onChange={(e) => setRoomId(e.target.value)}
              />
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-slate-200" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-slate-500">Or</span>
              </div>
            </div>

            <div className="space-y-3">
              <Label className="text-center block">Enter Room Code</Label>
              <div className="flex justify-center gap-2">
                {code.map((digit, i) => (
                  <Input
                    key={i}
                    id={`code-${i}`}
                    type="text"
                    inputMode="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleCodeChange(i, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(i, e)}
                    className="w-12 h-14 text-center text-xl font-bold uppercase rounded-lg border-slate-200 focus:border-primary focus:ring-primary shadow-sm"
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="flex justify-center gap-3 mt-2">
            <Button type="button" variant="outline" className="w-1/3" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" className="w-2/3" disabled={isSubmitting || (!roomId && code.join("").length < 6)}>
              {isSubmitting ? "Joining..." : "Join Room"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
