
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Editor from "@monaco-editor/react";
import {
  Panel,
  PanelGroup,
  PanelResizeHandle,
} from "react-resizable-panels";
import {
  ArrowLeft,
  Copy,
  MessageSquare,
  Play,
  Send,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { getRoomByInviteCode } from "../../api/room.api";
import { socket } from "../../api/socket";

export default function RoomPage() {
  const  inviteCode  = useParams();
  const navigate = useNavigate();

  const [room, setRoom] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const [code, setCode] = useState(
    '// Welcome to PeerConnect\n\nfunction main() {\n  console.log("Hello, PeerConnect!");\n}\n\nmain();'
  );

  const [language, setLanguage] = useState("javascript");
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState([]);

  // Fetch room details using the invite code
  useEffect(() => {
    let cancelled = false;
    console.log(inviteCode)
    const invitCode=inviteCode.inviteCode

    const fetchRoom = async () => {
      if (!inviteCode) {
        setError("Room invite code is missing");
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError("");

        const response = await getRoomByInviteCode(invitCode);
        const data = response.data;

        if (!data.success || !data.result) {
          throw new Error(data.message || "Failed to fetch room");
        }

        if (!cancelled) {
          setRoom(data.result);
        }
      } catch (err) {
        console.error("Fetch room error:", err);

        if (!cancelled) {
          setRoom(null);
          setError(
            err?.response?.data?.message ||
              err?.message ||
              "Unable to open room"
          );
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    };

    fetchRoom();

    return () => {
      cancelled = true;
    };
  }, [inviteCode]);

  // Connect to Socket.IO and join the room
  useEffect(() => {
    if (!inviteCode) return;

    const handleConnect = () => {
      console.log("Socket connected:", socket.id);

      socket.emit("join-room", { inviteCode }, (response) => {
        if (response?.success) {
          console.log("Joined Socket.IO room successfully");
          console.log("Database room ID:", response.roomId);
        } else {
          console.error(
            "Failed to join Socket.IO room:",
            response?.message
          );
        }
      });
    };

    const handleConnectError = (err) => {
      console.error("Socket connection error:", err.message);
    };

    socket.on("connect", handleConnect);
    socket.on("connect_error", handleConnectError);
    socket.connect();

    return () => {
      socket.off("connect", handleConnect);
      socket.off("connect_error", handleConnectError);
      socket.disconnect();
    };
  }, [inviteCode]);

  // Copy invite code
  const handleCopyInviteCode = async () => {
    if (!room) return;

    try {
      await navigator.clipboard.writeText(room.inviteCode);
    } catch (err) {
      console.error("Could not copy invite code:", err);
    }
  };

  // Send a local demo message
  const handleSendMessage = (event) => {
    event.preventDefault();

    const trimmedMessage = chatInput.trim();
    if (!trimmedMessage) return;

    setMessages((previous) => [
      ...previous,
      {
        id: `${Date.now()}-${Math.random()}`,
        sender: "You",
        message: trimmedMessage,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
    ]);

    setChatInput("");
  };

  // Placeholder until a code execution backend is implemented
  const handleRunCode = () => {
    console.log("Code to execute:", { language, code });
    alert("Code execution has not been connected yet.");
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <p className="text-muted-foreground">Loading room...</p>
      </div>
    );
  }

  if (error || !room) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-background p-6">
        <h2 className="text-xl font-semibold">Unable to open room</h2>

        <p className="text-sm text-muted-foreground">
          {error || "Room not found"}
        </p>

        <Button onClick={() => navigate("/dashboard")}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Button>
      </div>
    );
  }

  const participants = (room.members || []).map((member) => ({
    id: member.user.id,
    name: member.user.name,
    email: member.user.email,
    isHost: member.role === "OWNER",
  }));

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-background">
      {/* Header */}
      <header className="flex min-h-16 items-center justify-between gap-4 border-b px-4 py-3">
        <div className="flex min-w-0 items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/dashboard")}
            aria-label="Back to dashboard"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>

          <div className="min-w-0">
            <h1 className="truncate font-semibold">{room.name}</h1>
            <p className="truncate text-xs text-muted-foreground">
              {room.description || "Collaborative coding room"}
            </p>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <div className="hidden items-center gap-2 rounded-md border px-3 py-2 sm:flex">
            <span className="text-xs text-muted-foreground">
              Invite code:
            </span>
            <span className="font-mono text-sm font-medium">
              {room.inviteCode}
            </span>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={handleCopyInviteCode}
          >
            <Copy className="mr-2 h-4 w-4" />
            Copy code
          </Button>
        </div>
      </header>

      {/* Main content */}
      <main className="min-h-0 flex-1">
        <PanelGroup direction="horizontal">
          {/* Participants */}
          <Panel defaultSize={20} minSize={15} maxSize={30}>
            <div className="flex h-full flex-col border-r">
              <div className="flex items-center gap-2 border-b p-4">
                <Users className="h-4 w-4" />
                <h2 className="font-semibold">Participants</h2>

                <span className="ml-auto rounded-full bg-muted px-2 py-0.5 text-xs">
                  {participants.length}
                </span>
              </div>

              <div className="flex-1 space-y-2 overflow-y-auto p-3">
                {participants.map((participant) => (
                  <div
                    key={participant.id}
                    className="flex items-center gap-3 rounded-lg p-2 hover:bg-muted"
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 font-semibold">
                      {participant.name?.charAt(0).toUpperCase() || "U"}
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium">
                        {participant.name}
                      </p>

                      <p className="text-xs text-muted-foreground">
                        {participant.isHost ? "Room owner" : "Member"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t p-3 text-xs text-muted-foreground">
                Online presence will be added next.
              </div>
            </div>
          </Panel>

          <PanelResizeHandle className="w-1 bg-border hover:bg-primary/50" />

          {/* Editor and chat */}
          <Panel defaultSize={80} minSize={45}>
            <PanelGroup direction="horizontal">
              {/* Code editor */}
              <Panel defaultSize={70} minSize={40}>
                <div className="flex h-full flex-col">
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b p-3">
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-semibold">
                        Code Editor
                      </span>

                      <select
                        className="rounded-md border bg-background px-2 py-1.5 text-sm"
                        value={language}
                        onChange={(event) =>
                          setLanguage(event.target.value)
                        }
                      >
                        <option value="javascript">JavaScript</option>
                        <option value="typescript">TypeScript</option>
                        <option value="python">Python</option>
                        <option value="java">Java</option>
                        <option value="cpp">C++</option>
                      </select>
                    </div>

                    <Button size="sm" onClick={handleRunCode}>
                      <Play className="mr-2 h-4 w-4" />
                      Run
                    </Button>
                  </div>

                  <div className="min-h-0 flex-1">
                    <Editor
                      height="100%"
                      language={language}
                      value={code}
                      onChange={(value) => setCode(value ?? "")}
                      theme="vs-light"
                      options={{
                        minimap: { enabled: false },
                        fontSize: 14,
                        automaticLayout: true,
                        scrollBeyondLastLine: false,
                        wordWrap: "on",
                      }}
                    />
                  </div>
                </div>
              </Panel>

              <PanelResizeHandle className="w-1 bg-border hover:bg-primary/50" />

              {/* Chat */}
              <Panel defaultSize={30} minSize={22}>
                <div className="flex h-full flex-col border-l">
                  <div className="flex items-center gap-2 border-b p-4">
                    <MessageSquare className="h-4 w-4" />
                    <h2 className="font-semibold">Room Chat</h2>
                  </div>

                  <div className="flex-1 space-y-3 overflow-y-auto p-3">
                    {messages.length === 0 ? (
                      <p className="py-8 text-center text-sm text-muted-foreground">
                        No messages yet. Start the conversation.
                      </p>
                    ) : (
                      messages.map((message) => (
                        <div
                          key={message.id}
                          className="rounded-lg bg-muted p-3"
                        >
                          <div className="mb-1 flex items-center justify-between gap-2">
                            <span className="text-sm font-semibold">
                              {message.sender}
                            </span>

                            <span className="text-xs text-muted-foreground">
                              {message.time}
                            </span>
                          </div>

                          <p className="break-words text-sm">
                            {message.message}
                          </p>
                        </div>
                      ))
                    )}
                  </div>

                  <form
                    className="flex gap-2 border-t p-3"
                    onSubmit={handleSendMessage}
                  >
                    <input
                      className="min-w-0 flex-1 rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
                      placeholder="Type a message..."
                      value={chatInput}
                      onChange={(event) =>
                        setChatInput(event.target.value)
                      }
                    />

                    <Button
                      type="submit"
                      size="icon"
                      aria-label="Send message"
                      disabled={!chatInput.trim()}
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </form>
                </div>
              </Panel>
            </PanelGroup>
          </Panel>
        </PanelGroup>
      </main>
    </div>
  );
}