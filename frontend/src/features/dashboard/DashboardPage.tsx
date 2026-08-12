import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, ArrowRight, Clock, Users, Play, MoreVertical } from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { CreateRoomModal } from "./components/CreateRoomModal";
import { JoinRoomModal } from "./components/JoinRoomModal";
import { useEffect } from "react";
import { getCurrentUser } from "../../api/auth.api";
import { useNavigate } from "react-router-dom";


const DashboardPage = () => {

  const navigate=useNavigate()
  
useEffect(() => {
    const checkAuth = async () => {
        try {
            const response = await getCurrentUser();

            console.log("AUTH RESPONSE:", response);

             if (!response.data.success) {
                await navigate("/login");
            }

        } catch (error) {
            console.log("Not authenticated");
            navigate("/login");
        }
    };

    checkAuth();
}, [navigate]);

  const user = useAuthStore(state => state.user);

  const stats = [
    { label: "Total Time", value: "36h 45m" },
    { label: "Rooms Joined", value: "48" },
    { label: "Rooms Created", value: "12" },
  ];

  const onlineUsers = [
    { id: 1, name: "Rohan Verma", status: "online", color: "bg-green-500" },
    { id: 2, name: "Priya Patel", status: "online", color: "bg-green-500" },
    { id: 3, name: "Meera Singh", status: "online", color: "bg-green-500" },
    { id: 4, name: "Karan Shah", status: "away", color: "bg-amber-500" },
    { id: 5, name: "Aditya Rana", status: "offline", color: "bg-slate-300" },
  ];

  const recentRooms = [
    { id: "room1", name: "DSA Study Group", members: 4, max: 5, status: "Active", time: "Started 1h ago" },
    { id: "room2", name: "Web Dev Project", members: 3, max: 5, status: "Active", time: "Started 2h ago" },
    { id: "room3", name: "College Mini Project", members: 5, max: 5, status: "Ended", time: "Yesterday" },
    { id: "room4", name: "React Revision", members: 2, max: 5, status: "Scheduled", time: "Tomorrow, 10 AM" },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Welcome Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Welcome back, {user?.name?.split(" ")[0] || "User"}! 👋</h1>
        <p className="text-slate-500 mt-1">What would you like to do today?</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column - Main Actions & Rooms */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Quick Actions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <CreateRoomModal>
              <Card className="hover:border-primary/50 transition-colors cursor-pointer group">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Plus className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg text-slate-900 mb-2">Create New Room</h3>
                  <p className="text-sm text-slate-500 mb-6">Create a new room and invite others to collaborate</p>
                  <Button className="w-full pointer-events-none">Create Room</Button>
                </CardContent>
              </Card>
            </CreateRoomModal>

            <JoinRoomModal>
              <Card className="hover:border-secondary/50 transition-colors cursor-pointer group">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="w-14 h-14 bg-secondary/10 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <ArrowRight className="w-8 h-8 text-secondary" />
                  </div>
                  <h3 className="font-semibold text-lg text-slate-900 mb-2">Join Room</h3>
                  <p className="text-sm text-slate-500 mb-6">Join an existing room using room ID or invite link</p>
                  <Button variant="outline" className="w-full text-secondary border-secondary/50 hover:bg-secondary/10 pointer-events-none">Join Room</Button>
                </CardContent>
              </Card>
            </JoinRoomModal>
          </div>

          {/* Recent Rooms */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Your Rooms</CardTitle>
                <CardDescription>Recent and active collaborative sessions</CardDescription>
              </div>
              <Button variant="ghost" size="sm">View all</Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentRooms.map((room) => (
                  <div key={room.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-xl border border-slate-100 hover:bg-slate-50 transition-colors">
                    <div className="flex items-center gap-4 mb-3 sm:mb-0">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${room.status === 'Active' ? 'bg-primary/10 text-primary' : 'bg-slate-100 text-slate-500'}`}>
                        {room.status === 'Active' ? <Play className="w-5 h-5 fill-current" /> : <Clock className="w-5 h-5" />}
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-900">{room.name}</h4>
                        <div className="flex items-center gap-3 text-xs text-slate-500 mt-1">
                          <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" /> {room.members}/{room.max} members</span>
                          <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {room.time}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                      <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                        room.status === 'Active' ? 'bg-green-100 text-green-700' : 
                        room.status === 'Scheduled' ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-600'
                      }`}>
                        {room.status}
                      </span>
                      {room.status === 'Active' ? (
                        <Button size="sm">Join</Button>
                      ) : (
                        <Button size="sm" variant="outline">View</Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Stats & Users */}
        <div className="space-y-8">
          
          {/* Stats Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                {stats.map((stat, i) => (
                  <div key={i} className={`p-4 rounded-xl border border-slate-100 ${i === 0 ? 'col-span-2 bg-primary/5 border-primary/20' : ''}`}>
                    <p className="text-sm font-medium text-slate-500 mb-1">{stat.label}</p>
                    <p className={`text-2xl font-bold ${i === 0 ? 'text-primary' : 'text-slate-900'}`}>{stat.value}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Online Users */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg">Online Users</CardTitle>
              <Button variant="ghost" size="sm" className="h-8 text-xs">View all</Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {onlineUsers.map((user) => (
                  <div key={user.id} className="flex items-center justify-between group">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <img src={`https://i.pravatar.cc/150?u=${user.id}`} alt={user.name} className="w-10 h-10 rounded-full bg-slate-100" />
                        <span className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${user.color}`} />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-900 group-hover:text-primary transition-colors cursor-pointer">{user.name}</p>
                        <p className="text-xs text-slate-500 capitalize">{user.status}</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <MoreVertical className="w-4 h-4 text-slate-400" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
