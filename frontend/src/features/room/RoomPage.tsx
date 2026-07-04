import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Users, Video, Mic, MonitorUp, Hand, PhoneOff, 
  Play, Copy, Download, Maximize2, Code2, 
  MessageSquare, Send, Paperclip, Smile
} from "lucide-react";
import Editor from "@monaco-editor/react";

const RoomPage = () => {
  const navigate = useNavigate();
  const [code, setCode] = useState("def binary_search(arr, target):\n    left, right = 0, len(arr) - 1\n    while left <= right:\n        mid = (left + right) // 2\n        if arr[mid] == target:\n            return mid\n        elif arr[mid] < target:\n            left = mid + 1\n        else:\n            right = mid - 1\n    return -1\n\narr = [1, 3, 5, 7, 9, 11, 13]\ntarget = 7\nresult = binary_search(arr, target)\nprint(result)");
  const [language, setLanguage] = useState("python");

  const [chatMessage, setChatMessage] = useState("");
  const [messages, setMessages] = useState([
    { id: 1, sender: "Rohan", time: "10:30 AM", text: "Check line 7 condition" },
    { id: 2, sender: "Meera", time: "10:31 AM", text: "Yes, that's the issue" },
    { id: 3, sender: "Alex", time: "10:31 AM", text: "Fixed! Now it works 🎉" },
  ]);

  const participants = [
    { id: 1, name: "Alex (You)", isHost: true, isOnline: true },
    { id: 2, name: "Rohan", isHost: false, isOnline: true },
    { id: 3, name: "Priya", isHost: false, isOnline: true },
    { id: 4, name: "Meera", isHost: false, isOnline: true },
    { id: 5, name: "Karan", isHost: false, isOnline: true },
  ];

  return (
    <div className="h-screen flex flex-col bg-slate-50 overflow-hidden">
      {/* Top Navbar */}
      <header className="h-14 bg-white border-b border-slate-200 flex items-center justify-between px-4 shrink-0">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="bg-primary/10 p-1 rounded">
              <Code2 className="w-5 h-5 text-primary" />
            </div>
            <span className="font-semibold text-slate-900">DSA Study Group</span>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-green-100 text-green-700 uppercase tracking-wider">Live</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3 text-sm text-slate-500 mr-4">
            <span className="flex items-center gap-1"><Users className="w-4 h-4" /> 5/5</span>
            <span className="flex items-center gap-1">01:25:30</span>
          </div>
          <Button variant="outline" size="sm" className="hidden sm:flex">
            <Users className="w-4 h-4 mr-2" /> Invite
          </Button>
          <Button variant="destructive" size="sm" onClick={() => navigate('/dashboard')}>
            Leave Room
          </Button>
        </div>
      </header>

      {/* Main Workspace */}
      <div className="flex-1 overflow-hidden">
        <PanelGroup direction="horizontal" className="h-full">
          
          {/* 1. Left Sidebar (Participants & Controls) */}
          <Panel defaultSize={15} minSize={12} maxSize={20} className="bg-white border-r border-slate-200 flex flex-col">
            <div className="p-3 border-b border-slate-100 font-semibold text-sm flex items-center justify-between">
              <span>Participants (5)</span>
            </div>
            <div className="flex-1 overflow-y-auto p-2 space-y-1">
              {participants.map(p => (
                <div key={p.id} className="flex items-center gap-3 p-2 hover:bg-slate-50 rounded-lg group cursor-pointer">
                  <div className="relative">
                    <img src={`https://i.pravatar.cc/150?u=${p.id}`} alt={p.name} className="w-8 h-8 rounded-full bg-slate-100" />
                    {p.isOnline && <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></div>}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1">
                      <p className="text-sm font-medium text-slate-900 truncate">{p.name}</p>
                      {p.isHost && <span className="text-[10px] text-primary bg-primary/10 px-1 rounded">Host</span>}
                    </div>
                    <p className="text-xs text-slate-500">{p.isOnline ? 'Online' : 'Offline'}</p>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Host Controls */}
            <div className="p-4 border-t border-slate-200 bg-slate-50/50 space-y-4">
              <h4 className="text-xs font-semibold text-slate-500 uppercase">Host Controls</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-700">Allow Editing</span>
                  <input type="checkbox" defaultChecked className="toggle-checkbox" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-700">Allow Run Code</span>
                  <input type="checkbox" defaultChecked className="toggle-checkbox" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-700">Allow Chat</span>
                  <input type="checkbox" defaultChecked className="toggle-checkbox" />
                </div>
              </div>
              <Button variant="outline" className="w-full text-destructive hover:bg-destructive/10 border-destructive/20 h-8 text-xs">
                Kick Participant
              </Button>
            </div>
          </Panel>

          <PanelResizeHandle className="w-1.5 bg-slate-100 hover:bg-primary/20 transition-colors cursor-col-resize active:bg-primary" />

          {/* 2. Center Panel (Video & Compiler) */}
          <Panel defaultSize={35} minSize={25} className="flex flex-col bg-slate-100">
            <PanelGroup direction="vertical">
              {/* Top: Video Grid */}
              <Panel defaultSize={60} minSize={30} className="flex flex-col relative bg-slate-900">
                <div className="absolute top-3 left-3 z-10 text-white font-medium text-sm flex items-center gap-2">
                  <Video className="w-4 h-4" /> Video Call
                </div>
                
                <div className="flex-1 p-2 grid grid-cols-2 grid-rows-2 gap-2 mt-8">
                  {/* Video slots mock */}
                  <div className="bg-slate-800 rounded-lg relative overflow-hidden flex items-center justify-center">
                    <img src="https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?q=80&w=400&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover opacity-70" alt="Video" />
                    <div className="absolute bottom-2 left-2 bg-black/50 px-2 py-1 rounded text-white text-xs backdrop-blur-sm">Alex (You)</div>
                    <div className="absolute bottom-2 right-2 bg-black/50 p-1.5 rounded-full backdrop-blur-sm"><Mic className="w-3 h-3 text-white" /></div>
                  </div>
                  <div className="bg-slate-800 rounded-lg relative overflow-hidden flex items-center justify-center">
                    <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover opacity-70" alt="Video" />
                    <div className="absolute bottom-2 left-2 bg-black/50 px-2 py-1 rounded text-white text-xs backdrop-blur-sm">Rohan</div>
                  </div>
                  <div className="bg-slate-800 rounded-lg relative overflow-hidden flex items-center justify-center">
                    <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover opacity-70" alt="Video" />
                    <div className="absolute bottom-2 left-2 bg-black/50 px-2 py-1 rounded text-white text-xs backdrop-blur-sm">Priya</div>
                  </div>
                  <div className="bg-slate-800 rounded-lg relative overflow-hidden flex items-center justify-center">
                    <div className="text-white flex flex-col items-center">
                      <div className="w-12 h-12 rounded-full bg-slate-700 flex items-center justify-center mb-2">M</div>
                      <span className="text-xs">Meera (Audio Only)</span>
                    </div>
                  </div>
                </div>

                {/* Video Controls */}
                <div className="h-14 bg-slate-900 border-t border-slate-800 flex items-center justify-center gap-3">
                  <Button variant="ghost" size="icon" className="text-white hover:bg-slate-800 rounded-full h-10 w-10 bg-slate-800"><Mic className="w-5 h-5" /></Button>
                  <Button variant="ghost" size="icon" className="text-white hover:bg-slate-800 rounded-full h-10 w-10 bg-slate-800"><Video className="w-5 h-5" /></Button>
                  <Button variant="ghost" size="icon" className="text-white hover:bg-slate-800 rounded-full h-10 w-10"><MonitorUp className="w-5 h-5" /></Button>
                  <Button variant="ghost" size="icon" className="text-white hover:bg-slate-800 rounded-full h-10 w-10"><Hand className="w-5 h-5" /></Button>
                  <Button variant="ghost" size="icon" className="text-white hover:bg-red-600/90 rounded-full h-10 w-10 bg-red-600"><PhoneOff className="w-5 h-5" /></Button>
                </div>
              </Panel>

              <PanelResizeHandle className="h-1.5 bg-slate-200 hover:bg-primary/20 transition-colors cursor-row-resize active:bg-primary" />

              {/* Bottom: Compiler Output */}
              <Panel defaultSize={40} minSize={20} className="bg-white flex flex-col">
                <div className="flex items-center gap-4 px-4 h-10 border-b border-slate-100 text-sm font-medium">
                  <button className="text-primary border-b-2 border-primary h-full px-1">Output</button>
                  <button className="text-slate-500 hover:text-slate-900 h-full px-1">Terminal</button>
                  <button className="text-slate-500 hover:text-slate-900 h-full px-1">Errors</button>
                  <div className="ml-auto text-xs text-slate-400">Clear</div>
                </div>
                <div className="flex-1 p-4 bg-slate-50 font-mono text-sm overflow-y-auto">
                  <div className="text-green-600 mb-2">✓ Code executed successfully</div>
                  <div className="text-slate-500">Input: <span className="text-slate-800">[1, 3, 5, 7, 9, 11, 13]</span></div>
                  <div className="text-slate-500">Target: <span className="text-slate-800">7</span></div>
                  <div className="text-slate-500 mt-2">Output: &gt; <span className="text-slate-900 font-bold">3</span></div>
                </div>
              </Panel>
            </PanelGroup>
          </Panel>

          <PanelResizeHandle className="w-1.5 bg-slate-200 hover:bg-primary/20 transition-colors cursor-col-resize active:bg-primary" />

          {/* 3. Right Center Panel (Monaco Editor) */}
          <Panel defaultSize={35} minSize={20} className="bg-white flex flex-col border-l border-slate-200">
            <div className="h-10 border-b border-slate-200 flex items-center justify-between px-3 bg-slate-50">
              <div className="flex items-center gap-2">
                <div className="px-3 py-1 bg-white border border-slate-200 rounded-md text-sm font-medium text-slate-700 flex items-center gap-2 shadow-sm">
                  main.py
                </div>
              </div>
              <div className="flex items-center gap-2">
                <select 
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="h-7 text-xs border border-slate-200 rounded px-2 outline-none"
                >
                  <option value="python">Python</option>
                  <option value="javascript">JavaScript</option>
                  <option value="cpp">C++</option>
                  <option value="java">Java</option>
                </select>
                <Button size="sm" className="h-7 px-3 bg-primary hover:bg-primary/90 text-xs">
                  <Play className="w-3 h-3 mr-1" /> Run
                </Button>
                <div className="w-px h-4 bg-slate-300 mx-1"></div>
                <Button variant="ghost" size="icon" className="h-7 w-7"><Copy className="w-3.5 h-3.5" /></Button>
                <Button variant="ghost" size="icon" className="h-7 w-7"><Download className="w-3.5 h-3.5" /></Button>
                <Button variant="ghost" size="icon" className="h-7 w-7"><Maximize2 className="w-3.5 h-3.5" /></Button>
              </div>
            </div>
            <div className="flex-1 w-full relative">
              <Editor
                height="100%"
                language={language}
                theme="light"
                value={code}
                onChange={(val) => setCode(val || "")}
                options={{
                  minimap: { enabled: false },
                  fontSize: 14,
                  wordWrap: "on",
                  lineNumbersMinChars: 3,
                  folding: true,
                  scrollBeyondLastLine: false,
                }}
              />
            </div>
          </Panel>

          <PanelResizeHandle className="w-1.5 bg-slate-200 hover:bg-primary/20 transition-colors cursor-col-resize active:bg-primary" />

          {/* 4. Far Right Panel (Chat) */}
          <Panel defaultSize={15} minSize={15} maxSize={25} className="bg-white flex flex-col border-l border-slate-200">
            <div className="p-3 border-b border-slate-100 font-semibold text-sm flex items-center gap-2 shrink-0">
              <MessageSquare className="w-4 h-4 text-slate-500" /> Chat
            </div>
            
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg) => (
                <div key={msg.id} className="flex gap-3">
                  <img src={`https://i.pravatar.cc/150?u=${msg.id + 10}`} alt={msg.sender} className="w-8 h-8 rounded-full shrink-0" />
                  <div>
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="font-semibold text-sm text-slate-900">{msg.sender}</span>
                      <span className="text-[10px] text-slate-400">{msg.time}</span>
                    </div>
                    <p className="text-sm text-slate-700 bg-slate-100 rounded-tr-xl rounded-b-xl px-3 py-2">
                      {msg.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="p-3 border-t border-slate-200 bg-white shrink-0">
              <div className="relative flex items-center border border-slate-200 rounded-xl bg-slate-50 overflow-hidden focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary transition-all">
                <Button variant="ghost" size="icon" className="h-10 w-10 text-slate-400 hover:text-slate-600 rounded-none shrink-0">
                  <Paperclip className="w-4 h-4" />
                </Button>
                <input 
                  type="text" 
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  placeholder="Type a message..." 
                  className="flex-1 bg-transparent border-none outline-none text-sm px-2 py-3"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && chatMessage.trim()) {
                      setMessages([...messages, { id: Date.now(), sender: "Alex (You)", time: "Now", text: chatMessage }]);
                      setChatMessage("");
                    }
                  }}
                />
                <Button variant="ghost" size="icon" className="h-10 w-10 text-slate-400 hover:text-slate-600 rounded-none shrink-0">
                  <Smile className="w-4 h-4" />
                </Button>
                <Button 
                  size="icon" 
                  className="h-10 w-10 rounded-none shrink-0 text-primary hover:bg-primary/10 hover:text-primary bg-transparent"
                  onClick={() => {
                    if (chatMessage.trim()) {
                      setMessages([...messages, { id: Date.now(), sender: "Alex (You)", time: "Now", text: chatMessage }]);
                      setChatMessage("");
                    }
                  }}
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Panel>

        </PanelGroup>
      </div>
    </div>
  );
};

export default RoomPage;
